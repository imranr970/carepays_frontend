import axios from 'axios';
import {debounce} from 'vue-debounce';

export default {

  storeHpiData({commit}, data) {
    commit('storeHpi', data)
  },

  filterCodeParts({dispatch, state}) {

    let part     = state.search.part.id;
    let term     = state.search.text;
    let category = state.search.category.id;
    let codes    = state.search.codes;

    if(part == 0 || part == null || part == '') {
      return;
    }

    this.$axios.get('filter-search-term', {
      params : {
        part, term, category, codes
      }
    })
    .then(({data}) => {
      dispatch('setCptCodes', data, {root:true});
      dispatch('fillCodes', data);
      Promise.resolve(data);
    })
    .catch(() => {
      Promise.reject();
    });
  },

  setDefaultCategory({commit}, data) {
    commit('setDefaultCategory', data);
  },

  setLoader({commit}, value) {
    commit('setLoader', value);
  },

  updateResults({commit}, answers) {
    commit('setResults', answers);
  },

  setTerm({commit}, term) {
    commit('setTerm', term);
  },

  setCategory({commit}, category) {
    commit('setCategory', category);
  },

  setSearchDetails({commit}, info) {
    commit('setSearchDetails', info);
  },

  fillCodes({commit, rootState, state}, data=[]) {


    var cpts = data.length ? data : rootState.cpt_codes;
    commit('emptyCodes');
    if(cpts) {

      cpts.forEach((item) => {

        let codes = item.codes;
        commit('pushToCodes', codes.code)

      });

    }

  },

  fetchCptsAndRedirectToLayterms({state, commit, dispatch}, term) {

    commit('setLoader', true)
    axios.get(`${process.env.api.baseURL}/searchAndFetchCptLayterms`, {
      params : {
        term,
        category : state.search.category.id
      }
    })
    .then(({data}) => {

      commit('setCptCodes', data, {root:true});
      dispatch('fillCodes');
      commit('setLoader', false)
      //this.$router.push({path:`/treatment-layterms`});

    })
    .catch(e => {

      commit('setLoader', false)

    });

  },

  pushAnswers({commit}, answer) {
    commit('pushAnswers', answer);
  },

  popAnswers({commit}, answer) {
    commit('popAnswers', answer);
  },

  fetchIcdsAndRedirect({state, commit}) {
    let category = state.search_page.category;
    var zipCode = state.search.zipCode;
    var selected_term = state.search_page.selected_term;
    var answers = state.search_page.answers;

    axios.get(`${process.env.api.baseURL}/searchCptsFromDiseases`, {
      params: {
        term:selected_term,
        answers
        //category:category,
        //zipCode:zipCode
      }
    })
    .then(({data}) => {
      if(data != 'No code found') {
        commit('setCptCodes', data, {root:true});
        this.$router.push({path:`/treatment-layterms`});
      }
      else {
        alert('no code found');
      }
    });

  },

  fetchCptsAndRedirect({state, commit}) {

    let category = state.search_page.category;
    let selected_term = state.search_page.selected_term;
    var zipCode = state.search.zipCode;

    axios.get(`${process.env.api.baseURL}/searchAndFetchCpts`, {
      params : {
        term:selected_term,
        category:category,
        zipCode:zipCode
      }
    })
    .then(({data}) => {
      if(data != 'No code found') {
        commit('setCptCodes', data, {root:true});
        this.$router.push({path:`/treatment-layterms`});
      }
      else {
        alert('no code found');
      }
    });

  },

  //search on submit

  searchSubmit({state, dispatch}) {

    let text = state.search.text;
    let addr = state.search.zipCode;

    //update address on index page
    addr = $("#userAddressIndex").val();
    dispatch('setSearchDetails', {type:'zipCode', value:addr});

    let category = state.search.category;

    dispatch('fetchCptsAndRedirectToLayterms', text);
    return;

    if(category == 'treatment') {
      dispatch('fetchCptsAndRedirectToLayterms', text);
      return;
    }

    this.$router.push({path:`search`, query:{search:text, location:addr, category:category}});

  },

  //suggestions on click

  selectSearch({dispatch}, event) {

    dispatch('emptyResults');
    dispatch('setSearchDetails', {type:'text', value:event.term});

  },

  //fetch search suggestions

  suggestSearches({state, commit, dispatch}, event) {

    let text = state.search.text;
    let category = state.search.category;

    if(text == '' || text == null) {
      commit('emptyResults');
      return;
    }
    dispatch('fetchSuggestions', {text, category})
    // if(state.setTimeout !== null) {
    //   return;
    // }
    //console.log("i am reached at this point");
    // commit('setSaveTimeOut', {

    //   callback() {
    //     dispatch('fetchSuggestions', {text, category});
    //     dispatch('stopSaveTimeout');
    //   },

    //   delay:200

    // });

  },

  stopSaveTimeout({commit}) {
    commit('clearSaveTimeout');
  },

  fetchSuggestions({dispatch, state, commit}, {text, category}) {

    axios.get(`${process.env.api.baseURL}/search`, {

      params : {
        q:text,
        category:category.id
      }

    })

    .then(({data}) => {
      dispatch('setSearchResults', data.data);
      commit('setSearchTable', data.table);
      return;

      if(state.search.category == 'diseases') {
        dispatch('setSearchResults', data.original);
        return;
      }
      if(state.search.category == 'treatment') {
        dispatch('setSearchResults', data.data);
        commit('setSearchTable', data.table);
        return;
      }
      dispatch('setSearchResults', data);

    });

  },

  setSearchResults({commit, dispatch}, data) {
    commit('setSearchResults', data);
    dispatch('setCategoryFromSearchResults', data);
    //console.log(data);
  },

  setCategoryFromSearchResults  ({rootState, dispatch}, data) {

    let categories = rootState.search_categories;

    if(data.length) {
      let category_id = data[0].category_id;
      let category = categories.find(({id}) => id == category_id);
      dispatch('setSearchDetails', {type:'category', value:category});

    }
  },

  fetchCategoriesForSelectedTerm({dispatch}, suggestion) {
    axios.get(`${process.env.api.baseURL}/search-categories-for-selected-term`, {

      params : {
        id : suggestion.id
      }

    })

    .then(({data}) => {
      dispatch('setFilteredCategories', [data])
    })
  },

  setFilteredCategories({commit}, categories) {
    commit('setFilteredCategories', categories)
  },

  emptyResults({commit}) {
    commit('emptyResults');
  },

  sendToTreatments(code) {

    code = code.trim();

    return axios.get(`${process.env.api.baseURL}/getCptsFromIcd`, {
      params: {
        icd:code
      }
    })
    .then(({data}) => {
      this.$router.push(
        {
          path:`/treatment-layterms/${data}`
        }
      );

    });

  }

}

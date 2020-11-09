
import axios from 'axios';
export const state  = () => ({
  validation:[],
  cpt_codes:[],
  user:[],
  states:[],
  cities:[],
  company: {
    evob_charges:15
  },
  languages:[],
  search_categories:[],
  user_location_lat : null,
  user_location_lng : null
})

export const mutations = {

  setCptCodes(state, codes) {
    state.cpt_codes = codes;
  },

  setUser(state, user) {
    state.user = user;
  },

  addStates(state, states) {
    state.states = states;
  },

  addCities(state, cities) {
    state.cities = cities;
  },

  fillLanguages(state, data) {
    state.languages = data;
  },

  fillCategories(state, data) {
    state.search_categories = data;
  },

  setUserLatLng(state, data) {
    let {lat, lng} = data
    state.user_location_lat = lat
    state.user_location_lng = lng
  }

}

export const getters = {

  searchCategories: state => state.search_categories,

  cptCodes: state => state.cpt_codes,

  cities: state => state.cities,

  states: state => state.states,

  years () {
    var currentYear = new Date().getFullYear(), years = [];
    var startYear = 1950;
    while ( currentYear >= startYear ) {
        years.push(currentYear--);
    }
    return years;
  },

  months() {
    return ['Jan', 'Feb', 'Mar','Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  },

  monthsInDigits() {
    let months = []
    for(let i = 1; i <= 12; i++) {
      if(i < 10) {
        months.push(`0${i}`)
        continue
      }
      months.push(i)
    }
    return months
  },

  days() {
    let days = []
    for(let i = 1; i <= 30; i++) {
      days.push(i)
    }
    return days
  },

  company: state => state.company,

  languages: state => state.languages,

  latitude: state => state.user_location_lat,

  longitude: state => state.user_location_lng

}

export const actions = {

  fetchCategories({commit}) {

    if(process.browser && JSON.parse(localStorage.getItem('categories')) != null) {
      commit('fillCategories', JSON.parse(localStorage.getItem('categories')));
      return;
    }

    this.$axios.get('fetch-categories')

    .then(({data}) => {

      commit('fillCategories', data);

      if(process.browser) { //if server
        localStorage.setItem('categories', JSON.stringify(data));
      }

    })

  },

  autoFillAuthInfo({dispatch, state, commit}, info) {
    let loggedIn = state['auth'].loggedIn;

    if(loggedIn) {
      let user = state['auth'].user;
      commit('setUser', user);
      dispatch('getPhone', info);
      dispatch('getAltPhone', info);
      dispatch('getYear', info);
      dispatch('getMonth', info);
      dispatch('getDay', info);
      dispatch('getEmail', info);
      dispatch('getZipCode', info);
      dispatch('getCity', info);
      dispatch('getState', info);
      dispatch('getAddress', info);
      dispatch('getAddress2', info);
      dispatch('getFirstName', info);
      dispatch('getMiddleName', info);
      dispatch('getLastName', info);
      dispatch('getGender', info);
      dispatch('getLanguage', info);
      dispatch('getImage', info);
      dispatch('getQuestion1', info);
      dispatch('getQuestion2', info);
      dispatch('getAnswer1', info);
      dispatch('getAnswer2', info);
    }

  },

  // resetAuthInfo({commit}) {
  //   commit('editInfo', {param:'phone', value:null, section:'insured'});
  //   commit('editInfo', {param:'first_name', value:null, section:'insured'});
  //   commit('editInfo', {param:'middle_name', value:null, section:'insured'});
  //   commit('editInfo', {param:'last_name', value:null, section:'insured'});
  //   commit('editInfo', {param:'address', value:null, section:'insured'});
  //   commit('editInfo', {param:'state', value:0, section:'insured'});
  //   commit('editInfo', {param:'city', value:0, section:'insured'});
  //   commit('editInfo', {param:'address', value:null, section:'insured'});
  //   commit('editInfo', {param:'email', value:null, section:'insured'});
  //   commit('editInfo', {param:'gender', value:0, section:'insured'});
  //   commit('editInfo', {param:'zipcode', value:null, section:'insured'});
  //   commit('editDob', {param:'day', value:0});
  //   commit('editDob', {param:'month', value:0});
  //   commit('editDob', {param:'year', value:0});
  // },

  async getStates({commit}) {

    if(process.browser && JSON.parse(localStorage.getItem('states')) != null) {
      commit('addStates', JSON.parse(localStorage.getItem('states')));
      return;
    }

    await axios.get(`${process.env.api.baseURL}/getStates`)
    .then(({data}) => {
      commit('addStates', data);
      if(process.browser) { //if server
        localStorage.setItem('states', JSON.stringify(data));
      }
    });

  },

  async getCities({commit, rootState}, info) {

    let namespace = info.namespace;
    let id = 0;

    let section = namespace == 'auth' ? 'profile' : 'insured';

    if(info.change == 0) {
      commit(`${namespace}/editInfo`, {param:'city', value:null, section:section});
    }

    id = rootState[`${namespace}`][section].state;

    if(id != 0) {

      await axios.get(`${process.env.api.baseURL}/getCities` , {
        params: {
          state_id:id
        }
      })
      .then(({data}) => {
        commit('addCities', data);
      });

    }

  },

  getPhone({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'phone', value:state.user.phone, section:info.section});

  },

  getAltPhone({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'alt_phone', value:state.user.alt_phone, section:info.section});

  },

  getFirstName({commit,state}, info) {

    commit(`${info.module}/editInfo`, {param:'first_name', value:state.user.first_name, section:info.section});

  },

  getMiddleName({commit,state}, info) {

    commit(`${info.module}/editInfo`, {param:'middle_name', value:state.user.middle_name, section:info.section});

  },

  getLastName({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'last_name', value:state.user.last_name, section:info.section});

  },

  getAddress({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'address', value:state.user.address.address, section:info.section});

  },

  getAddress2({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'address2', value:state.user.address.address2, section:info.section});

  },

  getState({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'state', value:state.user.address.state, section:info.section});

  },

  getCity({commit, state}, info) {
    commit(`${info.module}/editInfo`, {param:'city', value:state.user.address.city, section:info.section});
  },

  getZipCode({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'zipcode', value:state.user.address.zipcode, section:info.section});

  },

  getEmail({commit, state}, info) {

    commit(`${info.module}/editInfo`, {param:'email', value:state.user.email, section:info.section});

  },

  getDay({commit, state}, info) {

    let dob = state.user.dob.split('-');
    let day = dob[2];
    commit(`${info.module}/editDob`, {param:'day', value:day});

  },

  getMonth({commit,state}, info) {

    let dob = state.user.dob.split('-');
    let month = dob[1];
    month = month.charAt(0) == 0 || month.charAt(0) == '0' ? month.replace('0', '') : month;

    commit(`${info.module}/editDob`, {param:'month', value:month});

  },

  getYear({commit, state}, info) {

    let dob = state.user.dob.split('-');
    let year = dob[0];
    commit(`${info.module}/editDob`, {param:'year', value:year});

  },

  getGender({commit,state}, info) {

    commit(`${info.module}/editInfo`, {param:'gender', value:state.user.gender, section:info.section});

  },

  getLanguage({commit, state}, info) {
    commit(`${info.module}/editInfo`, { param:'language', value:state.user.language, section:info.section });
  },

  getImage({commit, state}, info) {
    commit(`${info.module}/editInfo`, { param:'user_image', value:state.user.user_image, section:info.section });
  },

  getQuestion1({commit, state}, info) {
    commit(`${info.module}/editInfo`, { param:'security_question1', value:state.user.security_question1, section:info.section });
  },

  getQuestion2({commit, state}, info) {
    commit(`${info.module}/editInfo`, { param:'security_question2', value:state.user.security_question2, section:info.section });
  },

  getAnswer1({commit, state}, info) {
    commit(`${info.module}/editInfo`, { param:'security_answer1', value:state.user.security_answer1, section:info.section });
  },

  getAnswer2({commit, state}, info) {
    commit(`${info.module}/editInfo`, { param:'security_answer2', value:state.user.security_answer2, section:info.section });
  },

  languages({commit}) {

    if(process.browser && JSON.parse(localStorage.getItem('languages')) != null) {
      commit('fillLanguages', JSON.parse(localStorage.getItem('languages')));
      return;
    }

    this.$axios.get(`languages`)
    .then(({data}) => {
      commit('fillLanguages', data);
      if(process.browser) { //if server
        localStorage.setItem('languages', JSON.stringify(data));
      }
    });

  },

  setCptCodes({commit}, data) {
    commit('setCptCodes', data);
  },

  setUserLatLng({commit}, data) {
    commit('setUserLatLng', data)
  }

}

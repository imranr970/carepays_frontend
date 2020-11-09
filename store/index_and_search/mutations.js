export default {

  storeHpi(state, hpiData) {
    state.hpiData = hpiData
  },

  pushToCodes(state, code) {
    state.search.codes.push(code);
  },

  emptyCodes(state) {
    state.search.codes = [];
  },

  setLoader(state, value) {
    state.loading = value;
  },

  setDefaultCategory(state, value) {
    state.search.category = value;
  },

  setResults(state, results) {
    state.search_page.results = [{data:results}, {type:'symptom'}];
  },

  pushAnswers(state, answer) {
    state.search_page.answers.push(answer);
  },

  setSearchTable(state, table) {
    state.search.table = table;
  },

  popAnswers(state, answer) {

    let answers = state.search_page.answers.filter((ans)=> {
      return answer.answerId !== ans.answerId
    });

    state.search_page.answers = answers;

  },

  setTerm(state, term) {
    state.search_page.selected_term = term;
  },

  setCategory(state, category) {
    state.search_page.category = category;
  },

  setSearchDetails(state, info) {
    let type = info.type;
    state.search[type] = info.value;
  },

  emptyResults(state) {
    state.search.results = [];
  },

  setSearchResults(state, data) {
    state.search.results = data;
  },

  setChildren(state) {
    state.search_page.children = data;
  },

  clearSaveTimeout(state) {
    clearInterval(state.setTimeout);
    state.setTimeout = null;
  },

  setSaveTimeOut(state, {callback, delay}) {
    state.setTimeout = setTimeout(callback, delay);
  },

  setFilteredCategories(state, categories) {
    state.search.filteredCategories = categories
  }

}

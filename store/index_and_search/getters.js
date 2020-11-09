export default {

  search(state) {
    return state.search;
  },

  codes(state) {
    return state.search.codes;
  },

  results(state) {
    return state.search.results;
  },

  category(state) {
    return state.search_page.category;
  },

  search_category (state) {
    return state.search.category;
  },

  categories(state) {
    return state.search.categories;
  },

  filteredCategories(state) {
    return state.search.filteredCategories
  },

  table(state) {
    return state.search.table;
  },

  loading(state) {
    return state.loading;
  },

  part(state) {
    return state.search.part;
  },

  location(state) {
    return state.search.zipCode
  }

}


export default () => ({

  hpiData: [],
  setTimeout : null,
  loading : false,

  search: {
    text:'',
    zipCode:'',
    results:{},
    address:'',
    categories: [],
    filteredCategories:[],
    category: {
      id:0,
      name:'Type'
    },
    table:null,
    part:{},
    codes:[]
  },

  search_page: {

    children:[],
    results:[],
    category:'',
    selected_term:'',
    answers:[]

  }

});

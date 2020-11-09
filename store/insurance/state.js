export default () => ({

  insurance: {
    person:0,
    name:null,
    financial_guarantor:null,
    package:0,
    type:0,
    policy_number:null,
    plan_name:null,
    types:{}
  },

  dependants: {
    name:'',
    relation:"0",
    old:[]
  },

  insured: {
    id_or_ssn:null,
    first_name:null,
    middle_name:null,
    last_name:null,
    title:0,
    dob: {
      day:0,
      month:0,
      year:0
    },
    insurance_address:null,
    state:0,
    city:0,
    zipcode:null,
    email:null,
    phone:null,
    service_number:null,
    employeed:false,
    contact_for_verification:false,
    gender:0
  },

  states:{},
  cities:{},

  loggedIn: false,
  user: {},

  payerNames:{},

  auth_insurances:[],
  current_insurance:{}

});

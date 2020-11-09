export default () => ({

  profile: {

    first_name:null,
    middle_name:null,
    last_name:null,
    email:null,
    alt_email:null,
    gender:0,
    phone:null,
    alt_phone:null,
    dob: {
      day:0,
      month:0,
      year:0,
    },
    state:null,
    city:null,
    address:null,
    address2:null,
    language:0,
    security_question1:0,
    security_answer1:null,
    security_question2:0,
    security_answer2:null,
    zipcode:null

  },

  mandatory: [
    'first_name',
    'email',
    'gender',
    'phone',
    'city',
    'state',
    'address',
    'zipcode'
    // 'day',
    // 'month',
    // 'year'
  ]

});

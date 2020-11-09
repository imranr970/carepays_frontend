
export default () => ({

	symptoms:{},
	selected_symptoms:[],
	questions:{},
  selected_answers:[],
  searched_keyword:'',
  searched_symptoms:[],
  old_symptoms:[],

  patientInfo: {
    gender:'1',
    age:null,
    location:'',
    part:'',
    subpart:0,
    view:'F'
  },

	ages:[],
	selected_questions:[],
  refined_parts:{},

  treatments:[],
  treatment:null

});

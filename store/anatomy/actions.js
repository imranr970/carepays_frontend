
import axios from 'axios';

export default {

  searchSymptoms({commit, state}) {

    axios.get(`${process.env.api.baseURL}/getSymptomsInAllParts`, {

      params: {
        key:state.searched_keyword,
        gender:state.patientInfo.gender
      }

    })
    .then (({data}) => {

      commit('fillOldSymptoms');
      commit('SYMPTOMS', data);

    });

  },

  setSearchKeyword({commit}, data) {
    commit('setSearchKeyword', data);
  },

  removeAnswer({commit}, answer) {
    commit('removeAnswer', answer);
  },

  updateQuestions({commit}, questions) {
    commit('FILL_QUESTIONS', questions);
  },

  submitAndFetchDiseases({state, commit, rootGetters, dispatch}) {

    let symptoms = state.selected_symptoms;
    let answers = state.selected_answers;
    let part = state.patientInfo.part;
    let age = state.patientInfo.age;
    let gender = state.patientInfo.gender;
    let category = rootGetters['index_and_search/category'];

    let symptom_ids = [];
    let answer_ids = [];

    symptoms.forEach((symptom) => {
      if(!symptom_ids.includes(symptom.id)) {
        symptom_ids.push(symptom.id);
      }
    });

    answers.forEach((answer) => {
      if(!answer_ids.includes(answer.id)) {
        answer_ids.push(answer.id);
      }
    });

    return new Promise((resolve, reject) => {

      axios.get(`${process.env.api.baseURL}/fetch-diseases`, {
        params: {
          symptoms : symptom_ids,
          answers  : answer_ids,
          part,
          age,
          gender,
          category
        }
      })

      .then(({data}) => {
        commit('setCptCodes', data, {root:true});
        dispatch('index_and_search/fillCodes', data, {root:true});
        resolve(data);
      })

      .catch((e)=>{
        reject(e);
      });

    });

  },

  reset({dispatch, commit}) {

    dispatch('emptySelectedSymptoms');
    dispatch('emptySelectedQuestions');
    dispatch('emptySelectedAnswers');
    commit('FILL_QUESTIONS', []);

  },

  current_symptom_questions({state, dispatch}, symptom) {

    //now the popup questions will be the current symptom questions

    dispatch('filteredQuestions', symptom);

  },

  emptySelectedSymptoms({commit}) {
    commit('emptySelectedSymptoms');
  },

  emptySelectedQuestions({commit}) {
    commit('emptySelectedQuestions');
  },

  emptySelectedAnswers({commit}) {
    commit('emptySelectedAnswers');
  },

  removeSymptom({commit}, index) {
    commit('removeSymptom', index);
  },


  addToSelectedSymptom({commit}, symptom) {
    commit('addSelectedSymptom', symptom);
  },

  removeSelectedSymptoms({commit}, obj) {

    let index = obj.index;
    let symptom = obj.symptom;

    commit('removeSelectedSymptom', index);
    commit('addSypmtomToSpecificIndex', symptom);

  },

  removeFromSelectedQuestions({commit, dispatch, state}, symptom) {

    //remove symptom questions from selected_questions

    if(state.selected_questions.length != 0) {

      //those questions which have not symptom_id matching question.symptom_id will remain and those with matching will be remove

      //In short, remove the questions of selected symptoms
      var questions_array = state.selected_questions.filter((question) => {
        return symptom.id != question.symptom_id;
      });

      //those questions which have matching sypmtom.question_id with symptom.id will be sent to remove selected answers which were to be sent to server

      //now the current symptom's questions will be removed
      var questions_to_remove = state.selected_questions.filter((question) => {
        return symptom.id == question.symptom_id;
      });


      for(var question of questions_to_remove) {

        for(var answer of question.answers) {

          commit('removeAnswer', answer);
        }

      }

      dispatch('removeQuestions', questions_array);

      //remove the questions
      commit('FILL_QUESTIONS', []);

    }//if

  },

  pushSypmtom({commit}, symptom) {
    commit('addSypmtom', symptom)
  },

  editInfo({commit}, info) {
    commit('changeInfo', info);
  },

  removeAnswers(context, questions) {
		context.commit('removeAnswers', questions);
	},

	filteredQuestions(context, symptom) {
		context.commit('filteredQuestions', symptom);
	},

	getSymptomsFromSubParts({commit, state}, data) {

		let part = data.id;
		let location = data.location;
		let gender = data.gender;
    let age = data.age;
    let parentPart = state.patientInfo.part;

		return new Promise((resolve, reject) => {
			axios.get(`${process.env.api.baseURL}/anatomy/fetch-symptoms-from-subparts`, {

        params: {
          id:part,
          age,
          location,
          gender,
          parentPart
        }

			})
			.then(({data}) => {
				commit('FILL_SYMPTOMS', data);
				resolve();
      })
      .catch(() => {
        reject();
      });

		});
	},

	async getParts({commit}, data) {

		let part = data.part;
		await axios.get(`${process.env.api.baseURL}/anatomy/fetch-parts`,  {
      params:{
        part:part
      }
		})
		.then(({data}) => {
			commit('fillParts', data);
		});

	},

	getAges({commit})
	{
		axios.get(`${process.env.api.baseURL}/anatomy/ages`).then(({data})=>{
			commit('fillAges', data);
		});
		// let ages =  [
		// 	'0-1',
		// 	'1-5',
		// 	'6-17',
		// 	'18-24',
		// 	'25-34',
		// 	'35-44',
		// 	'45-54',
		// 	'55-64',
		// 	'65-74',
		// 	'75-84',
		// 	'85+'
		// ];
		// commit('fillAges', ages);
	},

	fillAnswers({commit}, answer) {
		commit('addAnswers', answer);
	},

	getSymptoms({commit, state}) {

    let info = state.patientInfo;

    let age = info.age;
    let gender = info.gender;
    let location = info.location;
    let part = info.part;
    let generalParts = ['skin', 'muscles', 'bones', 'veins'];

		return new Promise((resolve, reject) => {

      axios.get(`${process.env.api.baseURL}/fetch-symptoms`, {
        params:{
          part,
          age,
          location,
          gender
        }
			})
			.then(({data}) => {

				commit('FILL_SYMPTOMS', data);
				resolve();
      })

      .catch(() => {
        reject();
      });

		});

  },

  findTreatmentAndSetCodes({state, dispatch}) {

    let treatment = state.treatment.children.id;
    let age = state.patientInfo.age;
    let gender = state.patientInfo.gender;
    let part = state.patientInfo.part;

    this.$axios.get('find-treatment-and-set-codes', {
      params:{
        treatment, age, part, gender
      }
    })
    .then(({data}) => {
      if(!data.length) return false;
      dispatch('editInfo', {type:'part', part:''});// just for related treatments
      dispatch('setCptCodes', data, {root:true})
      dispatch('index_and_search/fillCodes', data, {root:true});
      this.$router.push({path:'/treatment-layterms'});
      Promise.resolve(data);
    })
    .catch((err) => {
      Promise.reject(err);
    })

  },

  setTreatment({commit}, treatment) {
    commit('setTreatment', treatment);
  },

  getTreatments({commit, state, rootGetters}) {
    let info = state.patientInfo;

    let age = info.age;
    let gender = info.gender;
    let category = rootGetters['index_and_search/category'].id;
    let part = info.part;
    let subpart = info.subpart;

    if(subpart != '') {
      part = subpart; // now mock part as new value of subpart and fetch symptoms
    }

		return new Promise((resolve, reject) => {

      axios.get(`${process.env.api.baseURL}/fetch-treatments-from-category-and-bodypart`, {
        params:{
          part,
          age,
          category,
          gender
        }
			})
			.then(({data}) => {
				commit('FILL_TREATMENTS', data.data);
        resolve();

      })

      .catch(() => {
        reject();
      });

		});
  },

	SELECT_QUESTIONS({commit, state, dispatch}, symptom) {

    let gender = state.patientInfo.gender;
    let part = state.patientInfo.part;
    let subpart = state.patientInfo.subpart;

    return new Promise((resolve, reject) => {

      axios.get(`${process.env.api.baseURL}/fetch-questions`, {
        params: {
          id:symptom.id,
          gender,
          part,
          subpart
        }
      })
      .then(({data}) => {

          //inserting in questions(object), the current symptom questions which is selected by user

          commit('FILL_QUESTIONS', data);

          //push current question in selected questions
          for(var questions of data) {
            //loop the questions because questions can be multiple and we are pushing single question in each iteration

            try {
              //pass questions to action fillSelectedQuestions
              dispatch('fillSelectedQuestions', questions);
            }

            catch(e) {
              reject();
            }

          }//for

          resolve();

        })

        .catch(() => {
          resolve();
        });

    });

	},

	FILL_SYMPTOMS_ACTION({commit}, payload) {

    commit('FILL_SYMPTOMS', payload);

	},

	fillPatientInfo({commit}, info){
		commit('patientInfo', info);
	},

	fillSelectedQuestions({commit}, questions) {
		commit('fillSelectedQuestions', questions);
	},

	removeQuestions({commit}, questions) {
		commit('removeQuestions', questions);
  }

}

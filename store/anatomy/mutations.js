export default {

  setTreatment(state, treatment) {
    state.treatment = treatment;
  },

  FILL_TREATMENTS(state, treatments) {
    state.treatments  = treatments;
  },

  fillOldSymptoms(state) {
    state.old_symptoms = state.symptoms;
  },

  setSearchKeyword(state, data) {
    state.searched_keyword = data;
  },

  removeAnswer(state, answer) {

    //filter the answers and remove the upcoming answer which is unchecked
    let answers = state.selected_answers.filter((ans) => {
      return ans.id !== answer.id;
    });

    //update the selected_answers

    state.selected_answers = answers;

  },


  emptySelectedQuestions(state) {
    state.selected_questions = [];
  },

  emptySelectedAnswers(state) {
    state.selected_answers = [];
  },

  emptySelectedSymptoms(state) {
    state.selected_symptoms = [];
  },

  addSelectedSymptom(state, symptom) {
    state.selected_symptoms.push(symptom);
  },

  removeSymptom(state, index) {
    //remove from selected
    state.symptoms.splice(index, 1);
  },

  removeSelectedSymptom(state, index) {
    //remove from selected
    state.selected_symptoms.splice(index, 1);
  },

  addSypmtomToSpecificIndex(state, symptom) {

    //define index of symptom
    const sypmtom_index = symptom.index;
    //insert into symptoms in specific index
    state.symptoms.splice(sypmtom_index, 0, symptom);

  },

  addSypmtom(state, symptom) {
    state.symptoms.push(symptom);
  },

  changeInfo(state, info) {

    let type = info.type;
    state.patientInfo[type] = info[type];

  },

	//after symptoms
	SYMPTOMS(state, payload) {
		state.symptoms = payload;
	},

	//before anatomy page loads
	FILL_SYMPTOMS(state, symptoms) {

    state.symptoms = symptoms;

	},

	FILL_QUESTIONS(state, questions) {
		state.questions = questions;
	},

	FILL_SELECTED_SYMPTOMS(state, payload) {
		state.selected_symptoms = payload;
	},

	addAnswers(state, answer) {

		if(answer.checked != false) {
			state.selected_answers.push(answer);
    }

    //will think about it

		state.selected_questions.filter((question) => {
			for(var q of question.answers) {
				if(answer.id == q.id) {
					if (answer.checked == true) {
						q.checked = true;
					}
					else if (answer.checked == false) {
						q.checked = false;
					}
				}
			}
		});

	},

	fillAges(state, data) {
		state.ages = data;
	},

	patientInfo(state, info) {
		state.patientInfo = info;
		localStorage.setItem('patientInfo', JSON.stringify(info));
	},

	fillParts(state, parts) {
		state.refined_parts = parts;
	},

	fillSelectedQuestions(state, questions) {
		state.selected_questions.push(questions);
	},

	removeQuestions(state, questions) {

		//symptom that is removed will be removed from selected_symptoms and its questions will also be removed
    state.selected_questions = questions;

	},

	filteredQuestions(state, symptom) {
		state.questions = {};
		let changed_questions = [];

		//if not empty selected questions
		if(state.selected_questions.length != 0) {
			state.selected_questions.filter((question) => {
				if(symptom.id == question.symptom_id) {
					changed_questions.push(question);
				}
			});
    }

    //remove duplicates if any

		for(var i = 0; i < changed_questions.length; i++) {
			var j;
			for (j = i + 1; j < changed_questions.length; j++) {
				if(changed_questions[i] == changed_questions[j]) {
          // if prev element is equals next element then delete next
					changed_questions.splice(changed_questions[j], 1);
				}
			}
    }

    console.log(changed_questions);

		state.questions = changed_questions;

	},

	removeAnswers(state, questions) {

		var answers_from_selected_questions = [];
		var selected_answers = [];

	}

}

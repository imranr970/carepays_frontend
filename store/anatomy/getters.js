export default {

  treatments(state) {
    return state.treatments;
  },

  treatment(state) {
    return state.treatment;
  },

  searched_symptom(state) {
    return state.searched_keyword;
  },

  symptoms(state) {
    return state.symptoms;
  },

  selectedSymptoms(state) {
		return state.selected_symptoms;
  },

	sypmtomsLength(state) {
		return state.symptoms.length;
  },

	refinedParts(state) {
		return state.refined_parts;
  },

  ages(state) {
    return state.ages;
  },

  patientInfo(state) {
    return state.patientInfo;
  },

  patientPart(state) {
    return state.patientInfo.part;
  },

  questions(state) {
    return state.questions;
  },

  selectedQuestions(state) {
    return state.selected_questions;
  },

  selectedAnswers(state) {
    return state.selected_answers;
  },

}

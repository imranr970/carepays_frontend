export default {

  step1(state) {
    return state.step1;
  },

  step(state) {
    return state.step;
  },

  services(state) {
    return state.step2.services;
  },

  selectedServices(state) {
    return state.step2.selectedServices;
  },

  loading(state) {
    return state.loading;
  },

  questions(state) {
    return state.questions;
  },

  excludes(state) {
    return state.excludes;
  },

  selectedExcludes(state) {
    return state.selectedExcludes;
  },

  step3Type(state) {
    return state.step3Type;
  },

  availedServices(state) {
    return state.availedServices;
  },

  selectedAvailedServices(state) {
    return state.selectedAvailedServices;
  },

  frequencies(state) {
    return state.frequencies;
  },

  treatmentCodes(state) {
    return state.treatmentCodes;
  },

  finalStep(state) {
    return state.finalStep;
  }

}

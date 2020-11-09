export default {

  setFinal(state, data) {
    state.finalStep = data;
  },

  fillTreatmentCodes(state, data) {
    state.treatmentCodes = data;
  },

  fillAvailedServices(state, data) {
    state.availedServices = data;
  },

  fillExcludes(state, data) {
    state.excludes = data;
  },

  setStep3Type(state, type) {
    state.step3Type = type;
  },

  addFrequencies(state, data) {
    state.frequencies = data;
  },

  editInfo(state, info) {

    let type  = info.type;
    let currentStep  = "step" + info.step;
    let value = info.value;

    state[currentStep][type] = value;

  },

  setLoading(state, value) {
    state.loading = value;
  },

  incrementStep(state) {
    state.step++
  },

  decrementStep(state) {
    //special case when selected availed services are empty and on treatments page decrement is triggered then skip the frequencies page and fly back two steps to availed services
    if(!state.selectedAvailedServices.length > 0 && state.step == 6) {
      state.step -= 2;
    }
    else {
      state.step--
    }
  },

  resetAvailedServices(state) {
    state.selectedAvailedServices = [];
  },

  resetExcludes(state) {
    state.selectedExcludes = [];
  },

  addServices(state, data) {
    state.step2.services = data;
  },

  setSelectedServices(state, data) {
    state.step2.selectedServices = data;
  },

  addSelectedServices(state, service) {

    let exists = state.step2.selectedServices.find((thisService) => {
      return thisService.id == service.id;
    });

    if(!exists) {
      state.step2.selectedServices.push(service);
    }

  },

  removeSelectedServices(state, service) {

    let selectedServices = state.step2.selectedServices.filter((thisService) => {
      return thisService.id != service.id
    });

    state.step2.selectedServices = selectedServices;

  },

  addSelectedExcludes(state, exclude) {

    let exists = state.selectedExcludes.find((thisExclude) => {
      return thisExclude.id == exclude.id;
    });

    if(!exists) {
      state.selectedExcludes.push(exclude);
    }

  },

  setSelectedExcludes(state, excludes) {
    state.excludes = excludes;
  },

  removeSelectedExcludes(state, exclude) {

    let selectedExcludes = state.selectedExcludes.filter((thisExclude) => {
      return thisExclude.id != exclude.id
    });

    state.selectedExcludes = selectedExcludes;

  },

  addSelectedFrequencies(state, frequency) {

    let exists = state.selectedFrequencies.find((thisFrequency) => {
      return thisFrequency == frequency.frequency_id;
    });

    if(!exists) {
      state.selectedFrequencies.push(frequency);
    }

  },

  removeSelectedFrequencies(state, frequency) {

    let selectedFrequencies = state.selectedFrequencies.filter((thisFrequency) => {
      return thisFrequency != frequency.frequency_id
    });

    state.selectedFrequencies = selectedFrequencies;

  },

  //availed services
  addAvailedSelectedServices(state, service) {

    let exists = state.selectedAvailedServices.find((thisService) => {
      return thisService == service.id;
    });

    if(!exists) {
      state.selectedAvailedServices.push(service.id);
    }

  },

  removeAvailedSelectedServices(state, service) {

    let selectedServices = state.selectedAvailedServices.filter((thisService) => {
      return thisService != service.id
    });

    state.selectedAvailedServices = selectedServices;

  },

  //questions

  fillQuestions(state, data) {
    state.questions = data;
  },

  addSelectedQuestions(state, question) {

    let exists = state.selectedQuestions.find((thisQuestion) => {
      return thisQuestion == question;
    });

    if(!exists) {
      state.selectedQuestions.push(question);
    }

  },

  removeSelectedQuestions(state, question) {

    let selectedQuestions = state.selectedQuestions.filter((thisQuestion) => {
      return thisQuestion != question
    });

    state.step2.selectedQuestions = selectedQuestions;

  }

}

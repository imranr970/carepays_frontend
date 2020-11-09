
import axios from 'axios';

export default {

  setFinal({commit}, val) {
    commit('setFinal', val);
  },

  editInfo({commit}, info) {
    commit('editInfo', info);
  },

  setLoading({commit}, value) {
    commit('setLoading', value);
  },

  getQuestions({dispatch, state}) {

    let selectedServices = state.step2.selectedServices;
    let age = state.step1.age;
    let gender = state.step1.gender;

    let serviceIds = [];

    selectedServices.forEach((service) => {
      serviceIds.push(service.id);
    });

    return new Promise((resolve) => {

      axios.get(`${process.env.api.baseURL}/preventive-care/step/${state.step}`, {
        params: {
          services:serviceIds,
          age,
          gender
        }
      })
      .then(({data}) => {

        if(data.type == 'questions') {
          dispatch('fillQuestions', data.data);
        }
        else {
          dispatch('fillExcludes', data.data);
        }

        resolve();
      });

    });//returing promise

  },

  fillQuestions({commit}, data) {
    commit('fillQuestions', data);
    commit('setStep3Type', 'questions');
  },

  fillExcludes({commit}, data) {
    commit('fillExcludes', data);
    commit('setStep3Type', 'excludes');
  },

  getServices({state, dispatch}) {

    let step = state.step;
    let age = state.step1.age;
    let gender = state.step1.gender;

    return new Promise((resolve) => {

      axios.get(`${process.env.api.baseURL}/preventive-care/step/${step}`, {
        params: {
          age,
          gender
        }
      })
      .then(({data}) => {
        dispatch('addServices', data);
        resolve();
      });

    });//returing promise

  },

  getFrequencies({state, dispatch}) {

    let services = state.selectedAvailedServices;

    return new Promise((resolve) => {

      axios.get(`${process.env.api.baseURL}/preventive-care/step/${state.step}`, {
        params: {
          services
        }
      })
      .then(({data}) => {
        dispatch('addFrequencies', data);
        resolve();
      });

    });//returing promise

  },

  subtractFrequencies({state, dispatch}) {

    let services = state.step2.selectedServices;
    let frequencies = state.selectedFrequencies;

    let frequencyIds = [];

    frequencies.forEach((frequency) => {
      frequencyIds.push(frequency.frequency_id);
    });

    let serviceIds = [];

    services.forEach((service) => {
      serviceIds.push(service.id);
    });

    return new Promise((resolve) => {

      axios.get(`${process.env.api.baseURL}/preventive-care/step/7`, {
        params: {
          services:serviceIds,
          frequencies
        }
      })
      .then(({data}) => {
        dispatch('fillTreatmentCodes', data);
        resolve();
      });

    });//returing promise

  },

  fillTreatmentCodes({commit}, data) {
    commit('fillTreatmentCodes', data);
  },


  sendExcludes({state, commit}) {

    let excludes = state.selectedExcludes;
    let services = state.step2.selectedServices;

    let excludeIds = [];

    excludes.forEach((exclude) => {
      excludeIds.push(exclude.id);
    });

    let serviceIds = [];

    services.forEach((service) => {
      serviceIds.push(service.id);
    });

    return new Promise((resolve) => {

      axios.get(`${process.env.api.baseURL}/preventive-care/step/${state.step}`, {
        params: {
          excludes:excludeIds,
          services:serviceIds
        }
      })
      .then(({data}) => {
        commit('fillQuestions', data.data);
        commit('fillAvailedServices', data.services);
        resolve();
      });

    });//returing promise

  },

  addSelectedFrequency({commit}, data) {
    commit('addSelectedFrequencies', data);
  },

  removeSelectedFrequency({commit}, data) {
    commit('removeSelectedFrequencies', data);
  },


  addFrequencies({commit}, data) {

    commit('addFrequencies', data);

  },

  resetAvailedServices({commit}) {
    commit('resetAvailedServices');
  },

  resetExcludes({commit}) {
    commit('resetExcludes');
  },

  addSelectedExcludes({commit}, data) {
    commit('addSelectedExcludes', data);
  },

  setSelectedExcludes({commit}, data) {
    commit('setSelectedExcludes', data);
  },

  removeSelectedExcludes({commit}, data) {
    commit('removeSelectedExcludes', data);
  },

  addServices({commit}, data) {

    commit('addServices', data);

  },

  incrementStep({commit}) {
    commit('incrementStep');
  },

  decrementStep({commit, dispatch}) {
    commit('decrementStep');
    dispatch('setFinal', false);
  },

  setSelectedServices({commit}, data) {
    commit('setSelectedServices', data);
  },

  addSelectedServices({commit}, service) {
    commit('addSelectedServices', service);
  },

  removeSelectedServices({commit}, service) {
    commit('removeSelectedServices', service);
  },

  addAvailedSelectedServices({commit}, service) {
    commit('addAvailedSelectedServices', service);
  },

  removeAvailedSelectedServices({commit}, service) {
    commit('removeAvailedSelectedServices', service);
  },

  addSelectedQuestions({commit}, question) {
    commit('addSelectedQuestions', question);
  },

  removeSelectedQuestions({commit}, question) {
    commit('removeSelectedQuestions', question);
  }

}

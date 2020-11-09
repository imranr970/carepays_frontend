export default {

  fillCurrentInsurance(state, insurance) {
    state.current_insurance = insurance;
  },

  fillAuthInsurances(state, data) {
    state.auth_insurances = data;
  },

  addDependants(state, data) {
    state.dependants.old = data;
  },

  pushDependant(state, dependant) {
    state.dependants.old.push(dependant);
  },

  setPayerNames(state, data) {
    state.payerNames = data;
  },

  editInfo(state, info) {
    let param = info.param;
    let value = info.value;
    let section = info.section;
    state[section][param] = value;
  },

  addCities(state, data) {
    state.cities = data;
  },

  addStates(state, data) {
    state.states = data;
  },

  editDob(state, info) {
    let param = info.param;
    let value = info.value;
    state.insured.dob[param] = value;
  },

  setAuth(state, user) {
    state.user = user;
  },

  setLoggedIn(state, value) {
    state.loggedIn = value;
  }

}


export default {

  insurance(state) {
    return state.insurance;
  },

  insured(state) {
    return state.insured;
  },

  states(state) {
    return state.states;
  },

  cities(state) {
    return state.cities;
  },

  dependants(state) {
    return state.dependants.old;
  },

  dependants_wrapper(state) {
    return state.dependants;
  },

  current_insurance(state) {
    return state.current_insurance;
  },

  auth_insurances(state) {
    return state.auth_insurances;
  }

}

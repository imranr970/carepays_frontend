//@todo dry code...
import axios from 'axios';

export default {

  resetAuthInsurances({commit}) {
    commit('fillAuthInsurances', []);
  },

  async getAuthInsurances({commit}) {

    await this.$axios.post(`auth/insurance/getAll`)
    .then(({data}) => {
      commit('fillAuthInsurances', data.data);
      return Promise.resolve(data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });

  },

  fillCurrentInsurance({commit}, insurance) {
    commit('fillCurrentInsurance', insurance);
  },

  addDependants({commit}, data) {

    commit('addDependants', data);

  },

  async getAuthDependants({dispatch}, insurance) {

    await this.$axios.post(`auth/dependants/all`, {
      insurance
    })
    .then(({data}) => {
      dispatch('addDependants', data);
      Promise.resolve(data);
    })
    .catch((err) => {
      console.log(err);
      Promise.reject(err);
    });

  },

  async updateDependant({state, commit}, info) {

    await this.$axios.post(`auth/dependants/update/${info.id}`, {
      name      : info.name,
      relation  : info.relation,
      insurance : state.current_insurance.id
    })
    .then(({data}) => {
      //dispatch('getAuthDependants', state.current_insurance);

      let dependants = state.dependants.old.filter((dependant) => {
        return dependant.id != info.id
      });

      dependants.push(data);

      commit('addDependants', dependants);

      Promise.resolve(data);

    })
    .catch((err) => {
      Promise.reject(err);
    });
  },

  async addNewDependant({commit, state}) {

    let name = state.dependants.name;
    let relation = state.dependants.relation;
    let insurance = state.current_insurance.id;

    await this.$axios.post(`auth/dependants/create`, {
      name,
      relation,
      insurance
    })
    .then(({data}) => {
      commit('pushDependant', data);
      Promise.resolve(data);
    })
    .catch((err) => {
      Promise.reject(err);
    });
  },

  async delete({state, commit}, id) {
    await this.$axios.post(`auth/dependants/delete/${id}`)
    .then(({data}) => {

      let dependants = state.dependants.old.filter((dependant) => {
        return dependant.id != id
      });

      commit('addDependants', dependants);

      Promise.resolve(data);

    })
    .catch((err) => {
      Promise.reject(err);
    });
  },

  deleteInsurance(context, id) {

    return new Promise((resolve, reject) => {

      this.$axios.post(`${process.env.api.baseURL}/auth/insurance/${id}/delete`)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });

    });

  },

  updateInsurance({state}, id) {

    let insurance = state.insurance;
    let insured = state.insured;

    return new Promise((resolve, reject) => {

      this.$axios.post(`${process.env.api.baseURL}/auth/insurance/${id}/update`, {

        person:insurance.person,
        package:insurance.package,
        financial_guarantor_name:insurance.financial_guarantor,
        insurance_name:insurance.name,
        type:insurance.type,
        policy_number:insurance.policy_number,
        plan_name:insurance.plan_name,
        id_or_ssn:insured.id_or_ssn,
        first_name:insured.first_name,
        middle_name:insured.middle_name,
        last_name:insured.last_name,
        title:insured.title,
        day:insured.dob.day,
        month:insured.dob.month,
        year:insured.dob.year,
        address:insured.insurance_address,
        state:insured.state,
        city:insured.city,
        zipcode:insured.zipcode,
        email:insured.email,
        phone:insured.phone,
        service_number:insured.service_number,
        employeed:insured.employeed,
        contact_for_verification:insured.contact_for_verification,
        gender:insured.gender

      })
      .then((res) => {
        console.log(res);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject();
      });

    });

  },

  addInsurance({state}) {

    let insurance = state.insurance;
    let insured = state.insured;

    return new Promise((resolve, reject) => {
      this.$axios.post(`${process.env.api.baseURL}/auth/insurance/create`, {

        person:insurance.person,
        package:insurance.package,
        financial_guarantor_name:insurance.financial_guarantor,
        insurance_name:insurance.name,
        type:insurance.type,
        policy_number:insurance.policy_number,
        plan_name:insurance.plan_name,
        id_or_ssn:insured.id_or_ssn,
        first_name:insured.first_name,
        middle_name:insured.middle_name,
        last_name:insured.last_name,
        title:insured.title,
        day:insured.dob.day,
        month:insured.dob.month,
        year:insured.dob.year,
        address:insured.insurance_address,
        state:insured.state,
        city:insured.city,
        zipcode:insured.zipcode,
        email:insured.email,
        phone:insured.phone,
        service_number:insured.service_number,
        employeed:insured.employeed,
        contact_for_verification:insured.contact_for_verification,
        gender:insured.gender

      })
      .then((res) => {
        resolve();
      })
      .catch((err) => {
        reject();
      });
    });

  },

  fetchInsuranceInfo({dispatch}, id) {

    return new Promise((resolve, reject) => {

      this.$axios.post(`${process.env.api.baseURL}/auth/insurance/${id}`)
      .then(({data}) => {
        dispatch('autoFullInsuranceInfo', data);
        resolve();
      })
      .catch(() => {
        reject();
      });

    });

  },

  autoFullInsuranceInfo({dispatch}, data) {

    dispatch('editInfo', {param:'contact_for_verification', value:data.can_contact_employer, section:'insured'});

    dispatch('editInfo', {param:'financial_guarantor', value:data.guarantor, section:'insurance'});

    dispatch('editInfo', {param:'package', value:data.insurance_package, section:'insurance'});

    dispatch('editInfo', {param:'name', value:data.company_name, section:'insurance'});

    dispatch('editInfo', {param:'plan_name', value:data.plan_name, section:'insurance'});

    dispatch('editInfo', {param:'policy_number', value:data.policy_number, section:'insurance'});

    dispatch('editInfo', {param:'service_number', value:data.insurance_service_number, section:'insured'});

    dispatch('editInfo', {param:'type', value:data.insurance_type, section:'insurance'});

    dispatch('editInfo', {param:'id_or_ssn', value:data.insured_ssn, section:'insured'});

    dispatch('editInfo', {param:'employeed', value:data.is_employeed, section:'insured'});

    dispatch('editInfo', {param:'person', value:data.person, section:'insurance'});

  },

  fetchPayerNames({dispatch, state}) {

    let text = state.insurance.name;
    if(text == '') {
      dispatch('index_and_search/emptyResults', '', {root:true});
      return;
    }

    axios.get(`${process.env.api.baseURL}/fetchPayerNames`, {

      params : {
        q:text
      }

    })

    .then(({data}) => {
      //dispatch('setPayerNames', data);
      dispatch('index_and_search/setSearchResults', data, {root:true});
    });

  },

  fetchTypes({commit}) {
    axios.get(`${process.env.api.baseURL}/fetchTypes`)

    .then(({data}) => {
      commit('editInfo', {param:'types', value:data, section:'insurance'});
    });
  },

  setPayerNames({commit}, data) {
    commit('setPayerNames', data);
  },

  editInfo({commit}, info) {
    commit('editInfo', info);
  },

  autoFillAuthInfo({dispatch}) {
    dispatch('authenticated');
    dispatch('getPhone');
    dispatch('getYear');
    dispatch('getMonth');
    dispatch('getDay');
    dispatch('getEmail');
    dispatch('getZipCode');
    dispatch('getCity');
    dispatch('getState');
    dispatch('getAddress');
    dispatch('getFirstName');
    dispatch('getMiddleName');
    dispatch('getLastName');
    dispatch('getGender');
    dispatch('getStates');
    dispatch('getCities');
  },

  resetAuthInfo({commit}) {
    commit('editInfo', {param:'phone', value:null, section:'insured'});
    commit('editInfo', {param:'first_name', value:null, section:'insured'});
    commit('editInfo', {param:'middle_name', value:null, section:'insured'});
    commit('editInfo', {param:'last_name', value:null, section:'insured'});
    commit('editInfo', {param:'insurance_address', value:null, section:'insured'});
    commit('editInfo', {param:'state', value:0, section:'insured'});
    commit('editInfo', {param:'city', value:0, section:'insured'});
    commit('editInfo', {param:'email', value:null, section:'insured'});
    commit('editInfo', {param:'gender', value:0, section:'insured'});
    commit('editInfo', {param:'zipcode', value:null, section:'insured'});
    commit('editDob', {param:'day', value:0});
    commit('editDob', {param:'month', value:0});
    commit('editDob', {param:'year', value:0});
  },

  async getStates({commit}) {

    await axios.get(`${process.env.api.baseURL}/getStates`)
    .then(({data}) => {
      commit('addStates', data);
    });

  },

  getCities({commit, state}, change) {
    if(change == 0) {
      commit('editInfo', {param:'city', value:0, section:'insured'});
    }

    let id = state.insured.state;
    if(state.insured.state != 0) {

      axios.get(`${process.env.api.baseURL}/getCities` , {
        params: {
          state_id:id
        }
      })
      .then(({data}) => {
        commit('addCities', data);
      });

    }

  },

  authenticated({commit, rootGetters}) {
    let auth = rootGetters['auth/loggedIn'];
    let user = rootGetters['auth/user'];
    if(auth) {
      commit('setLoggedIn', auth);
      commit('setAuth', user);
    }
  },

  getPhone({commit, state}) {

    if(state.loggedIn) {
      commit('editInfo', {param:'phone', value:state.user.phone, section:'insured'});
    }

  },

  getFirstName({commit,state}) {
    if(state.loggedIn) {
      commit('editInfo', {param:'first_name', value:state.user.first_name, section:'insured'});
    }
  },

  getMiddleName({commit,state}) {
    if(state.loggedIn) {
      commit('editInfo', {param:'middle_name', value:state.user.middle_name, section:'insured'});
    }
  },

  getLastName({commit, state}) {
    if(state.loggedIn) {
      commit('editInfo', {param:'last_name', value:state.user.last_name, section:'insured'});
    }
  },

  getAddress({commit, state}) {
    if(state.loggedIn) {
      commit('editInfo', {param:'insurance_address', value:state.user.address.address, section:'insured'});
    }
  },

  getState({commit, state}) {
    if(state.loggedIn) {
      commit('editInfo', {param:'state', value:state.user.address.state, section:'insured'});
    }
  },

  getCity({commit, state}) {
    if(state.loggedIn) {
      commit('editInfo', {param:'city', value:state.user.address.city, section:'insured'});
    }
  },

  getZipCode({commit, state}) {
    if(state.loggedIn) {
      commit('editInfo', {param:'zipcode', value:state.user.zipcode, section:'insured'});
    }
  },

  getEmail({commit, state}) {
    if(state.loggedIn) {
      commit('editInfo', {param:'email', value:state.user.email, section:'insured'});
    }
  },

  getDay({commit, state}) {
    if(state.loggedIn) {
      let dob = state.user.dob.split('-');
      let day = dob[0];
      commit('editDob', {param:'day', value:day});
    }
  },

  getMonth({commit,state}) {
    if(state.loggedIn) {
      let dob = state.user.dob.split('-');
      let month = dob[1];
      commit('editDob', {param:'month', value:month});
    }
  },

  getYear({commit, state}) {

    if(state.loggedIn) {
      let dob = state.user.dob.split('-');
      let year = dob[2];
      commit('editDob', {param:'year', value:year});
    }
  },

  getGender({commit,state}) {
    if(state.loggedIn) {
      commit('editInfo', {param:'gender', value:state.user.gender, section:'insured'});
    }
  }

}

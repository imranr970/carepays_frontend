export default {

  updateUserDetails(state, data) {
    let param = data.param;
    let value = data.value;
    state.user[param] = value;
  },

  updateOriginalImage(state, data) {
    state.user.user_image = data;
  },

  updateUserName(state, data) {
    state.user.first_name = data.first_name;
    state.user.middle_name = data.middle_name;
    state.user.last_name = data.last_name;
  },

  editInfo(state, info) {
    let key = info.param;
    let value = info.value;
    let section = info.section;
    //state.profile[key] = value;
    state[section][key] = value;
  },

  editDob(state, info) {
    let param = info.param;
    let value = info.value;
    state.profile.dob[param] = value;
  },

  setUser(state, data) {
    state.loggedin = true;
    state.user     = data.data;
    //state.token    = data.meta.token;
  },

  updateUserEmail(state, email) {
    state.user.email = email;
  }

}

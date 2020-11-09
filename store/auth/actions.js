
export default {

  editInfo({commit}, info) {
    commit('editInfo', info);
  },

  editDob({commit}, info) {
    commit('editDob', info);
  },

  updateUserOriginalImage({commit}, data) {
    commit('updateOriginalImage', data);
  },

  updateUserInfo({commit}, info) {
    commit('updateUserDetails', info);
  },

  updateProfileBasics({state}) {
    let profile = state.profile;

    return new Promise((resolve, reject) => {
      this.$axios.post(`auth/update/basic-info`, {
        first_name   : profile.first_name,
        last_name    : profile.last_name,
        middle_name  : profile.middle_name,
        gender       : profile.gender,
        day          : profile.dob.day,
        month        : profile.dob.month,
        year         : profile.dob.year,
        phone        : profile.phone,
        alt_phone    : profile.alt_phone,
        language     : profile.language
      })
      .then(({data}) => {
        this.$toast.success(data).goAway(5000);
       resolve();
      })
      .catch(() => {
        reject();
      });
    });


  },

  updateProfileAddress({state}) {

    let profile = state.profile;

    return new Promise((resolve, reject) => {
      this.$axios.post(`auth/update/address`, {
        address   : profile.address,
        address2  : profile.address2,
        zipcode   : profile.zipcode,
        city      : profile.city,
        state     : profile.state,
      })
      .then(({data}) => {
       this.$toast.success(data).goAway(5000);
       resolve();
      })
      .catch(() => {
        reject();
      });
    });


  },

  changeUserPassword({state}, data) {


    return new Promise((resolve, reject) => {

      this.$axios.post(`auth/update/security/password`, {

        old_password         : data.old_password,
        new_password         : data.new_password,
        confirm_new_password : data.confirm_new_password,

      })
      .then(({data}) => {
       resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });

    });


  },

  changeProfileEmail({dispatch}, data) {

    return new Promise((resolve, reject) => {

      let email = data.email;
      let password = data.password;

      this.$axios.post(`auth/update/security/email`, {

        email,
        password,

      })
      .then(({data}) => {
       resolve(data);
       dispatch('updateUserEmail', email);
      })
      .catch((err) => {
        reject(err);
      });

    });

  },

  updateUserEmail({commit}, data) {
    commit('updateUserEmail', data);
  },

  updateUserName({commit}, data) {
    commit('updateUserName', data);
  },

  setLoginDetails({commit}, data) {
    // commit('SET', {key:'busy', value:false});
    // commit('SET', {key:'user', value:data.data});
    // commit('SET', {key:'loggedin', value:true});
    commit('setUser', data);
  }

}

export default {

  loading: (state) => state.loading,

  invoice: (state) => state.invoice,

  order: (state, getters) => getters.hasOrder ? state.invoice.order : {},

  gender(state, getters) {
    if(getters.hasOrder && getters.user) {
      return getters.user.gender == 1 ? 'Male' : 'Female';
    }
    return '';
  },

  doctor:(state, getters) => id => getters.hasDoctor(id)
  ? getters.getCheckout(id).doctor
  : {},

  getCheckout(state, getters) {
    return function(id) {
      let checkout = getters.checkout.find(checkout => checkout.id === id);
      return checkout === undefined ? {} : checkout;
    }

  },

  doctorTreatments(state, getters) {

    return (id) => {
      return getters.hasDoctorTreatments(id)
      ? getters.getCheckout(id).doctor_treatments
      : {}
    }

  },


  user: (state, getters) => getters.hasUser ? getters.order.user : {},

  insurance: (state, getters) => getters.hasInsurance ? getters.order.insurance_plan : {},

  userAddress: (state, getters) => getters.hasUserAddress ? getters.user.address : {},

  checkout: (state, getters) => getters.hasCheckout ? getters.order.checkout : {},

  pos(state, getters) {

    return function(id) {

      if(getters.hasDoctor(id) && getters.hasDoctorTreatments(id)) {
        let place_of_service = getters.doctorTreatments(id).place_of_service
        return place_of_service.toUpperCase() == 'O' ? 11 : 21
      }
      return null
    };

  },

  categories() {
    return {
      surgery: 2,
      consultation: 3,
      radiology: 4,
      pathology: 5,
      anesthesia: 7
    }
  },

  tos(state, getters) {

    return function (id) {

      if(getters.hasCheckout) {

        let category = getters.getCheckout(id).category;
        let categories = getters.categories;

        category = category ? category.toLowerCase() : category;
        if(categories.hasOwnProperty(category)) return categories[category];

      }

      return null;
    }

  },

  usersFormattedDob(state, getters) {
    let dob = getters.user.dob;
    let day, month, year, date;

    if(dob != '') {
      date = dob.split('-');
      day = date[date.length-1];
      month = date[date.length-2];
      year = date[date.length-3];
    }
    return year + month + day;
  },

  hasOrder: (state) => state.invoice && state.invoice.order,

  hasInsurance: (state, getters) => getters.hasOrder && getters.order.insurance_plan,

  hasCheckout: (state, getters) => getters.hasOrder && getters.order.checkout.length,

  hasUser: (state, getters) => getters.hasOrder && getters.order.user,

  hasUserAddress: (state, getters) => getters.hasUser && getters.user.address,

  hasDoctor: (state, getters) => id => getters.hasCheckout && getters.getCheckout(id).doctor,

  hasDoctorTreatments: (state, getters) => (id) => {
    return getters.hasCheckout && getters.getCheckout(id).doctor_treatments
  },

  icds(state, getters) {
    if(getters.hasCheckout) {
      let icds = getters.checkout.map(checkout => checkout.icds);
      return icds.length ? icds.slice(0, 12).flat(Infinity) : []
    }
    return [];
  }

}

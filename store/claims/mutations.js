import Vue from 'vue'
export default {

  fillInvoice(state, data) {
    state.invoice = data;
  },

  loading(state, val) {
    state.loading = val;
  },

  updatePatientBasicInfo(state, data) {
    let {user, insurance} = data
    let order = state.invoice.order
    Vue.set(order, 'user', user)
    Vue.set(order, 'insurance_plan', insurance)
  },

  updatePatientInsurance(state, data) {
    let {insurance} = data
    Vue.set(state.invoice.order, 'insurance_plan', insurance)
  },

  addNewIcdCode(state, icd_code) {
    let checkout = state.invoice.order.checkout
    checkout[checkout.length-1].icds.push({icd_code})
  },

  removeIcdCode(state, icd) {
    let checkout = state.invoice.order.checkout
    checkout.map(checkout => {
      let icds = checkout.icds.filter(checkoutIcd => {
        return checkoutIcd.icd_code !== icd.icd_code
      })
      Vue.set(checkout, 'icds', icds)
    })
  },

  updateIcdCode(state, {value, icd}) {
    let checkout = state.invoice.order.checkout
    checkout.map(checkout => {
      let icds = checkout.icds.forEach(checkoutIcd => {
       if(checkoutIcd.icd_code === icd.icd_code) {
         checkoutIcd.icd_code = value
       }
      })
    })
  },

  addNewLineItem(state) {
    let checkout = state.invoice.order.checkout
    checkout.push({
      cpt: '',
      icds: []
    })
  }

}

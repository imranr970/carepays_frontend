
import axios from 'axios';

export default {

  async getInvoiceReport({commit, state}, id) {
    commit('loading', true)
    await axios.get(`${process.env.api.baseURL}/reports/invoices/${id}`)
    .then(({data}) => {

      commit('fillInvoice', data)
      commit('loading', false)

    })
    .catch((err) => {
      commit('loading', false)
    });

  },

  fillInvoice({commit}, invoice) {
    commit('fillInvoice', invoice)
  },

  updatePatientClaimInfo({commit}, data) {
    commit('updatePatientBasicInfo', data)
  },

  updatePatientInsurance({commit}, data) {
    commit('updatePatientInsurance', data)
  },

  addNewIcdCode({commit}, {icd_code}) {
    commit('addNewIcdCode', icd_code)
  },

  removeIcdCode({commit}, icd) {
    commit('removeIcdCode', icd)
  },

  updateExistingIcdCode({commit}, data) {
    commit('updateIcdCode', data)
  },

  addNewLineItem({commit}) {
    commit('addNewLineItem')
  }

}

export default {

  items(state) {
    return state.items;
  },

  count(state) {
    return state.count;
  },

  loading: state => state.loading,

  charges: state => (item, type) => item.charges_details[type],

  shouldIncludeCharges: state => (item, type) => item.charges_details.added_charges_list[type],

  totalChargesOfItem(state, getters) {

    return function(item) {

      let total = Number(this.amountPayable(item));
 
      if(item.add_evob_charges) total += Number(item.evob_charges)

      let charges = (type) => getters.charges(item, type)
      let addCharges = (type) => getters.shouldIncludeCharges(item, type)

      if(item.hidden_charges.fee !== null && item.hidden_charges.fee !== 0 && item.hidden_charges.fee !== '0' && addCharges('hidden_charges')) {
        total += Number(item.hidden_charges)
      }

      if(charges('pathology').fee !== null && charges('pathology').fee !== 0 && charges('pathology').fee !== '0' && addCharges('pathology')) {
        total += Number(charges('pathology').fee)
      }

      if(charges('radiology').fee !== null && charges('radiology').fee !== 0 && charges('radiology').fee !== '0' && addCharges('radiology')) {
        total += Number(charges('radiology').fee)
      }

      if(charges('cosurg_details').fee !== null && charges('cosurg_details').fee !== 0 && charges('cosurg_details').fee !== '0' && addCharges('cosurg_details')) {
        total += Number(charges('cosurg_details').fee)
      }

      if(item.anesthesia_fee !== null && item.anesthesia_fee !== 0 && item.anesthesia_fee !== '0' && addCharges('anesthesia')) {
        total += Number(item.anesthesia_fee)
      }

      if(item.facility_expenses !== null && item.facility_expenses !== 0 && item.facility_expenses !== '0' && addCharges('facility_expenses')) {
        total += Number(item.facility_expenses)
      }

      return total.toFixed(2);
    }

  },

  grandTotal(state, getters) {

    var total = 0;

    state.items.filter((item) => {
      return total += Number(getters.totalChargesOfItem(item));
    });

    return total.toFixed(2);

  },


  amountPayable() {

    return function(item) {
      if(item.negotiated_cost !== null) {
        return item.negotiated_cost;
      }
      //return item.average_cost;
      return item.purchase_cost;
    }

  },


}

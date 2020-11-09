<template>

  <div>

    <button class="btn btn--secondary btn--xs no-shadhow" @click.prevent="save">save</button>
    <button class="btn btn--default btn--xs no-shadhow" @click.prevent="$emit('cancel')">cancel</button>

    <table class="table mb-sm claim-table">
      <thead>
        <tr>
          <td>Line</td>
          <td>POS</td>
          <td>TOS</td>
          <td>CPT</td>
          <td>Description</td>
          <td>Diag</td>
          <td>Units</td>
          <td>Charged</td>
          <td>Expected</td>
          <td>Patient Responsibility</td>
        </tr>
      </thead>
      <template>
        <tbody v-if="hasCheckout">

          <tr v-for="(checkout, index) in claimCheckouts" :key="index">
            <td>1</td>
            <td>
              <select class="form-control form-control--sm">
                <option value="0">Please select</option>
                <option :selected="pos(checkout.id) == place.code" :value="pos.code" v-for="place in place_of_services" :key="place.id">
                  {{place.name}}
                </option>
              </select>
            </td>
            <td>
              <select type="text" class="form-control form-control--sm">
                <option value="0">Please select</option>
                <option :selected="tos(checkout.id) == service.code" :value="tos.code" v-for="service in type_of_services" :key="service.code">
                  {{service.name}}
                </option>
              </select>
            </td>
            <td>
                <input type="text" class="form-control form-control--sm" :value="checkout.cpt">
            </td>
            <td>
                {{checkout.treatment_description}}
            </td>
            <td>1,2,3</td>
            <td>1</td>
            <td>
                ${{amountPayable(checkout)}}
            </td>
            <td>
              <span v-if="hasDoctorTreatments(checkout.id)">
                {{formatter(doctorTreatments(checkout.id).avg_medicare_allowed_amount)}}
              </span>
            </td>
            <td>$0</td>
          </tr>
        </tbody>
      </template>

    </table>

    <button @click.prevent="addNewLineItem" class="btn btn--secondary btn--xs no-shadow">Add new <i class="fas fa-plus"></i></button>

  </div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {

  data() {
    return {
      place_of_services: [],
      type_of_services: []
    }
  },

  computed: {

    ...mapGetters('claims', {
      pos: 'pos',
      tos: 'tos',
      hasCheckout: 'hasCheckout',
      checkouts: 'checkout',
      hasDoctorTreatments: 'hasDoctorTreatments',
      doctorTreatments: 'doctorTreatments'
    }),

    ...mapGetters({
      amountPayable: 'cart/amountPayable'
    }),

    claimCheckouts() {
      return {...this.checkouts}
    }

  },

  methods: {

    ...mapActions('claims', {
      addNewLineItem: 'addNewLineItem'
    }),

    save() {

    }
  },

  created() {
    this.$axios.get(`get-pos-tos`)
    .then(({data}) => {
      this.place_of_services = data.place_of_services
      this.type_of_services = data.type_of_services
    })
  }

}
</script>


<template>
  <div>

    <a href="#" @click.prevent="$emit('edit', 'patientLineItems')">
      <i class="fas fa-pen"></i>edit
    </a>

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

      <template v-if="hasCheckout">
        <tbody v-for="(checkout, index) in checkouts" :key="index">
          <tr>
            <td>1</td>
            <td>{{pos(checkout.id)}}</td>
            <td>{{tos(checkout.id)}}</td>
            <td>
                {{checkout.cpt}}
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

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {

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
    })

  }

}
</script>


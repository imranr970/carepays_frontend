<template>

  <div class="card">
     <h4 class="card-header">
      Insurance
      <a href="#" @click.prevent="$emit('edit', 'patientInsurance')">
        <i class="fas fa-pen"></i>edit
      </a>
    </h4>

    <div class="card-body">

      <table class="w-100 claim-table" border="2">

        <tr>
          <td colspan="2">
            <div v-if="hasInsurance">
              <p>{{insurance.company_name}}</p>
              <p><span class="text--dark">Type:</span> {{insurance.insurance_type}}</p>
              <p><span class="text--dark">PayerId:</span> {{insurance.payer_id}}</p>

            </div>

          </td>
        </tr>

        <tr>
          <td class="text--dark">Relation:</td>
          <td>
            <span v-if="hasInsurance">
              {{insurance.person}}
            </span>
          </td>
        </tr>

        <tr>
          <td class="text--dark">Member:</td>
          <td>45678</td>
        </tr>

      </table>

    </div>


  </div>

</template>

<script>
import {mapGetters} from 'vuex'
export default {

  computed: {

    ...mapGetters('claims', {
      insurance: 'insurance',
      hasInsurance: 'hasInsurance'
    })

  }

}
</script>

<template>

  <div>

    <table border="2" class="my-xs claim-table">
      <tr class="t-head">
        <td colspan="4" class="text--dark">
          Billing Provider
          <a href="#" @click.prevent="$emit('edit', 'billingProvider')">
            <i class="fas fa-pen"></i>
          </a>
        </td>
      </tr>
      <tr>
        <td colspan="4">
          <div v-if="hasDoctor(checkout[0].id)">
            <p>
              {{doctor(checkout[0].id).first_name}}
              {{doctor(checkout[0].id).middle_name_initial}}
              {{doctor(checkout[0].id).last_name_or_organization_name}},
              &nbsp;{{doctor(checkout[0].id).credentials}}
            </p>
            <p v-if="checkout[0].doctor_address">
              {{checkout[0].doctor_address.street_address1}} {{checkout[0].doctor_address.street_address2}},
              {{checkout[0].doctor_address.zip_code}},
              {{checkout[0].doctor_address.city}},
              {{checkout[0].doctor_address.state}}
            </p>
          </div>
        </td>
      </tr>

      <tr>
        <td class="text--dark">NPI:</td>
        <td colspan="3">{{doctor(checkout[0].id).npi}}</td>
      </tr>

      <tr>
        <td class="text--dark">SSN:</td>
        <td></td>

        <td class="text--dark">TAXID:</td>
        <td>{{doctor(checkout[0].id).taxid}}</td>
      </tr>

      <tr>
        <td class="text--dark">UPIN:</td>
        <td>A64817</td>

        <td class="text--dark">TaxonomyCode:</td>
        <td>{{doctor(checkout[0].id).doctor_taxonomy_codes}}</td>
      </tr>

      <tr>
        <td class="text--dark">Speciality:</td>
        <td colspan="3">
          {{doctor(checkout[0].id).provider_type}}
        </td>
      </tr>

      <tr>
        <td class="text--dark">Provider Signature:</td>
        <td>Y</td>
        <td class="text--dark">Signature Date:</td>
        <td>Some date</td>
      </tr>

    </table>

  </div>

</template>

<script>
import {mapGetters} from 'vuex'
export default {


  computed: {
    ...mapGetters('claims', {
      checkout: 'checkout',
      hasDoctor: 'hasDoctor',
      doctor: 'doctor'
    })
  }
}
</script>


<template>

  <table border="2" class="my-xs claim-table">

    <tr class="t-head">
      <td colspan="4" class="text--dark">
        Billing Provider
        <button class="btn btn--secondary btn--xs no-shadow" @click.prevent="save">save</button>
        <button class="btn btn--default btn--xs no-shadow" @click.prevent="$emit('cancel')">cancel</button>
      </td>
    </tr>

    <tr>
      <td colspan="4">
        <div v-if="hasDoctor(claimCheckout[0].id)">
          <div class="form-group">
            <input type="text" placeholder="first name" class="form-control form-control--sm w-50" :value="doctor(claimCheckout[0].id).first_name">
            <input type="text" placeholder="middle name initial" class="form-control form-control--sm w-50" :value="doctor(claimCheckout[0].id).middle_name_initial">
            <input type="text" placeholder="last name" class="form-control form-control--sm w-50" :value="doctor(claimCheckout[0].id).last_name_or_organization_name">
            &nbsp;{{doctor(claimCheckout[0].id).credentials}}
          </div>
          <div class="form-group" v-if="claimCheckout[0].doctor_address">
            <input type="text" placeholder="street address 1" class="form-control form-control--sm w-50" :value="claimCheckout[0].doctor_address.street_address1">
            <input type="text" placeholder="street address 2" class="form-control form-control--sm w-50" :value="claimCheckout[0].doctor_address.street_address2">
            <input type="text" placeholder="street address 2" class="form-control form-control--sm w-50" :value="claimCheckout[0].doctor_address.zip_code">

            <select @change="getCities({namespace:'auth', change:0})" class="form-control form-contorl--sm w-50" v-model="claimCheckout[0].doctor_address.state">
              <option value="null">Please select</option>
              <template>
                <option :value="state.id" v-for="state in states" :key="state.id">
                  {{state.state}}
                </option>
              </template>
            </select>

             <select class="form-control form-contorl--sm w-50" v-model="claimCheckout[0].doctor_address.city">
              <option value="null">Please select</option>
              <template v-if="cities.length">
                <option :value="city.id" v-for="(city, index) in cities" :key="index">
                  {{city.city}}
                </option>
              </template>
            </select>
          </div>
        </div>
      </td>
    </tr>

    <tr>
      <td class="text--dark">NPI:</td>
      <td colspan="3">
        <input type="text" placeholder="npi" class="form-control form-control--sm w-50" :value="doctor(claimCheckout[0].id).npi">
      </td>
    </tr>

    <tr>
      <td class="text--dark">SSN:</td>
      <td>
        <input type="text" placeholder="ssn" class="form-control form-control--sm w-50">
      </td>

      <td class="text--dark">TAXID:</td>
      <td>
        <input type="text" placeholder="taxid" class="form-control form-control--sm w-50" :value="doctor(claimCheckout[0].id).taxid" />
      </td>
    </tr>

    <tr>
      <td class="text--dark">UPIN:</td>
      <td>
        <input type="text" placeholder="upin" class="form-control form-control--sm w-50">
      </td>

      <td class="text--dark">TaxonomyCode:</td>
      <td>
        <input type="text" placeholder="taxonomy code" class="form-control form-control--sm w-50" :value="doctor(claimCheckout[0].id).doctor_taxonomy_codes">
      </td>
    </tr>

    <tr>
      <td class="text--dark">Speciality:</td>
      <td colspan="3">
        <input type="text" placeholder="speciality" class="form-control form-control--sm w-50" :value="doctor(claimCheckout[0].id).provider_type" />
      </td>
    </tr>

    <tr>
      <td class="text--dark">Provider Signature:</td>
      <td>Y</td>
      <td class="text--dark">Signature Date:</td>
      <td>Some date</td>
    </tr>

  </table>

</template>

<script>

import {mapGetters, mapActions} from 'vuex'
export default {

  computed: {
    ...mapGetters('claims', {
      checkout: 'checkout',
      hasDoctor: 'hasDoctor',
      doctor: 'doctor'
    }),

    ...mapGetters({
      states: 'states',
      cities: 'cities'
    }),

    claimCheckout() {
      return {...this.checkout}
    }

  },

  methods: {

    ...mapActions({
      getStates: 'getStates',
      getCities: 'getCities'
    }),

    save() {

    }
  },

  beforeMount() {
    this.getStates()
    this.getCities({namespace:'auth', change:1});
  }
}
</script>

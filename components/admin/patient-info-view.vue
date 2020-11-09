<template>

  <div class="card">

    <h4 class="card-header">
      Patient
      <a href="#" @click.prevent="$emit('edit')">
        <i class="fas fa-pen"></i>edit
      </a>
    </h4>

    <div class="card-body">

      <table border=2 class="w-100 claim-table">
        <tr>
          <td rowspan="4" colspan="2">
            <p v-if="hasUser">
              {{user.first_name}}
              {{user.middle_name || ''}}
              {{user.last_name}}
            </p>
            <p v-if="hasUserAddress">
              {{userAddress.address}}
            </p>
          </td>
          <td class="text--dark">Status:</td>
          <td class="status-col">{{order.order_status}}</td>
        </tr>

        <tr>
          <td class="text--dark">Account:</td>
          <td>{{user.id}}</td>
        </tr>

        <tr>
          <td class="text--dark">DOB:</td>
          <td>
            <span v-if="hasUser && user.dob">
              {{user.dob.split(' ')[0]}}
            </span>
          </td>
        </tr>

        <tr>
          <td class="text--dark">Gender:</td>
          <td>
            <span v-if="hasUser">
              {{gender}}
            </span>
          </td>
        </tr>

        <tr>
          <td class="text--dark">Emp:</td>
          <td>Other</td>
          <td class="text--dark">SSN:</td>
          <td>
            <span v-if="hasInsurance">
              {{insurance.insured_ssn}}
            </span>
          </td>
        </tr>

        <tr>
          <td class="text--dark">Marital:</td>
          <td>Single</td>
          <td class="text--dark">Cell:</td>
          <td>
            <span v-if="hasUser">
              {{user.phone}}
            </span>
          </td>
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
      user: 'user',
      gender: 'gender',
      userAddress: 'userAddress',
      order: 'order',
      hasUser: 'hasUser',
      hasUserAddress: 'hasUserAddress',
      hasInsurance: 'hasInsurance',
      insurance: 'insurance',
      invoice: 'invoice'
    })
  }

}

</script>


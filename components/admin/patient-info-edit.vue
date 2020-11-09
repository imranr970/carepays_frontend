<template>

  <div class="card">

     <h4 class="card-header">
      Patient
      <template>
        <button class="btn btn--secondary btn--xs no-shadow" @click.prevent="save">save</button>
        <button class="btn btn--default btn--xs no-shadow" @click.prevent="$emit('cancel')">cancel</button>
      </template>

    </h4>

    <div class="card-body">

      <table border=2 class="w-100 claim-table">

        <tr>
          <td rowspan="4" colspan="2" class="form-group">
            <template v-if="hasUser">
              <input type="text" class="form-control form-control-sm mb-xs" v-model="claimUser.first_name" placeholder="Patient first name">
              <input type="text" class="form-control form-control-sm mb-xs" v-model="claimUser.middle_name" placeholder="Patient middle name">
              <input type="text" class="form-control form-control-sm" v-model="claimUser.last_name" placeholder="Patient last name">
            </template>

           <textarea class="form-control mt-xs" v-if="hasUserAddress" placeholder="User address" v-model="claimUserAddress.address"></textarea>
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
            <template v-if="hasUser && user.dob">
              <select class="form-control form-control--sm" v-model="year">
                <option value="0">Please select</option>
                <option v-for="year in years" :key="year" :value="year">{{year}}</option>
              </select>

              <select class="form-control form-control--sm" v-model="month">
                <option value="0">Please select</option>
                <option v-for="month in months" :key="month" :value="month">{{month}}</option>
              </select>

              <select class="form-control form-control--sm" v-model="day">
                <option value="0">Please select</option>
                <option v-for="day in days" :key="day" :value="day">{{day}}</option>
              </select>
            </template>


          </td>
        </tr>

        <tr>
          <td class="text--dark">Gender:</td>
          <td>
            <select v-if="hasUser" v-model="claimUserGender" class="form-control form-control--sm">
              <option value="0">Please select</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </td>
        </tr>

        <tr>
          <td class="text--dark">Emp:</td>
          <td>Other</td>
          <td class="text--dark">SSN:</td>
          <td>
            <input class="form-control form-control-sm" v-if="hasInsurance" v-model="claimInsurance.insured_ssn">
          </td>
        </tr>

        <tr>
          <td class="text--dark">Marital:</td>
          <td>Single</td>
          <td class="text--dark">Cell:</td>
          <td>
            <input class="form-control form-control-sm" v-if="hasUser" v-model="claimUser.phone">
          </td>
        </tr>

      </table>

    </div>

  </div>

</template>

<script>

import {mapGetters, mapActions} from 'vuex'

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
    }),


    ...mapGetters({
      years: 'years',
      months: 'monthsInDigits',
      days: 'days'
    }),

    claimUser() {
      return {...this.user};
    },

    claimUserAddress() {
      return {...this.userAddress}
    },

    claimInsurance() {
      return {...this.insurance}
    },

    day: {
      set(value) {
        this.setDob(value, 'day')
      },
      get() {
        return this.claimUser.dob.split('-')[2].substring(0, 2)
      }
    },

    month: {
      set(value) {
        this.setDob(value, 'month')
      },
      get() {
        return this.claimUser.dob.split('-')[1]
      }
    },

    year: {
      set(value) {
        this.setDob(value, 'year')
      },
      get() {
        return this.claimUser.dob.split('-')[0]
      }
    },

    claimUserGender: {
      set(value) {
        this.claimUser.gender = value
      },
      get() {
        return this.claimUser.gender
      }
    }

  },

  methods: {

    ...mapActions('claims', {
      updatePatientClaimInfo: 'updatePatientClaimInfo'
    }),

    setDob(value, key) {
      let day, month, year, dob
      if(key == 'day') {
        day = value
        dob = this.year + "-" + this.month + "-" + day
      }
      if(key == 'month') {
        month = value
        dob = this.year + "-" + month + "-" + this.day
      }
      if(key == 'year') {
        year = value
        dob = year + "-" + this.month + "-" + this.day
      }
      this.claimUser.dob = dob
    },

    save() {
      let claimUser = {
        ...this.claimUser,
        address: {...this.claimUserAddress}
      }
      this.updatePatientClaimInfo({user: claimUser, insurance: this.claimInsurance})
      this.$emit('cancel')
    }

  }

}
</script>


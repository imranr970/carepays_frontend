<template>
  <main class="user-profile">

    <sidebar />

    <div class="card main w-100">

      <div class="card__body">

        <h4 class="heading-4 mb-sm">Insurances</h4>
        <button class="btn btn--default btn--xs less-shadow ml-xs" @click.prevent="$router.push({path:'/insurance/new'})">
          Add new
        </button>

        <table class="table">

          <thead>
            <tr>
              <td>Company Name</td>
              <td>Insured ssn</td>
              <td>Policy Group :</td>
              <td>Plan name:</td>
              <td>Insurance Type:</td>
              <td>Relation</td>
              <td>Plan package</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>

            <template v-if="loading">
              <span class="fas fa-spinner fa-spin"></span>
            </template>

            <template v-else>

              <template v-if="auth_insurances.length">
                <tr v-for="insurance in auth_insurances" :key="insurance.id">
                  <td>{{formattedDesc(insurance.company_name)}}</td>
                  <td>{{insurance.insured_ssn}}</td>
                  <td>{{insurance.policy_number}}</td>
                  <td>{{insurance.plan_name}}</td>
                  <td>{{insurance.insurance_type}}</td>
                  <td>{{insurance.person}}</td>
                  <td>{{insurance.insurance_package}}</td>
                  <td>
                    <nuxt-link :to="{path:`/insurance/edit/${insurance.id}`}">Edit</nuxt-link>
                  </td>
                </tr>
              </template>

              <template v-else>
                <p>You do not have any insurances</p>
              </template>

            </template>

          </tbody>


        </table>

      </div><!--card__body-->

    </div><!--card-->


  </main>

</template>

<script>

import {mapGetters, mapActions} from 'vuex';
import sidebar from '@/components/layouts/profile-sidebar'

export default {

  middleware:'auth',

  components: {
    sidebar
  },

  data() {
    return {
      loading:false
    }
  },

  computed: {
    ...mapGetters({
      auth_insurances : 'insurance/auth_insurances'
    })
  },

  methods: {

    ...mapActions({
      getAuthInsurances : 'insurance/getAuthInsurances'
    }),

    formattedDesc(desc) {
      return desc.length > 40 ? desc.substring(0, 40) + '...' : desc;
    },

  },

  created() {
    this.loading = true;
    this.getAuthInsurances()
    .then(res => this.loading=false)
    .catch(res => this.loading = false);
  }


}
</script>

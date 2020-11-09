<template>

  <div class="popup" id="insurance">

    <div class="popup__content popup__content--large" :class="{'top-70':creating}">

      <a href="#" class="popup__close" @click.prevent="closeModal('insurance')">&times;</a>

      <div class="d-flex justify-content-between">

        <div class="px-sm py-xs">
          <h5 class="heading-5">
            Your Insurances
          </h5>
        </div>

      </div>

      <span class="clearfix"></span>

      <hr>

      <div class="px-sm mt-sm">

        <template v-if="auth_insurances.length">

          <p>Please select your insurance for this treatment</p>

          <template v-if="!creating">

            <form class="form" @keydown="removeError($event.target.name)">

              <div v-for="insurance in auth_insurances" :key="insurance.id">

                <input :id="insurance.id" type="radio" :value="insurance.id" @change="addInsurance(insurance.id)" name="insuranceForCart">

                <label :for="insurance.id">

                  <small>
                    <span class="badge badge-primary" v-if="insurance.insurance_package == 'primary'">
                      Primary
                    </span>

                    <span class="badge badge-secondary" v-if="insurance.insurance_package == 'secondary'">
                      Secondary
                    </span>

                    <span class="badge badge-warning" v-if="insurance.insurance_package == 'tertiary'">
                      Tertiary
                    </span>
                  </small>

                  Insurance plan: {{insurance.company_name}}
                  <span class="radio-button"></span>
                </label>

              </div>

              <div>

                <input id="nullInsurance" type="radio" :value="0" @change="addInsurance(0)" name="insuranceForCart">

                <label for="nullInsurance">
                  None
                  <span class="radio-button"></span>
                </label>

              </div>

              <button class="btn btn--secondary btn--xs mt-sm" @click.prevent="creating=true">
                Add New
              </button>

            </form>

          </template>

          <template v-if="creating">
            <insuranceCreator @cancel="creating=false" @created="getAuthInsurances" />
          </template>

        </template>

        <template v-else>

          <template v-if="creating">
            <insuranceCreator @cancel="creating=false" @created="getAuthInsurances" />
          </template>

          <template v-else>

            <p>You do not have any insurances</p>

            <button class="btn btn--secondary btn--xs" @click.prevent="creating=true">
              Add New
            </button>

          </template>

        </template>

      </div>

      <div class="popup__content--footer px-sm py-xs border-top mt-sm">
        <button class="btn btn--secondary btn--sm popup__close" @click.prevent="$emit('close', 'insurance')">
          Confirm
        </button>

        <a href="#" class="btn btn--default btn--sm" @click="closeModal('insurance')">
          Cancel
        </a>
      </div>

    </div><!--popup__content-->

  </div><!--popup-->

</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import insuranceCreator from './insuranceCreator'

export default {

  components: {
    insuranceCreator
  },

  data() {
    return {
      creating:false,
      insurance:null
    };
  },

  computed: {
    ...mapGetters({
      auth_insurances : 'insurance/auth_insurances'
    })
  },

  methods: {

    ...mapActions({
      removeError : 'validation/removeError',
      getAuthInsurances : 'insurance/getAuthInsurances'
    }),

    closeModal(id) {
      this.$emit('close', id);
      this.$emit('selectInsurance', 0);
    },

    addInsurance(id) {
      this.insurance = id;
      this.$emit('selectInsurance', id);
    },

    selectDefaultInsurance() {
      this.auth_insurances.forEach((insurance) => {
        if(insurance.insurance_package == 'primary') {
          this.addInsurance(insurance.id);
        }
      });
    }

  },

  created() {

    this.getAuthInsurances();

  }

}

</script>

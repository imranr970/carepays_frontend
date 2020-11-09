<template>
  <main class="register">

    <div class="alert alert-primary alert-dismissable" v-if="registered">
      Not received email?
      <nuxt-link to="/account?action=resendActivationLink">Resend</nuxt-link>
    </div>

    <div class="card">
        <div class="card__body">

            <h3 class="heading-3">Join Us</h3>

            <form action="#" class="form" @submit.prevent="register" @change="removeError($event.target.name)" @keydown="removeError($event.target.name)">

              <div class="flex">

                <div class="form__group">

                  <label :class="{'text-danger':errors.first_name}" class="form__label" for="firstName">First Name *</label>

                  <input :class="{'has-error':errors.first_name}" type="text" name="first_name" id="firstName" class="form__input-control form__input-control--grey" placeholder="Enter your firstname" v-model="form.first_name">

                  <span class="error-message" v-if="errors.first_name">
                    {{errors.first_name[0]}}
                  </span>

                </div>

                <div class="form__group ml-xs">
                  <label :class="{'text-danger':errors.last_name}" class="form__label" for="lastName">Last Name</label>
                  <input :class="{'has-error':errors.last_name}" type="text" name="last_name" id="lastName" class="form__input-control form__input-control--grey" placeholder="Enter your lastname" v-model="form.last_name">

                  <span class="error-message" v-if="errors.last_name">
                    {{errors.last_name[0]}}
                  </span>

                </div>

              </div>

              <div class="form__group">

                <label :class="{'text-danger':errors.email}" class="form__label" for="email">Email *</label>

                <input :class="{'has-error':errors.email}" type="email" name="email" id="email" class="form__input-control form__input-control--grey" placeholder="Enter your email" v-model="form.email">

                <span class="error-message" v-if="errors.last_name">
                    {{errors.last_name[0]}}
                </span>

              </div>

              <div class="flex">
                <div class="form__group">

                  <label :class="{'text-danger' : errors.password}" class="form__label" for="password">Password *</label>
                  <input :class="{'has-error' : errors.password}" type="text" name="password" id="password" class="form__input-control form__input-control--grey" placeholder="Enter your password" v-model="form.password">

                  <span class="error-message" v-if="errors.password">
                    {{errors.password[0]}}
                  </span>

                </div>

                <div class="form__group">

                  <label :class="{'text-danger' : errors.confirm_password}" class="form__label" for="confirmPassword">Confirm Password *</label>
                  <input :class="{'has-error' : errors.confirm_password}" type="text" name="confirm_password" id="confirmPassword" class="form__input-control form__input-control--grey" placeholder="re-enter password" v-model="form.confirm_password">

                    <span class="error-message" v-if="errors.confirm_password">
                    {{errors.confirm_password[0]}}
                  </span>

                </div>
              </div>


              <div class="form__group">

                <label class="form__label" :class="{'text-danger':errors.day || errors.month || errors.year}">Birthday</label>

                <div class="flex">

                  <select :class="{'has-error':errors.day}" name="day" class="form__input-control form__input-control--grey flex-1" v-model="form.dob.day">
                    <option value="0">Day</option>
                    <option v-for="(day, index) in 31" :key="index" :value="index+1">{{day}}</option>
                  </select>

                  <select :class="{'has-error':errors.month}" name="month" class="form__input-control form__input-control--grey flex-2" v-model="form.dob.month">
                    <option value="0">Month</option>
                    <option v-for="(month, index) in months" :value="index+1" :key="index">{{month}}</option>
                  </select>

                  <select :class="{'has-error':errors.year}" name="year" class="form__input-control form__input-control--grey flex-1" v-model="form.dob.year">
                    <option value="0">Year</option>
                    <option v-for="(year, index) in years" :key="index" :value="year">
                      {{year}}
                    </option>
                  </select>

                </div><!--flex-->

              </div>

              <div class="form__group position--relative">

                <label :class="{'text-danger':errors.address}" for="userAddress" class="form__label">Address</label>

                <autocomplete v-model="form.address" id="userAddress" :class="{'has-error':errors.address}" classes="form__input-control form__input-control--grey pr-md" name="address" />
                <gpsLocator />

              </div>

              <div class="form__group">

                <label :class="{'text-danger':errors.gender}" for="gender" class="form__label">Gender</label>
                <select :class="{'has-error':errors.gender}" id="gender" name="gender" class="form__input-control form__input-control--grey" v-model="form.gender">
                  <option value="0">Please select</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>

                <span class="error-message" v-if="errors.gender">
                  {{errors.gender[0]}}
                </span>

              </div>

              <div class="form__group">
                <p class="d--inline form__label">
                    Do you have insurance?*
                </p>
                <label class="switch switch--sm d--inline ml-sm">
                  <input type="checkbox" v-model="form.insurance">
                  <span class="slider round slider--sm"></span>
                </label>
              </div>

              <div class="form__group">
                <p class="d--inline form__label">
                    Would you like to sign up for medical treatment promotions in your area?
                </p>
                <label class="switch switch--sm d--inline">
                  <input type="checkbox" v-model="form.coverage">
                  <span class="slider round slider--sm"></span>
                </label>
              </div>

              <div class="form__group">

                <label class="checkbox__container checkbox__container--block" for="terms">

                  I agree to your
                  <a href="#">Terms of services and privacy policy</a>
                  <input class="answers-checkbox"  type="checkbox" id="terms" v-model="form.agreed_on_terms">
                  <span class="checkmark checkmark--green"></span>

                </label>

              </div>

              <div class="form__group text--center">
                <button :disabled="shouldDisable || processing" type="submit" class="btn btn--primary px-md">
                  Join Now
                  <i class="fas fa-spinner fa-spin" v-if="processing"></i>
                </button>
              </div>

            </form>

        </div>
    </div>

  </main>

</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import { validate } from '@/plugins/validationForm/register.js';
import autocomplete from '@/components/autocomplete'
import gpsLocator from '@/components/gpsLocator'

export default {

  name:'register',
  middleware:'guest',

  components : {
    autocomplete,
    gpsLocator
  },

  head() {
    return {
      title: `Register your free account - ${process.env.appName}`
    };
  },

  data() {

    return {
      form: {
        first_name:null,
        last_name:null,
        email:null,
        password:null,
        confirm_password:null,
        address:null,
        dob: {
          day:0,
          month:0,
          year:0
        },
        gender:0,
        insurance:false,
        coverage:false,
        agreed_on_terms: false
      },
      registered:true,
      processing:false
    };

  },

  computed: {

    ...mapGetters({
      years : 'years',
      months : 'months'
    }),

    shouldDisable() {
      if(this.form.agreed_on_terms == false || Object.entries(this.errors).length > 0) {
        return true;
      }
      return false;
    }

  },

  methods: {

    ...mapActions({
      removeError:'validation/removeError'
    }),

    async register() {

      if(!this.form.agreed_on_terms) {
        return false;
      }

      if(!validate(this.$store, this.getData())) {
        this.showErrors();
        return;
      }

      this.processing = true;

      var address = $("#userAddress").val();

      await this.$axios.post(`${process.env.api.baseURL}/auth/register`, {

        first_name : this.form.first_name,
        last_name  : this.form.last_name,
        email : this.form.email,
        password : this.form.password,
        confirm_password : this.form.confirm_password,
        address : address,
        day : this.form.dob.day,
        month : this.form.dob.month,
        year : this.form.dob.year,
        gender : this.form.gender,
        insurance : this.form.insurance,
        coverage : this.form.coverage

      })
      .then(({data}) => {
        this.processing = false;
        this.$toast.success('You have been registered successfully. Please check your email to activate your account').goAway(5000);
        this.resetData();
      })
      .catch((e) => {

       this.showErrors();
       this.processing = false;

      });

    },

    showErrors() {
      window.scrollTo({
        top:20,
        behavior:'smooth'
      })

      this.$toast.error('Please Fix some errors below').goAway(5000)
    },

    getData() {
      var address = $("#userAddress").val();
      this.form.address = address;

      return {
        first_name : this.form.first_name,
        last_name  : this.form.last_name,
        email : this.form.email,
        password : this.form.password,
        confirm_password : this.form.confirm_password,
        address : this.form.address,
        day : this.form.dob.day,
        month : this.form.dob.month,
        year : this.form.dob.year,
        gender : this.form.gender,
        insurance : this.form.insurance,
        coverage : this.form.coverage
      }
    },

    resetData() {
      this.form.first_name = null
      this.form.last_name  = null
      this.form.email = null
      this.form.password = null
      this.form.dob.day = 0,
      this.form.dob.month = 0,
      this.form.dob.year = 0,
      this.address = null,
      this.form.phone = null,
      this.form.gender = 0;
      this.registered = true;
    }

  },

  created() {
    this.registered = false;
  }

}
</script>

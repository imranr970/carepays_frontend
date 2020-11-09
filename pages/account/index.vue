<template>

  <main class="register">

    <h4 class="heading-4 account-heading mb-xs">Your Email</h4>

    <div class="card mb-lg">

      <div class="card__body">

        <form class="form" @keydown="removeError($event.target.name)">

          <div class="form__group">

            <label for="" class="form__label" :class="{'text-danger':errors.email}">Email</label>

            <input type="email" name="email" class="form__input-control" placeholder="please enter your email" :class="{'has-error':errors.email}" v-model="email">

            <span class="error-message" v-if="errors.email">
              {{errors.email[0]}}
            </span>

          </div>

          <div class="form__group">

            <template v-if="route=='resendActivationLink'">
              <button @click.prevent="resend" class="btn btn--secondary btn--sm">
                Resend
              </button>
            </template>

            <template v-if="route == 'password-reset'">
              <button @click.prevent="sendResetLink" class="btn btn--secondary btn--sm">
                Send
              </button>
            </template>

          </div>

        </form>

      </div>
    </div>

  </main>

</template>

<script>

import {mapActions} from 'vuex';
import axios from 'axios';

export default {

  name:'account',
  middleware:'guest',

  data() {
    return  {
      email:null,
    };
  },

  computed: {
    route() {
      return this.$route.query.action;
    }
  },

  methods: {

    ...mapActions('validation', {
      removeError    : 'removeError',
      setErrors      : 'setErrors',
      clearErrors    : 'clearErrors',
    }),

    resend() {

      this.clearErrors();

      axios.get(`${process.env.api.baseURL}/auth/resendActivationLink`, {
        params: {
          email: this.email
        }
      })

      .then((res) => {
        this.$toast.success('Email has been resent to your account').goAway(3000);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        this.setErrors(err.response.data.errors);
      });

    },

    sendResetLink() {

      var email = this.email;
      axios.get(`${process.env.api.baseURL}/forgotPassword`, {
        params: {
          email
        }
      })
      .then((res) => {
        this.$toast.success('Reset link has been sent to your account').goAway(3000);
        this.email = null;
      })
      .catch((err) => {
        this.setErrors(err.response.data.errors);
      });;
    }

  }

}

</script>


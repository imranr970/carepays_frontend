<template>


  <div class="popup" id="email-change">
      <!-- popup__content--center -->
      <div class="popup__content">

        <a href="#" class="popup__close" @click.prevent="$emit('close')">&times;</a>

        <h4 class="heading-4 px-sm py-xs">
          Change Your Email
        </h4>
        <hr>

        <form class="form px-sm py-xs" @keydown="removeError($event.target.name)">

          <p class="paragraph error-message">
            For your security if you change email your payment methods will be deleted.
          </p>

          <div class="form__group my-xs">

            <label :class="{'text-danger':errors.email}" for="email-change" class="form__label">Email</label>
            <input :class="{'has-error':errors.email}" id="email-change" class="form__input-control" type="email" name="email" v-model="email_change">

            <span class="error-message" v-if="errors.email">
              {{errors.email[0]}}
            </span>

          </div>

          <div class="form__group my-xs">

            <label :class="{'text-danger':errors.password}" for="password_for_email_change" class="form__label">Password</label>
            <input :class="{'has-error':errors.password}" id="password_for_email_change" class="form__input-control" type="password" name="password" v-model="password_for_email_change" placeholder="Enter your password">

            <span class="error-message" v-if="errors.password">
              {{errors.password[0]}}
            </span>

          </div>

        </form>

        <hr>
        <div class="popup__content--footer px-sm py-xs float--right">
          <button :disabled="!changed" @click.prevent="submit" type="submit" class="btn btn--secondary btn--sm popup__close">
            Confirm
            <span class="" v-if="loading">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
          </button>
        </div>
        <span class="clearfix"></span>

      </div><!--popup__content-->


  </div><!--popup-->


</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import { validate } from '@/plugins/validationForm/profile/validateEmail.js';

export default {

  name:'email-change-modal',

  data() {
    return {
      loading                   : false,
      email_change              : null,
      password_for_email_change : null
    };
  },

  computed: {
    ...mapGetters({

    }),

    changed() {
      if(this.email_change == this.user.email) {
        return false;
      }
      return true;
    }

  },

  methods: {

    ...mapActions({
      removeError        : 'validation/removeError',
      setErrors          : 'validation/setErrors',
      changeProfileEmail : 'auth/changeProfileEmail'
    }),

    submit() {

      if(!this.changed) {
        return false;
      }
      this.loading = true;
      if(!validate(this.$store, this.getData())) {

        this.$toast.error('Please fix errors below').goAway(5000);

        window.scrollTo({
          top:20,
          behavior:'smooth'
        });

      }

      if(!Object.entries(this.errors).length > 0) {

        this.changeProfileEmail(this.getData())
        .then((data) => {
          this.$toast.success(data).goAway(5000);
          this.password_for_email_change = null;
          this.loading = false;
        })
        .catch(() => {
          window.scrollTo({
            top:20,
            behavior:'smooth'
          });
          this.loading = false;
        });

      }

    },

    getData() {
      return {
        email    : this.email_change,
        password : this.password_for_email_change
      };
    }

  },

  created() {
    this.email_change = this.user.email;
  }

}
</script>


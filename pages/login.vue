<template>

  <main class="login">

    <div class="card">
        <div class="card__body">

          <div class="login__left">

            <h4 class="heading-4">Login</h4>

            <form action="#" class="form my-sm" @submit.prevent="submit" @keydown="removeError($event.target.name)">

                <div class="form__group">

                    <label for="email" class="form__label">Email</label>

                    <input :class="{'has-error':errors.email}" type="email" class="form__input-control form__input-control--grey" id="email" name="email" placeholder="Enter your username" v-model="form.email">

                    <span class="error-message" v-if="errors.email">
                      {{errors.email[0]}}
                    </span>

                    <nuxt-link to="/account?action=resendActivationLink" class="link text--sm" v-if="errors.email">Resend me actication link</nuxt-link>

                </div>

                <div class="form__group">
                    <label for="password" class="form__label">Password</label>
                    <input :class="{'has-error':errors.password}" type="text" class="form__input-control form__input-control--grey" id="password" name="password" placeholder="Enter your Password" v-model="form.password">
                    <span class="error-message" v-if="errors.password">
                      {{errors.password[0]}}
                    </span>
                </div>

                <div class="buttons mt-sm">

                    <div>
                        <button class="btn btn--secondary">
                            Login
                        </button>
                    </div>

                    <nuxt-link to="account?action=password-reset" class="link">
                        Forgot password?
                    </nuxt-link>

                </div>

            </form>

          </div><!--login-left-->

          <div class="login__middle">

          </div>

          <div class="login__right">

              <figure class="login__img">
                <img src="@/assets/images/save-tax-icon.png" alt="Save tax">
              </figure>

              <h3 class="heading-3 mb-xs">
                  <strong>Become a Carepays Member</strong>
              </h3>

              <p class="paragraph mb-sm mt-xs">
                  Save 10% on your
                  next treatment when you become a CarePays member.
              </p>

              <div class="my-sm">
                  <nuxt-link :to="{name:'register'}" class="btn btn--primary">Join Us</nuxt-link>
              </div>

          </div><!--login-right-->

        </div>
    </div>

  </main>

</template>

<script>

import axios from 'axios';
import { mapActions } from 'vuex';

export default {

  name:'login',
  middleware:'guest',

  head() {
    return {
      title: `Login`
    };
  },

  data() {

   return {

      form: {
        email: '',
        password:''
      },

      route:this.$route.query

    };

  },//data

  methods: {

    ...mapActions({
      removeError  : 'validation/removeError',
      getCartCount : 'cart/getCartCount'
    }),

    async submit() {

      let myToast = this.$toast.success('Authenticating...');
      try {

        await this.$auth.login({
          data: this.form
        })
        .then((res) => {

          myToast.text('Loggedin successfully').goAway(2000);
          this.getCartCount();
          if(this.routeIsDefined()) {
            this.$router.push({path:this.route.redirect});
            return;
          }
          this.$router.push({name:'index'});


        })
        .catch((e) => {
          //console.log(e);
          myToast.goAway(2000);
          this.$toast.error('Login Failed').goAway(2000);
        });

      }

      catch(e) {
        console.log(e);
      }

    },

    routeIsDefined() {
      if(this.$route.query) {
        if(this.$route.query.hasOwnProperty('redirect') && this.$route.query.redirect != null) {
          return true;
        }
      }
      return false;
    }

  }//methods

}
</script>

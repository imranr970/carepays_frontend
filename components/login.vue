<template>
  <main class="login w-100 my-sm">
    <div class="login__left">

      <form action="#" class="form my-sm" @keydown="removeError($event.target.name)">

        <div class="form__group">

            <label for="email" class="form__label">Email</label>

            <input :class="{'has-error':errors.email}" type="email" class="form__input-control form__input-control--xs form__input-control--grey" id="email" name="email" placeholder="Enter your username" v-model="form.email">

            <span class="error-message" v-if="errors.email">
              {{errors.email[0]}}
            </span>

            <nuxt-link to="/account?action=resendActivationLink" class="link text--sm" v-if="errors.email">Resend me actication link</nuxt-link>

        </div>

        <div class="form__group mt-xs">
            <label for="password" class="form__label">Password</label>
            <input :class="{'has-error':errors.password}" type="text" class="form__input-control form__input-control--xs form__input-control--grey" id="password" name="password" placeholder="Enter your Password" v-model="form.password">
            <span class="error-message" v-if="errors.password">
              {{errors.password[0]}}
            </span>
        </div>

        <a href="#" class="link">
          Forgot password?
        </a>

      </form>

      <div class="py-xs border-top mt-sm">
        <button class="btn btn--secondary btn--sm popup__close" @click.prevent="submit">
          Login
        </button>

        <a href="#" class="btn btn--default btn--sm" @click="close('login')">
          Cancel
        </a>
      </div>

    </div><!--login-left-->

  </main>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {

  data() {
    return {
      form: {
        email:'',
        password:''
      }
    };
  },

  methods: {

    ...mapActions({
      removeError     : 'validation/removeError',
      setLoginDetails : 'auth/setLoginDetails'
    }),

    async submit() {

      let myToast = this.$toast.success('Authenticating...').goAway(1000);
      try {

        await this.$auth.login({
          data:this.form
        })
        .then(({data}) => {
          this.$toast.success('Successfully authenticated').goAway(2000);
          // this.setLoginDetails(data);
          this.$router.push({
              name:'/shopping_window', params:{
              _code:this.$route.$query.params
          }});
        })
        .catch((e) => {
          this.$toast.error('Login Failed').goAway(2000);
        });

      }

      catch(e) {
        console.log("e");
      }

    },

    close(id) {
      this.$emit('close', id);
    }

  }//methods


}
</script>



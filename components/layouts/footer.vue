<template>
     <footer class="footer">

      <div class="footer__subscription text--center">

        <h3 class="heading-3 text--white">Newsletter</h3>

        <p class="paragraph">
          Signup to get the latest new releases and more
        </p>

        <form action="#" class="form mt-sm" @submit.prevent="subscribe" @keydown="removeError($event.target.name)">

          <div class="form__group">
            <input :class="{'has-error':errors.email_subs}" v-model="email_subs" name="email_subs" type="text" class="form__input-control" placeholder="Enter Email Address" required>
          </div>

          <div class="form__group">
            <button type="submit" class="btn btn--secondary py-xs mt-xs">
              Subscribe
            </button>
          </div>

        </form>

      </div>

      <nav class="footer__menu">
        <ul class="footer__list">

          <li class="footer__item">
              <a href="#" class="footer__link">Carepays for patients</a>
          </li>

          <li class="footer__item">
              <a href="#" class="footer__link">Carepays for providers</a>
          </li>

              <li class="footer__item">
                  <a href="#" class="footer__link">Carepays for employers</a>
          </li>

          <li class="footer__item">
              <a href="#" class="footer__link">About carepays</a>
          </li>

          <li class="footer__item">
              <a href="#" class="footer__link">Contact us</a>
          </li>

          <li class="footer__item">
              <a href="#" class="footer__link">Terms and conditions</a>
          </li>

        </ul>
      </nav>


      <div class="footer__menu-lower">
          <div class="footer__social">
            <i class="fab fa-facebook-square footer__social-icons"></i>
            <i class="fab fa-twitter-square footer__social-icons"></i>
            <i class="fab fa-instagram footer__social-icons"></i>
          </div>

          <div class="footer__contact">
            Call us: 1-844-447-4283
          </div>

          <div class="footer__copyrights">
            &copy; CarePays. All Rights Reserved
          </div>
      </div>

    </footer>

</template>

<script>
import {mapActions} from 'vuex';
export default {

  name:'site-footer',

  data() {
    return {
      email_subs:null
    };
  },

  methods: {
    ...mapActions({
      setErrors        : 'validation/setErrors',
      clearErrors      : 'validation/clearErrors',
      removeError      : 'validation/removeError',
    }),

    subscribe() {

      if(this.email_subs == null || this.email_subs == '') {
        this.setErrors([{key : 'email_subs' , value : 'Please enter email'}]);
        return false;
      }

      this.$axios.get(`${process.env.api.baseURL}/subscribe`, {
        params: {
          email : this.email_subs
        }
      })
      .then((res) => {
        this.$toast.success('Success! You will now receive notifications').goAway(3000);
        this.email_subs = null;
      })
      .catch((err) => {
        this.$toast.error('Something went wrong').goAway(2000);
      });

    }

  }

}
</script>


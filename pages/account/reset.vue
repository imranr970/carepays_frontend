<template>

  <div class="register">

    <div class="card">
      <div class="card-body">
        <h4 class="heading-4">Reset password</h4>

        <form class="form mt-sm">

          <div class="form__group">
            <label for="" class="form__label">New password</label>
            <input type="text" class="form__input-control" v-model="password" placeholder="Enter new password">
          </div>

          <div class="form__group">
            <label for="" class="form__label">Confirm password</label>
            <input type="text" class="form__input-control" v-model="confirm_password" placeholder="Enter new password again">
          </div>

          <div class="form__group mt-xs">
            <button class="btn btn--secondary btn--sm" @click.prevent="sendResetRequest">Reset</button>
          </div>

        </form>

      </div>
    </div>

  </div><!--register-->

</template>

<script>

import axios from 'axios'

export default {

  name:'account-reset',
  middleware:'guest',

  data() {
    return {
      password:null,
      confirm_password:null
    }
  },

  methods: {

    sendResetRequest() {

      axios.get(`${process.env.api.baseURL}/resetPassword`, {
        params: {
          password:this.password,
          confirm_password:this.confirm_password,
          email:this.$route.query.email,
          token:this.$route.query.token
        }
      })
      .then((res) => {
        this.password = null;
        this.confirm_password = null;
        this.$router.push({name:'login'});
        this.$toast.success('Password reset! you can now log in').goAway(2000);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    //reset request

    //check if token exists
    tokenExists() {
      let token
      if(token !== null || token !== '') {
        token = this.$route.query.token.trim();
        axios.get(`${process.env.api.baseURL}/checkIfResetTokenExists`, {
          params: {
            token
          }
        })
        .then(({data}) => {
          if(data === 401) {
            this.$router.push({name:'login'});
          }
        })
        .catch((err) => {
          this.$toast.error("Something went wrong").goAway("2000");
          this.$router.push({name:'login'});
        });

      }

    }
  },//methods

  created() {
    this.tokenExists();
  }

}
</script>


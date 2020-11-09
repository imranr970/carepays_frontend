<template>

</template>

<script>

import axios from 'axios'

export default {

  name:'activate',
  layout:'no-layout',

  methods: {

    activate() {

      axios.get(`${process.env.api.baseURL}/auth/activate`, {
        params: {
          token:this.$route.query.token,
          email:this.$route.query.email
        }
      })
      .then((res) => {
        this.$router.push('/login');
        this.$toast.success('Account activated! you can now log in').goAway(2000);
      })
      .catch((err) => {
        this.$router.push('/login');
        this.$toast.error('Something went wrong').goAway(2000);
      });

      //force redirecting
      this.$router.push('/login');
    }
  },

  created() {
    this.activate();
  }

}
</script>


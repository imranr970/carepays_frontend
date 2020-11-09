<template>

  <main class="user-profile">

    <profileSidebar />

    <div class="main">

      <h4 class="heading-4 mb-sm">Enter/Change payment details</h4>

     <paymentMethods
        :paymentMethods="paymentMethods"
        v-model="form.payment_method_id"
      />

    </div>

  </main>

</template>

<script>

import profileSidebar from '@/components/layouts/profile-sidebar'
import paymentMethods from '@/components/checkout/paymentMethods/paymentMethods'

export default {
  middleware:'auth',
  components: {
    profileSidebar,
    paymentMethods
  },

  data() {
    return {

      paymentMethods:[],
      form: {
        payment_method_id:''
      }

    };
  },

  async asyncData({app}) {

    let response = await app.$axios.get('payment-methods');

    return {
      paymentMethods: response.data.data
    }

  }

}
</script>

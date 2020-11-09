<template>

  <main class="eobs">

    <h4 class="heading-4"> Patient Explanation of Benefits(EOB) </h4>

    <div class="card my-sm" id="data">

      <div class="card__body">

        <template v-if="loading">
          <i class="fas fa-spinner fa-spin"></i>
        </template>

        <template v-else>

          <span class="clearfix"></span>

          <table class="table my-sm" v-for="claim in claims" :key="claim.id">

            <thead>

              <tr>
                <td colspan="3">
                  Claim #{{claim.claim_id}}
                  <nuxt-link :to="{ path:`/profile/eob/${claim.id}` }">view</nuxt-link>
                </td>
                <td colspan="4" class="border">Your Plan Payments and Discounts</td>
                <td colspan="5" class="border">Your Responsibility</td>
                <td>Claim notes</td>
              </tr>

              <tr>
                <td>Service</td>
                <td>Date(s) of service</td>
                <td>Amount Billed</td>
                  <!-- Plan payments and Discounts -->
                <td>Premiere Network Discount</td>
                <td>Amount paid by your Health Plan</td>
                <td>Amount from another resource</td>
                <td>Total Plan Discounts & Payments</td>

                <!-- Your responsibility -->

                <td>Copay</td>
                <td>Deductible</td>
                <td>CoInsurance</td>
                <td>Amount not covered</td>
                <td>Your total responsibility</td>

                <!-- Claim notes -->
                <td></td>

              </tr>


            </thead>

            <tbody>

              <tr v-for="checkout in claim.order.checkout" :key="checkout.id">

                <td>{{checkout.category}}</td>
                <td>{{$moment(claim.date_of_service).format('ll')}}</td>
                <td>${{claim.total_claim_charge_amount}}</td>

                <td>$0</td>
                <td>$0</td>
                <td>$0</td>
                <td>$0</td>

                <td>$0</td>
                <td>$0</td>
                <td>$0</td>
                <td>$0</td>
                <td>$0</td>

                <td class="text--bold">
                  {{claim.claim_status}}
                </td>

              </tr>

            </tbody>

          </table>

        </template>

      </div>

    </div>

  </main>

</template>

<script>
export default {
  name:'eob',
  middleware:'auth',

  data() {

    return {
      claims:[],
      loading:false
    }

  },


  methods: {

    async fetchEOBS() {
      this.loading = true;
      await this.$axios.post('auth/eobs/all')

      .then(({data}) => {
        this.claims = data.data
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
      });

      this.loading = false;

    }

  },

  created() {
    this.fetchEOBS();
  }

}
</script>


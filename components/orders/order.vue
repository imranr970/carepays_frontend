<template>

  <main>
    <button class="mb-sm mt-xs btn btn--secondary less-shadow">All orders</button>
    <div class="card">
      <div class="card__body">

        <template v-if="loading">
          <i class="fas fa-spinner fa-spin"></i>
        </template>

        <template v-else>

          <div class="float-left">
            <h4 class="heading-4 d--block">Order #{{order.order_id}}</h4>
            <div class="badge badge-success" v-if="order.order_status=='complete'">Complete</div>
            <div class="badge badge-danger" v-if="order.order_status=='payment_failed'">Payment Failed</div>
            <div class="badge badge-info" v-if="order.order_status=='processing'">Processing</div>
          </div>

          <div class="float-right">
            <h4 class="heading-4">${{order.total}}</h4>

            <span class="icon-image" v-if="payment">
              <cardImage :image="payment.card_type" style="width:5rem;height:3rem;" />
            </span>

          </div>

          <div class="clearfix"></div>

          <hr class="my-sm">

          <h4 class="heading-4 mb-xs">Insurance Details</h4>

          <div v-if="insurance">

            <span class="insurance-details">

              Insurance Provider:
              <span class="text--dark mr-xs">{{insurance.company_name}}</span>

              Type:
              <span class="text--dark mr-xs">{{insurance.insurance_type}}</span>

              <span class="badge badge-primary" v-if="insurance.insurance_package == 'primary'">
                Primary
              </span>
              <span class="badge badge-secondary" v-if="insurance.insurance_package == 'secondary'">
                Secondary
              </span>
              <span class="badge badge-warning" v-if="insurance.insurance_package == 'tertiary'">
                Tertiary
              </span>

            </span>

          </div>

          <div v-else>
            <p>You do not have any insurance for this order.</p>
          </div>


          <hr class="my-sm">

          <h4 class="heading-4">Item Details</h4>

          <table class="table">
            <thead>
              <tr>
                <td>Type of service</td>
                <td>Item</td>
                <td>Description</td>
                <td>Quantity</td>
                <td>Avg cost</td>
                <td>Saved cost</td>
                <td>Booking date</td>
                <td>Appointment</td>
              </tr>
            </thead>

            <tbody v-if="checkouts">

              <tr v-for="checkout in checkouts" :key="checkout.id">

                <td>{{checkout.category}}</td>
                <td>{{checkout.cpt}}</td>
                <td>{{checkout.treatment_description.substr(0, 30) + '...'}}</td>
                <td>1</td>
                <td>${{checkout.average_cost}}</td>
                <td>${{checkout.saved_cost}}</td>
                <td>{{$moment(checkout.date_of_booking).format('LL')}}</td>
                <td>
                  <nuxt-link to='/profile/appointments'>view</nuxt-link>
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

import cardImage from '@/components/checkout/paymentMethods/cardImage'

export default {

  components: {
    cardImage
  },

  data() {
    return {
      order:{},
      loading:false
    };
  },

  computed: {

    payment() {
      return this.order ? this.order.payment_method : {};
    },

    checkouts() {
      return this.order ? this.order.checkout : {};
    },

    insurance() {
      return this.order ? this.order.insurance : {};
    }

  },

  methods: {

    async fetchOrder() {
      let id = this.$route.params.id;
      if(!id) {
        this.$router.push('/profile/orders');
      }
      this.loading = true;
      await this.$axios.post(`orders/${id}`)
            .then(({data}) => {
              if(!Object.entries(data.data).length) this.$router.push('/profile/orders');
              this.order = data.data;
              this.loading = false;
            })
            .catch(() => {
              this.$router.push('/profile/orders');
              this.loading = false;
            });
    }

  },

  created() {
    this.fetchOrder();
  }

}
</script>





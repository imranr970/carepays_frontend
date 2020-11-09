<template>

  <main class="eobs">

    <h4 class="heading-4">Patient Eobs table</h4>

    <div class="card my-sm" id="data">
      <div class="card__body">

        <button @click.prevent="print" class="btn btn--default less-shadow btn--xs float--right">
          <i class="fas fa-print"></i> Print
        </button>
        <span class="clearfix"></span>

        <table class="table my-sm">

          <thead>
            <tr>
              <td>Date(s) of service</td>
              <td>Service Description</td>
              <td>Charge Amount</td>
              <td>Negotiated Adjustment</td>
              <td>Ineligible Amount</td>
              <td>Message code</td>
              <td>Deductible Amount</td>
              <td>Co-pay Amount</td>
              <td>Co-Insurance Amount</td>
              <td>Paid</td>
              <td>Plan Payment</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{{$moment(claim.date_of_service).format('ll')}}</td>
              <td>Office visit</td>
              <td>$90</td>
              <td>$1.80</td>
              <td>$1.80</td>
              <td></td>
              <td>$0.0</td>
              <td>$20.00</td>
              <td>$0.00</td>
              <td></td>
              <td>$38.00</td>
            </tr>
          </tbody>

        </table>

        <h5 class="heading-5">Claim Summary</h5>

        <table class="table my-sm">

          <thead>
            <tr>
              <td>Document#</td>
              <td>Patient Name</td>
              <td>Charge Amount</td>
              <td>Negotiated Adjustment</td>
              <td>Ineligible Amount</td>
              <td>Deductible Amount</td>
              <td>Co-pay Amount</td>
              <td>Co-insurance Amount</td>
              <td>Adjustments Amount</td>
              <td>Net Payment</td>
              <td>Total patient responsibility</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{{claim.claim_id}}</td>
              <td>{{user.first_name + " " + user.last_name}}</td>
              <td>${{claim.total_claim_charge_amount}}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>${{claim.total_claim_charge_amount}}</td>
              <td>${{claim.total_claim_charge_amount}}</td>
            </tr>
          </tbody>

        </table>

        <div class="float--right" v-if="claim.order">

          <h5 class="heading-5">Payment Details</h5>
          <table class="my-sm">

            <thead>
              <tr>
                <td>Payment Method</td>
                <td>Invoice id</td>
                <td>Amount</td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{{claim.order.payment_method.card_type}}</td>
                <td>{{claim.order.order_id}}</td>
                <td>${{claim.total_claim_charge_amount}}</td>
              </tr>
            </tbody>

          </table>

        </div>

        <span class="clearfix"></span>

      </div>
    </div>


  </main>

</template>

<script>
export default {

  name:'eob-details',
  middleware:'auth',

  data() {

    return {
      claim:[]
    }

  },


  methods: {

    print() {
    },

    async fetchEOB() {

      await this.$axios.post(`auth/eob/${this.$route.params.id}`)

      .then(({data}) => {

        this.claim = data

      })
      .catch((err) => {
        console.log(err);
      });

    }
  },

  created() {
    this.fetchEOB();
  }

}
</script>

<style scoped>
table {
  border: 2px solid #999;
}
</style>


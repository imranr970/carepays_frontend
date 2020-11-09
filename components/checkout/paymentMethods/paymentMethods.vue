<template>

  <main class="payment-methods">

    <div class="card">
      <div class="card__body">

        <template v-if="creating">
          <paymentMethodCreator
          @cancel="creating=false"
          @added="created" />
        </template>

        <template v-else-if="selecting">
          <paymentMethodSelector
            :payment-methods="paymentMethods"
            :selected-payment-method="selectedPaymentMethod"
            @click="paymentMethodSelected"
          />
        </template>

        <template v-else>

          <template v-if="selectedPaymentMethod">
            <div class="selectedPayment text--dark">

              <span class="icon-image">
                <cardImage :image="selectedPaymentMethod.card_type"/>
              </span>

              <span class="card-info">
                {{selectedPaymentMethod.card_type}}
                ending
                {{selectedPaymentMethod.last_four}}
              </span>

              <span class="icon-tick">
                <i class="fas fa-check-circle fa-fw text--green text--lg"></i>
              </span>

            </div>
          </template>

          <button class="btn btn--secondary btn--sm my-xs" @click.prevent="selecting = true" v-if="paymentMethods.length">Change source</button>

          <button class="btn btn--secondary btn--sm my-xs" @click.prevent="creating = true">Add payment source</button>

        </template>


      </div>
    </div>

  </main>

</template>

<script>
import paymentMethodSelector from './paymentMethodSelector'
import paymentMethodCreator from './paymentMethodCreator';
import cardImage from './cardImage';

export default {

  props: {
    paymentMethods: {
      type     : Array,
      required : true
    }
  },

  data() {
    return {
      selecting:false,
      creating:false,
      selectedPaymentMethod:null,
      localPaymentMethods : this.paymentMethods
    }
  },

  watch: {
    selectedPaymentMethod (paymentMethod) {
      this.$emit('input', paymentMethod.id)
    }
  },

  components: {
    paymentMethodSelector,
    paymentMethodCreator,
    cardImage
  },

  computed: {
    defaultPaymentMethod() {
      return this.localPaymentMethods.find(a => a.default == true || a.default == 1)
    },
    cardImage() {
      let icons = {
        mastercard      : 'master-card',
        paypal          : 'paypal',
        americanExpress : 'american-express',
        visa            : 'visa',
        westernUnion    : 'western-union'
      };
      let type = this.selectedPaymentMethod.card_type;
      if(type) {
        type = type.toLowerCase();
        return `assets/images/cards/${icons[type]}.png`;
      }
      return null;
    }
  },

  methods: {

    paymentMethodSelected(paymentMethod) {
      this.switchPaymentMethod(paymentMethod),
      this.selecting = false;
    },

    switchPaymentMethod(paymentMethod) {
      this.selectedPaymentMethod = paymentMethod;
    },

    created(paymentMethod) {

      this.localPaymentMethods.push(paymentMethod);
      this.creating = false;

      this.switchPaymentMethod(paymentMethod);

    }

  },

  created() {

    if(this.paymentMethods.length) {
      this.switchPaymentMethod(this.defaultPaymentMethod)
    }

  }



}
</script>

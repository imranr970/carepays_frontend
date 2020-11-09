<template>

  <main class="">
    <template v-if="paymentMethods.length">
      <div v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" class="payment-methods-selection my-sm">
        <div class="card-image">
          <cardImage :image="paymentMethod.card_type" />
        </div>
        <div class="card-info" :class="{'text--dark':paymentMethod.id == selectedPaymentMethod.id}">
          {{paymentMethod.card_type}}
          ending
          {{paymentMethod.last_four}}
        </div>
        <div class="card-button">
          <button class="btn btn--secondary btn--sm" @click.prevent="$emit('click', paymentMethod)">
            Choose
          </button>
        </div>
      </div>
    </template>
  </main>

</template>

<script>
import cardImage from './cardImage'
export default {

  components: {
    cardImage
  },

  props: {
    paymentMethods : {
      required : true,
      type : Array
    },
    selectedPaymentMethod : {
      required : true,
      type : Object
    }
  }
}
</script>

<template>
  <main class="payment-method-creator">
    <form class="form" @submit.prevent="store">
      <div class="form__group" id="stripe-card-element">
      </div>
      <div class="form__group mt-sm">
        <button type="submit" class="btn btn--secondary btn--sm" :disabled="storing">
          Store card
        </button>
        <button class="btn btn--default btn--sm" @click.prevent="$emit('cancel')">
          Cancel
        </button>
      </div>
    </form>
  </main>
</template>

<script>
export default {

  data() {
    return {
      stripe:null,
      card:null,
      storing:false
    }
  },

  mounted() {
    const stripe = Stripe('pk_test_LRY7REXdie473on2anb3kOcx00X06ecHlg');
    this.stripe = stripe;
    this.card = this.stripe.elements().create('card', {
      style: {
        base: {
          fontSize:'16px'
        }
      }
    });
    this.card.mount('#stripe-card-element');
  },

  methods: {

    async store() {
      this.storing = true;
      const { token, error } = await this.stripe.createToken(this.card);

      if(error) {
        this.$toast.error('Something went wrong! Please try again').goAway(3000);
      }
      else {
        let response = await this.$axios.post('payment-methods', {
          token : token.id
        })
        this.$emit('added', response.data.data)

      }
      this.storing = false;

    }

  }

}
</script>

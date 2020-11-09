<template>


  <div class="popup" id="cart-pricing">
      <!-- popup__content--center -->
      <div class="popup__content popup__content--large">

        <a href="#" class="popup__close" @click.prevent="$emit('close')">&times;</a>

        <h5 class="heading-4 px-sm py-xs">
          Pricing
        </h5>
        <hr>

        <div class="flex px-sm py-xs">

          <div class="flex-1">

            <div class="card">

              <div class="card-header">
                <h5 class="heading-5">Ambultaroy</h5>
              </div>

              <div class="card__body">

                <ul class="list-unstyled">
                  <li class="">Facility Charges</li>
                  <li class="">Non Facility Charges</li>
                  <li class="">Facility Charges</li>
                  <li class="">Facility Charges</li>
                  <li class="">Facility Charges</li>
                </ul>

              </div>

            </div>

          </div>

          <div class="flex-1">

            <div class="card">

              <div class="card__body">
                Shouldice
              </div>

            </div>

          </div>

          <div class="flex-1">
            <div class="card">

              <div class="card__body">
                Hospital
              </div>

            </div>
          </div>
        </div>

        <hr>
        <div class="popup__content--footer px-sm py-xs float--right">
          <button  type="submit" class="btn btn--secondary btn--sm popup__close">
            Close
            <span class="" v-if="loading">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
          </button>
        </div>
        <span class="clearfix"></span>

      </div><!--popup__content-->


  </div><!--popup-->


</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {

  name:'pricing',

  data() {
    return {
      loading : false
    };
  },

  computed: {
    ...mapGetters({

    }),

  },

  methods: {

    ...mapActions({
      removeError : 'validation/removeError',
      setErrors   : 'validation/setErrors'
    }),

  },

  created() {

  }

}
</script>


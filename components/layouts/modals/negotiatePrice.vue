<template>

  <div class="popup" id="popup" v-if="treatment">

    <div class="popup__content">

      <a href="#" class="popup__close" @click.prevent="closeModal('popup')">&times;</a>

        <div class="d-flex justify-content-between">

          <div>
            <img src="@/assets/images/treatment-logo.jpg" class="card__img pl-sm d-inline">
            <h5 class="heading-5 py-xs pt-sm px-sm d-inline">
              Negotiate Form
            </h5>
          </div>

        </div>

        <span class="clearfix"></span>

        <hr>

        <div class="px-sm mt-sm">

          <form class="form" @keydown="removeError($event.target.name)">

            <table v-if="treatment">

              <tr>
                <td>Treatment</td>
                <td>Avg cost</td>
                <td>Counter offer</td>
              </tr>

              <tr>
                <td>
                  <input type="text" class="form__input-control form__input-control--xs" disabled :value="treatment_description">
                </td>
                <td>
                  <input type="text" class="form__input-control form__input-control--xs" disabled :value="`$${treatment.average_cost}`">
                </td>
                <td>
                  <input type="text" name="counter_offer" class="form__input-control form__input-control--xs" :class="{'has-error':errors.counter_offer}" v-model="counter_offer">
                  <div class="error-message text--sm" v-if="errors.counter_offer">
                    {{errors.counter_offer[0]}}
                  </div>
                </td>
              </tr>

            </table>

          </form>

        </div>


        <div class="popup__content--footer px-sm py-xs border-top mt-sm">

          <div class="float--right">
            <button class="btn btn--secondary btn--sm popup__close" @click.prevent="emailUser">
              Submit
            </button>

            <a href="#" class="btn btn--default btn--sm" @click.prevent="closeModal('popup')">Cancel</a>
          </div>
          <span class="clearfix"></span>

        </div>

      </div>

  </div><!--popup-->

</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {

  name:'negotiatePrice',

  props: {

    treatment: {
      required:true,
      type:Object
    },

    treatment_description: {
      required:true,
      type:String
    }

  },

  data() {
    return {
      counter_offer:null
    };
  },

  watch: {
    counter_offer() {
      this.$emit('input', this.counter_offer);
    }
  },

  methods: {

    ...mapActions({
      removeError : 'validation/removeError'
    }),

    emailUser() {
      this.$emit('email');
    },

    closeModal(id) {
      this.$emit('close', id)
    }

  },

  created() {
    this.counter_offer = null;
  }

}
</script>

<template>

  <main class="checkout">

    <h4 class="heading-4 my-sm">Checkout</h4>

    <div class="checkout--inner">

      <form class="form" @change="removeError($event.target.name)" @keydown="removeError($event.target.name)">

        <div class="card">
          <div class="card__body">

            <h4 class="heading-4 mb-sm">Your Information</h4>

            <div class="flex mb-xs">

              <div class="form__group flex-1">

                <label :class="{'text-danger':errors.first_name}" for="first_name" class="form__label">First Name*</label>
                <input :class="{'has-error':errors.first_name}" name="first_name" id="first_name" type="text" class="form__input-control" placeholder="Enter your first name" v-model="first_name">

                <span class="error-message" v-if="errors.first_name">
                  {{errors.first_name[0]}}
                </span>

              </div>

              <div class="form__group flex-1">

                <label :class="{'text-danger':errors.last_name}" for="last_name" class="form__label">Last Name*</label>
                <input :class="{'has-error':errors.last_name}" name="last_name" id="last_name" type="text" class="form__input-control" placeholder="Enter your last name" v-model="last_name">

                <span class="error-message" v-if="errors.last_name">
                  {{errors.last_name[0]}}
                </span>

              </div>

            </div>

              <div class="form__group mb-xs">

                <label :class="{'text-danger':errors.email}" for="email" class="form__label">Email*</label>
                <input :class="{'has-error':errors.email}" name="email" id="email" type="email" class="form__input-control" placeholder="Enter your email" v-model="email">

                <span class="error-message" v-if="errors.email">
                  {{errors.email[0]}}
                </span>

              </div>

              <div class="form__group mb-xs">

                <label :class="{'text-danger':errors.phone}" for="phone_no" class="form__label">Phone no*</label>
                <input :class="{'has-error':errors.phone}" name="phone" id="phone_no" type="text" class="form__input-control" placeholder="Enter your phone number" v-model="phone">

                <span class="error-message" v-if="errors.phone">
                  {{errors.phone[0]}}
                </span>

              </div>


              <div class="form__group mb-xs">

                <label :class="{'text-danger':errors.address}" for="street_address1" class="form__label">Street Address 1*</label>

                <textarea :class="{'has-error':errors.address}" id="street_address1" class="form__input-control" placeholder="Enter your street address 1" v-model="address"></textarea>

                <span class="error-message" v-if="errors.address">
                  {{errors.address[0]}}
                </span>

              </div>

              <div class="form__group mb-xs">

                <label :class="{'text-danger':errors.address2}" for="street_address2" class="form__label">Street Address 2</label>

                <textarea :class="{'has-error':errors.address2}" id="street_address2" class="form__input-control" placeholder="Enter your street address 2" v-model="address2"></textarea>

                <span class="error-message" v-if="errors.address2">
                  {{errors.address2[0]}}
                </span>

              </div>


              <div class="flex mb-xs">

                <div class="form__group flex-1">

                  <label :class="{'text-danger':errors.state}" for="state" class="form__label">State*</label>

                  <select :class="{'has-error':errors.state}" name="state" id="state" class="form__input-control"  v-model="state" @change="getCities({namespace:'auth', change:0})">
                    <option value="null">Please select</option>
                    <option :value="state.id" v-for="state in states" :key="state.id">
                      {{state.state}}
                    </option>
                  </select>

                  <span class="error-message" v-if="errors.state">
                    {{errors.state[0]}}
                  </span>


                </div>

                <div class="form__group flex-1">

                  <label :class="{'text-danger':errors.city}" for="city" class="form__label">City*</label>

                  <select :class="{'has-error':errors.city}" name="city" id="city" class="form__input-control" v-model="city">

                    <option value="null">Please select</option>
                    <template v-if="cities.length">
                      <option :value="city.id" v-for="city in cities" :key="city.id">
                        {{city.city}}
                      </option>
                    </template>

                  </select>

                  <span class="error-message" v-if="errors.city">
                    {{errors.city[0]}}
                  </span>

                </div>

              </div>

          </div><!--card-body-->
        </div><!--card-->

        <paymentMethods
          :paymentMethods="paymentMethods"
          v-model="form.payment_method_id"
        />

      </form>

      <div class="card">

        <div class="card__body">
          <h4 class="heading-4 mb-sm">Your order</h4>

          <table class="table">

            <thead>
              <tr>
                <td class="text--dark">Date of service</td>
                <td class="text--dark">Treatment</td>
                <td class="text--dark">Cost</td>
              </tr>
            </thead>

            <tbody v-for="item in items" :key="item.id">
              <tr>
                <td>{{$moment(item.date_of_service).format('ll')}}</td>
                <td>{{formattedDesc(item.treatment, 20)}}</td>
                <td>${{amountPayable(item)}}</td>
              </tr>
            </tbody>

            <tr>
              <td colspan="2">
                <span class="text--dark">
                  Totals
                </span>
              </td>
              <td>${{grandTotal}}</td>
            </tr>

          </table>

          <button type="button" class="my-sm btn btn--secondary" @click.prevent="openModal('insurance')">
            Verify My Coverage
          </button>

        </div>

      </div><!--card-->

    </div>

    <div class="button-group my-sm float--right">
      <button class="btn btn--secondary" @click.prevent="checkout" :disabled="processing">
        Checkout
        <span v-if="processing" class="fas fa-spinner fa-spin"></span>
      </button>
    </div>

    <span class="clearfix"></span>

    <insuranceModal @close="closeModal($event)" @selectInsurance="updateInsurance($event)" />


  </main><!--checkout-->

</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import paymentMethods from '@/components/checkout/paymentMethods/paymentMethods'
import insuranceModal from '@/components/layouts/modals/insuranceModal'
import {validate} from '@/plugins/validationForm/validateCheckout'

export default {

  name:'checkout',
  middleware:'auth',


  head() {
    return {
      title: `Checkout`
    };
  },


  data() {
    return {
      paymentMethods:[],
      form: {
        payment_method_id:'',
        insurance:null
      },
      processing:false
    }
  },

  components: {
    paymentMethods,
    insuranceModal
  },

  async asyncData({app}) {

    let response = await app.$axios.get('payment-methods');

    return {
      paymentMethods: response.data.data
    }

  },

  computed: {

    ...mapGetters({
      states             : 'states',
      cities             : 'cities',
      profile            : 'auth/profile',
      cartCount          : 'cart/count',
      items              : 'cart/items',
      auth_insurances    : 'insurance/auth_insurances',
      grandTotal         : 'cart/grandTotal',
      totalChargesOfItem : 'cart/totalChargesOfItem',
      amountPayable      : 'cart/amountPayable',
    }),

    state: {
      set(key) {
        this.editInfo({param:'state', value:key, section:'profile'});
      },
      get() {
        return this.profile.state;
      }
    },

    city: {
      set(key) {
        this.editInfo({param:'city', value:key, section:'profile'});
      },
      get() {
        return this.profile.city;
      }
    },

    first_name: {
      set(key) {
        this.editInfo({param:'first_name', value:key, section:'profile'});
      },
      get() {
        return this.profile.first_name;
      }
    },

    middle_name: {
      set(key) {
        this.editInfo({param:'middle_name', value:key, section:'profile'});
      },
      get() {
        return this.profile.middle_name;
      }
    },

    last_name: {
      set(key) {
        this.editInfo({param:'last_name', value:key, section:'profile'});
      },
      get() {
        return this.profile.last_name;
      }
    },

    email: {
      set(key) {
        this.editInfo({param:'email', value:key, section:'profile'});
      },
      get() {
        return this.profile.email;
      }
    },

    phone: {
      set(key) {
        this.editInfo({param:'phone', value:key, section:'profile'});
      },
      get() {
        return this.profile.phone;
      }
    },

    address: {
      set(key) {
        this.editInfo({param:'address', value:key, section:'profile'});
      },
      get() {
        return this.profile.address;
      }
    },

    address2: {
      set(key) {
        this.editInfo({param:'address2', value:key, section:'profile'});
      },
      get() {
        return this.profile.address2;
      }
    },

    zipcode: {
      set(key) {
        this.editInfo({param:'zipcode', value:key, section:'profile'});
      },
      get() {
        return this.profile.zipcode;
      }
    }

  },

  methods: {

    ...mapActions({
      getStates         : 'getStates',
      getCities         : 'getCities',
      editInfo          : 'auth/editInfo',
      autoFillAuthInfo  : 'autoFillAuthInfo',
      getCartCount      : 'cart/getCartCount',
      fetchCart         : 'cart/fetchCart',
      setCartCount      : 'cart/setCartCount',
      removeError       : 'validation/removeError'
    }),

    updateInsurance(id) {
      this.form.insurance = id;
    },

    showErrors() {
      this.$toast.error('Please fix errors below').goAway(2000);

      window.scrollTo({
        top:20,
        behavior:'smooth'
      });
    },

    async checkout() {

      if(!validate(this.$store, this.getCheckoutData())) {

        this.showErrors();

        return false;
      }

      this.processing = true;

      let data = this.getCheckoutData();
      await this.$axios.post('/auth/cart/checkout', {
        payment_method_id : this.form.payment_method_id,
        insurance : this.form.insurance,
        ...data
      })
      .then((res) => {
        this.$toast.success('Your order is placed.').goAway(2000);
        this.$router.push({name:'profile'});
        this.processing = false;
        this.setCartCount(0);
      })
      .catch((err) => {
        if(this.errors.payment_method_id) {
          this.$toast.error("Please select payment method");
        }
        else {
          this.showErrors();
        }
        this.processing = false;
      });

    },

    getCheckoutData() {
      return {
        first_name:this.first_name,
        last_name:this.last_name,
        email:this.email,
        state:this.state,
        city:this.city,
        address:this.address,
        address2:this.address2,
        phone:this.phone
      };
    },

    checkCart() {
      if(this.cartCount == 0) {
        this.$router.push({name:'cart'});
      }
    }

  },

   created() {
    this.autoFillAuthInfo({section:'profile', module:'auth'});
    this.getStates();
    this.getCities({namespace:'auth', change:1});
    this.getCartCount();
    this.checkCart();
    this.fetchCart();
  },



}
</script>

<style scoped lang="scss">
  .cvv {
    padding-top:1.2rem;
    padding-bottom:1rem;
  }


</style>

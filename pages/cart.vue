<template>
  <main class="cart">

    <h3 class="heading-3 mb-xs">Cart</h3>

    <div class="wrapper">

      <div class="card">

        <div class="card__body">

          <div v-if="loading">
            <i class="fas fa-spinner fa-spin"></i>
          </div>

          <div v-else>
            <template v-if="items.length">
              <table class="d--block table mt-sm" v-for="item in items" :key="item.id">
                <thead>
                  <th class="text--xs">
                    <a href="#" class="remove link" @click.prevent="removeCartItem(item)">
                      Remove
                    </a>
                  </th>
                  <th>DOS</th>
                  <th>Category</th>    
                  <th>Speciality</th>
                  <!-- <th>Location | (zip)</th> -->
                  <th>Treatment</th>
                  <th>Avg Cost</th>
                  <th>Saved Cost</th>
                  <th>Negotiated Cost</th>
                  <th>Amount payable<br> to Carepays</th>
                </thead>

                <tbody class="w--100">

                  <tr>
                    <td>
                      &nbsp;
                    </td>
                    <td>{{$moment(item.appointment_date).format('MMM DD, YYYY')}}</td>
                    <td>{{coSurgCategory(item)}} {{item.category}}</td>
                    <td>{{item.doctor.provider_type}}</td>
                    <!-- <td>{{item.doctor.location}}</td> -->
                    <td>
                      <read-more :item="item.treatment" length="30" />            
                    </td>
                    <td>${{item.average_cost}}</td>
                    <td>${{item.saved_cost}}</td>
                    <td>${{item.negotiated_cost || 0}}</td>
                    <td>${{amountPayable(item)}}</td>
                  </tr>

                  <tr>
                    <td colspan="1"></td>
                    <td colspan="8" class="text--center"><strong>Plan of Care</strong></td>
                  </tr>

                  <tr v-if="item.anesthesia_fee != 0">
                    <td><input type="checkbox" :checked="addedChargesList(item, 'anesthesia')" @change="updateCartCharges({checked: $event.target.checked, item_id: item.id, type: 'anesthesia'})"></td>
                    <td colspan="2"><strong>Additional charges</strong></td>
                    <td colspan="5" class="text--right">
                        Anasthesia Fee &nbsp;
                        <i class="fas fa-question-circle" 
                        :title="chargesTitle(item, 'anesthesia')">
                      </i>
                    </td>
                    <td>
                      ${{item.anesthesia_fee || 0}}
                    </td>
                  </tr>

                  <tr v-if="item.facility_expenses != 0">
                    <td><input type="checkbox" :checked="addedChargesList(item, 'facility_expenses')" @change="updateCartCharges({checked: $event.target.checked, item_id: item.id, type: 'facility_expenses'})"></td>
                    <td colspan="7" class="text--right">Facility Expenses</td>
                    <td>${{item.facility_expenses || 0}}</td>
                  </tr>

                  <tr v-if="item.hidden_charges != 0">
                    <td><input type="checkbox" :checked="addedChargesList(item, 'hidden_charges')" @change="updateCartCharges({checked: $event.target.checked, item_id: item.id, type: 'hidden_charges'})"></td>
                    <td colspan="7" class="text--right">
                      Hidden charges
                      &nbsp;
                      <i class="fas fa-question-circle" 
                      :title="chargesTitle(item, 'hidden_charges')">
                      </i>
                    </td>
                    <td>${{item.hidden_charges || 0}}</td>
                  </tr>

                  <tr v-if="coSurgFee(item) != 0">
                    <td><input type="checkbox" :checked="addedChargesList(item, 'cosurg_details')" @change="updateCartCharges({checked: $event.target.checked, item_id: item.id, type: 'cosurg_details'})"></td>
                    <td colspan="7" class="text--right">
                      Co Surgeon Fee &nbsp;
                      <i class="fas fa-question-circle" 
                      :title="chargesTitle(item, 'cosurg_details')">
                      </i>
                    </td>
                    <td>${{coSurgFee(item) || 0}}</td>
                  </tr>

                  <tr v-if="pathologyFee(item)">
                    <td><input type="checkbox" :checked="addedChargesList(item, 'pathology')" @change="updateCartCharges({checked: $event.target.checked, item_id: item.id, type: 'pathology'})"></td>
                    <td colspan="2"><strong>Related charges</strong></td>
                    <td colspan="5" class="text--right">
                      Pathology | Lab Fee &nbsp;
                      <i class="fas fa-question-circle" 
                      :title="chargesTitle(item, 'pathology')">
                      </i>
                    </td>
                    <td>${{pathologyFee(item) || 0}}</td>
                  </tr>

                  <tr v-if="radiologyFee(item)">
                    <td><input type="checkbox" :checked="addedChargesList(item, 'radiology')" @change="updateCartCharges({checked: $event.target.checked, item_id: item.id, type: 'radiology'})"></td>
                    <td colspan="7" class="text--right">
                      Radiology Fee &nbsp;
                      <i class="fas fa-question-circle" 
                      :title="chargesTitle(item, 'radiology')">
                      </i>
                    </td>
                    <td>${{radiologyFee(item) || 0}}</td>
                  </tr>


                  <tr>
                    <td>
                      <input type="checkbox" :checked="item.add_evob_charges" @change="updateCartDetails({checked: $event.target.checked, item_id: item.id})">
                    </td>
                    <td colspan="7" class="text--right">
                        eVOB Charges
                    </td>
                    <td>
                        ${{company.evob_charges}}
                    </td>
                  </tr>

                  <tr>
                    <td>&nbsp;</td>

                    <td colspan="7" class="text--right">
                        <strong> Total </strong>
                    </td>
                    <td>
                        <strong> ${{totalChargesOfItem(item)}} </strong>
                    </td>
                  </tr>

                  <tr v-if="coSurgNote != null">
                    <td colspan="2">&nbsp;</td>
                    <td colspan="7">
                      <strong>Note:</strong> {{coSurgNote(item)}}
                    </td>
                  </tr>

                </tbody>

              </table>
            </template>

            <template v-else>
              No items in your cart
            </template>
          </div>

          <div class="button-group my-sm grid-all-cols float--right" v-if="!loading && items.length">
            <button :disabled="!items.length" class="btn btn--secondary" @click.prevent="$router.push('/checkout')">
              Checkout
            </button>
          </div>

          <span class="clearfix"></span>

        </div><!--card-body-->

      </div><!--card-->


      <div class="wrapper__right">

        <div class="grand-total-box">
          <h5 class="heading-5 text--white">Grand Total</h5>
          <p class="paragraph">
              $ {{grandTotal}}<br>
              Items ({{items.length}})
          </p>
        </div>

        <button @click.prevent="redirectHome" class="btn btn--secondary to--upper mt-sm text--xs text--left w--100">
            add more treatments
        </button>

        <button class="btn btn--secondary mt-sm text--left w--100 text--xs to--upper" @click.prevent="showPricing">
            pricing strategies
        </button>

        <figure class="wrapper__image-care">
            <img src="@/assets/images/img-care-right.png" alt="Online Doctor 24/7">
        </figure>

      </div>

      <pricing @close="closeModal($event)" />


    </div><!--wrapper-->

    <section class="hospital-advertisement-cards" v-show="shouldShowPricing" ref="ad-cards">

      <div class="row cards-inner">

        <div class="col-sm-4 first-box">
            <div class="card">
                <div class="card-header">
                    <h4 class="text-center">Hospital</h4>
                    <p class="text-center">Hernia Repair</p>
                </div>

                <ul class="list-group text-center">
                    <li class="list-group-item display-4">
                        <strong>$24,000</strong>
                    </li>
                    <li class="list-group-item">Hernia</li>
                    <li class="list-group-item">Pre-Op Services
                        <i class="fa fa-times-circle text-danger"></i>
                    </li>
                    <li class="list-group-item">Surgery
                        <i class="fas fa-check-circle text-success"></i>
                    </li>
                    <li class="list-group-item">Post op servcies
                        <i class="fa fa-times-circle text-danger"></i>
                    </li>
                </ul>

            </div>
        </div>

        <div class="col-sm-4 second-box">
            <div class="card shouldice-card">
                <div class="card-header shouldice text-center">

                    <h4>Shouldice</h4>
                    <p>Hernia Repair</p>

                </div>


                <ul class="list-group text-center">
                    <li class="list-group-item display-4">
                        <strong>$6,000</strong>
                    </li>
                    <!-- <li class="list-group-item">Treatment name</li> -->
                    <li class="list-group-item">
                        Pre Op consult
                        <i class="fa fa-check-circle text-success"></i>
                    </li>
                    <li class="list-group-item">Surgery
                        <i class="fas fa-check-circle text-success"></i>
                    </li>
                    <li class="list-group-item">2 night inpatient stay
                        <i class="fa fa-check-circle text-success"></i>
                    </li>
                    <li class="list-group-item">
                        Physical therapy
                    </li>
                    <li class="list-group-item">
                        Nutritional  counseling
                    </li>
                    <li class="list-group-item">
                        Follow up visit
                    </li>
                    <li class="list-group-item">
                        Guarantee
                    </li>

                    <!-- <li class="list-group-item">
                        <router-link disabled class="btn btn--secondary px-5" :to="{name:'shop'}">
                            Proceed
                        </router-link>
                    </li> -->

                </ul>


            </div>
        </div>

        <div class="col-sm-4 third-box">
            <div class="card">
                <div class="card-header text-center">
                    <h4>Ambultary centers</h4>
                    <p>Hernia Repair</p>
                </div>

                <ul class="list-group text-center">
                    <li class="list-group-item display-4">
                        <strong>$12,000</strong>
                    </li>
                    <li class="list-group-item">Hernia</li>
                    <li class="list-group-item">Pre-Op Services
                        <i class="fa fa-times-circle text-danger"></i>
                    </li>
                    <li class="list-group-item">Surgery
                        <i class="fas fa-check-circle text-success"></i>
                    </li>
                    <li class="list-group-item">Post op services
                        <i class="fa fa-times-circle text-danger"></i>
                    </li>

                </ul>

            </div><!--card-body-->
        </div><!--card-->

      </div><!--row-->

    </section>

    <div class="my-sm">
      <h4 class="heading-4">Suggested Treatments</h4>
    </div>

    <div class="card mt-sm">

      <div class="card__body">

        <div>

            <h4 class="heading-4 my-xs">
              Experimental Investigational
            </h4>

            <div>
                <label for="">
                    <input type="checkbox" name="" id="">
                    Lorem ipsum dolor sit amet consectetur.
                </label>
            </div>

            <div>
                <label for="">
                    <input type="checkbox" name="" id="">
                    Lorem ipsum dolor sit amet consectetur.
                </label>
            </div>

        </div>

        <div class="my-xs">

            <h5 class="heading-5">
                Procedures requring authorization
            </h5>

            <p class="paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <div class="notification-box notification-box--tertiary my-sm">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit assumenda nisi reprehenderit nulla, sed accusantium necessitatibus a explicabo porro.
            </div>

        </div>

        <h4 class="heading-4">Note</h4>

        <ul class="list">
            <li class="list__item">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li class="list__item">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li class="list__item">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </li>
            <li class="list__item">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </li>

            <li class="list__item">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </li>
        </ul>

      </div><!--card__body-->

    </div><!--card-->


  </main><!--cart-->

</template>

<script>

import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
import pricing from '@/components/layouts/modals/cart/pricing'

export default {

  name: 'cart',
  middleware: 'auth',

  components: {
    pricing
  },

  head() {
    return {
      title: `Cart`
    };
  },

  data() {
    return {
      shouldShowPricing: false,
      more: false,
      moreType: null
    }
  },

  computed: {

    ...mapGetters({
      company            : 'company',
      loading            : 'cart/loading',
      items              : 'cart/items',
      grandTotal         : 'cart/grandTotal',
      totalChargesOfItem : 'cart/totalChargesOfItem',
      amountPayable      : 'cart/amountPayable',
      charges            : 'cart/charges'
    })
  },

  methods: {

    ...mapActions('cart', {
      getCartCount      : 'getCartCount',
      fetchCart         : 'fetchCart',
      updateCart        : 'updateCart',
      updateCartDetails : 'updateCartDetails',
      updateCartCharges : 'updateCartCharges',
    }),

    showPricing() {
      this.showAds().then(() => {
        let top = this.$refs['ad-cards'].offsetTop
        window.scrollTo({
          top,
          behavior: "smooth"
        })
      })
    },

    showAds() {
      this.shouldShowPricing = true
      return Promise.resolve()
    },

    pathologyFee(item) {
      return item.charges_details.pathology ? item.charges_details.pathology.fee : 0
    },

    radiologyFee(item) {
      return item.charges_details.radiology ? item.charges_details.radiology.fee : 0
    },

    coSurgFee(item) {
      return item.charges_details.cosurg_details ? item.charges_details.cosurg_details.fee.toFixed(2) : 0
    },

    addedChargesList(item, type) {
      return item.charges_details.added_charges_list ? item.charges_details.added_charges_list[type] : false
    },

    coSurgNote(item) {
      return item.charges_details.cosurg_details ? item.charges_details.cosurg_details.note : null
    },

    coSurgCategory(item) {
      return item.charges_details.cosurg_details ? item.charges_details.cosurg_details.category : null
    },

    chargesTitle(item, type) {
      let details = item.charges_details[type]
      if(details == null || details == '') return
      let fee = details.fee ? details.fee.toFixed(2) : 0
      let string = `code: ${details.code}\nFee: ${fee}\nDescription: ${details.description}\n`
      if(type == 'anesthesia') {
        string += `Units: ${details.units}`
      }
      return string
    },

    async removeCartItem(item) {
      await this.$axios.post(`cart/${item.id}/delete`)
      .then((res) => {
        this.$toast.success('Cart updated').goAway(2000);
        this.updateCart(item);
      })
    },

    redirectHome() {
      this.$router.push({name:'index'});
    },

    updateCartAndCheckout() {
      this.$router.push({name:'checkout'});
      this.$axios.post('cart/update');
    }

  },

  created() {
    this.fetchCart();
    this.getCartCount();
  }

}
</script>

<style scoped>
  .hospital-advertisement-cards {
      width:100%;
      margin-top:150px
  }
  .card {
      box-shadow:0 1px 4px rgba(0,0,0,0.4);
  }
  .first-box {
    margin:0;
    padding:0;
    margin-right:-10px;
  }
  .second-box {
    margin:0;
    padding:0
  }
  .third-box {
    margin:0;
    padding:0;
    margin-left:-10px;
  }
  .shouldice-card {
      z-index:1;
      transform:translateY(-15%);
      box-shadow:0 12px 15px rgba(0,0,0,0.4);
  }
  .card-header {
      background: #6667aa;
      color:#fff;
      font-weight:bold;
      padding:10px;
  }
  .list-group-item {
    padding-top:9px;
    padding-bottom:9px;
  }
  .cards-inner {
    margin:0;
    padding:0
  }
  .shouldice {
      background: #6667aa;
  }
  .display-4 {
      font-size:30px;
  }
  .shouldice-card .card-header.display-4 {
      font-size:36px;
  }
</style>

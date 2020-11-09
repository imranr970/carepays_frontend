<template>
  <main>

    <div class="filters-bar">

      <form class="form" @submit.prevent="submit" @keydown="removeError($event.target.name)" @change="removeError($event.target.name)">

        <label class="form__label" for="treatment_name" title="Treatment Name">
            <input type="text" class="form__input" id="treatment_name" placeholder="Treatment name" v-model="treatment_description" autocomplete="off">
        </label>

        <label class="form__label" for="location" title="User Location">
          <autocomplete id="shoppingWindowUserAddress" ref="shoppingWindowUserAddress" classes="form__input" name="address" v-model="filters.location" placeholder="location" />
        </label>

        <label class="form__label px-xs w-25" for="reason_visit" title="Speciality">

          <select class="form__input-control form__input-control--sm" v-model="filters.reason_for_visit">
            <option value="0">Please choose</option>
            <option :value="type.provider_type.toLowerCase()" v-for="type in providerTypes" :key="type.provider_type">
              {{type.provider_type}}
            </option>
          </select>
        </label>

        <label class="form__label mt-xs px-xs" for="dateTimePicker" title="Appointment date & time">
          <span id="dateTimePicker">
            <VueCtkDateTimePicker v-model="filters.date" label="Select date and time" :min-date="$moment().format('YYYY-MM-DD h:m a')" />
          </span>
        </label>

        <div class="px-sm">

            <label class="form__label dropdown--cta pointer">

              <p class="form__input w-100">
                More
                <i class="fa fa-angle-down fa-fw"></i>
              </p>

              <div class="dropdown--menu dropdown--menu-2">

                <!-- <div class="form__group dropdown--menu-2--1">
                  <div class="form__group">
                    <label for="" class="mb-xs">Experience</label>
                    <select name="expeience" class="form__input-control" v-model="filters.experience">
                      <option value="0">Please select</option>
                      <option value="&lt;2">Less than 2 years</option>
                      <option value="&lt;5">Less than 5 years</option>
                      <option value="&lt;10">Less than 10 years</option>
                      <option value="&gt;10">More than 10 years</option>
                    </select>
                  </div>
                </div> -->

                <!-- <div class="form__group dropdown--menu-2--2">
                  <div class="form__group">
                    <label for="" class="mb-xs">Credentialed</label>
                    <select name="credentialed" class="form__input-control" v-model="filters.credentialed">
                      <option value="0">Please select</option>
                      <option v-for="(cred, index) in creds" :key="index" :value="cred">{{cred}}</option>
                    </select>
                  </div>
                </div> -->

                <!-- <div class="form__group dropdown--menu-2--3">
                  <div class="form__group">
                    <label for="" class="mb-xs">Language</label>
                    <select name="language" class="form__input-control" v-model="filters.language">
                        <option value="0">Please select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                  </div>
                </div> -->

                <div class="form__group dropdown--menu-2--1" title="User Gender">
                  <div>
                    <label for="">Gender</label>
                    <select name="gender" class="form__input-control" v-model="filters.gender">
                        <option value="0">Please select</option>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                    </select>
                  </div>
                </div>

                <div class="form__group dropdown--menu-2--2" title="Doctor distance">
                  <label for="">Miles</label>
                  <input name="miles" type="range" class="form__input-control custom-range" v-model="filters.miles">
                </div>

              </div>

            </label>

        </div>

        <div class="form__group form__last-input">

            <label class="form__label" for="reset" @click="reset">
                <input type="reset" class="btn btn--sm no-shadow btn--primary mx-xs" id="reset">
            </label>

            <label class="form__label" for="submit">
                <input type="submit" class="btn btn--sm no-shadow btn--secondary mx-xs" id="submit" value="update">
            </label>

        </div>

      </form>

    </div>

    <main class="services-page">

      <div class="services-page--left">

        <div class="services-page--left-upper">

          <h4 class="heading-4 mb-sm" :title="treatment_description">
            {{formattedDesc(treatment_description, 63)}}
          </h4>

        </div>

        <div class="services-page--left-lower">

          <div class="services-page--cards">

            <template v-if="loading">

              <windowLoader v-for="i in 12" :key="i" />

            </template>

            <template v-else>

              <template v-if="treatments.length">

                <div class="card" v-for="(treatment, index) in treatments" :key="index">

                  <div class="card__body card__body--center">

                    <treatmentDetails :treatment="treatment" @add="addToCart($event)" @insert="insertTreatment($event)"  @open="openModal($event)" />

                  </div>

                </div>

              </template>

              <template v-else>
                <p>No Record found!</p>
              </template>

            </template>

            <!-- for infinite scrolling -->
            <div v-observe-visibility="{
              callback:incrementPage,
              throttle:500
            }">
            </div>

            <!-- Infinite scrolling Loader-->
            <center>
              <span v-if="loadingInfinite">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
            </center>

          </div><!--services-cards-->

        </div><!--left lower-->

      </div><!--services-page--left-->

      <div class="services-page--right">

        <div class="services-page--right-upper">
          <button class="btn btn--secondary to--upper mb-sm" @click.prevent="openModal('insurance')">
            View my Coverage
          </button>
          <h4 class="heading-4 mb-xs font--normal">Doctors in market</h4>
          <p class="text mb-sm text--fade">
              See what doctors are charging in your area
          </p>
        </div>


        <div class="services-page--right-lower">

            <div class="doctor__card">

                <figure class="doctor__card-img">
                    <img src="@/assets/images/adam-smith.jpg" alt="Doctors card">
                </figure>

                <div class="doctor__card-name">
                    <h5 class="heading-5">
                        Chauffina Carr
                    </h5>
                    <p class="speciality">Surgery</p>
                </div>

                <div class="doctor__card-text">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </div>

                <div class="doctor__card-footer">

                    <div class="doctor__card-distance">
                        <i class="fas fa-map-marker-alt"></i>
                        15 miles
                    </div>

                    <div class="doctor__card-rating">
                        <i class="fas fa-star"></i>
                        <span>4.5</span>
                    </div>

                    <div class="doctor__card-price">
                        $ 250
                    </div>

                </div>

            </div><!--doctors-card-->

            <div class="doctor__card">

                <figure class="doctor__card-img">
                    <img src="@/assets/images/testimonila-user.jpg" alt="Doctors card">
                </figure>

                <div class="doctor__card-name">
                    <h5 class="heading-5">
                        Dr Farooq Afridi
                    </h5>
                    <p class="speciality">Trainer</p>
                </div>

                <div class="doctor__card-text">
                    Iste eaque ipsam aperiam. Voluptatem laborum magnam nisi.
                </div>

                <div class="doctor__card-footer">

                    <div class="doctor__card-distance">
                        <i class="fas fa-map-marker-alt"></i>
                        1 miles
                    </div>

                    <div class="doctor__card-rating">
                        <i class="fas fa-star"></i>
                        <span>5</span>
                    </div>

                    <div class="doctor__card-price">
                        $ 300
                    </div>

                </div>


            </div><!--doctors-card-->

        </div>

      </div>

    </main><!--service-page-->

    <!--
      **
      **
      Negotiate Price Modal
      **
      **
    -->

    <negotiatePrice
      :treatment="current_treatment"
      :treatment_description="treatment_description"
      @close="closeModal($event)"
      @email="emailUser"
      v-model="counter_offer"
    />


  </main>
</template>

<script>

import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
import login from '@/components/login';
import windowLoader from '@/components/shopping_window/loader'
import treatmentDetails from '@/components/shopping_window/treatment_details'
import negotiatePrice from '@/components/layouts/modals/negotiatePrice'
import autocomplete from '@/components/autocomplete';
export default {

  components: {
    login,
    windowLoader,
    treatmentDetails,
    negotiatePrice,
    autocomplete
  },

  head() {
    return {
      title: `Shopping window`
    };
  },

  data() {

    return {
      treatments:[],
      loading:false,
      treatment_description:'',
      filters: {
        location: null,
        gender: this.$route.query.gender || 0,
        zipcode: null,
        code: this.$route.query.code,
        miles: 5,
        language: 0,
        credentialed: 0,
        start_time:null,
        end_time:null,
        date:null,
        experience:0,
        reason_for_visit:null,
        latlng:null
      },
      opened:false,
      meta:{},
      creds:{},
      loadingInfinite:false,
      date: '',
      current_treatment:{},
      counter_offer:null,
      insurances_for_treatment:null,
      providerTypes : []
    };

  },

  computed: {

    ...mapGetters({
      auth_insurances : 'insurance/auth_insurances',
      category        : 'index_and_search/search_category',
      userLocation    : 'index_and_search/location',
      latitude        : 'latitude',
      longitude       : 'longitude'
    })

  },

  watch: {
    latitude(value) {
      if(value != null) {
        this.filters.latlng = this.latitude + "," + this.longitude
      }
    },
    longitude(value) {
      if(value != null) {
        this.filters.latlng = this.latitude + "," + this.longitude
      }
    },
    'filters.code'(value) {
      if(value != null || value != '') {
        this.getProviderTypes(value)
      }
    }
  },

  methods: {

    ...mapActions({
      fillCartTable       : 'cart/fillCartTable',
      setErrors           : 'validation/setErrors',
      removeError         : 'validation/removeError'
    }),

    openModal(id) {

      try {
        $(`#${id}`).css({
          opacity:'1',
          visibility:'visible'
        });
        $(`#${id} .popup__content`).css({
          opacity:'1',
          transform: 'translate(-50%, -50%) scale(1)',
        });
      }
      catch(e) {
        console.log(e);
      }

    },

    closeModal(id) {
      try {
        $(`#${id}`).css({
          opacity:'0',
          visibility:'hidden'
        });
        $(`#${id} .popup__content`).css({
          opacity:'0',
          transform: 'translate(-50%, -50%) scale(0.5)',
        });
      }
      catch(e) {
        console.log(e);
      }
    },

    insertTreatment(treatment) {
      this.current_treatment = treatment;
      this.counter_offer = 0;
    },

    incrementPage(visible) {

      if(visible && this.treatments.length) {
        var filters = this.validateFilters();
        let page = ++this.meta.current_page;
        this.appendTreatments(page, filters);
      }

    },

    reset() {
      var filters = this.resetFilter();
      let page = 1;
      this.fetchTreatments(page, filters);
    },

    resetFilter() {

      this.filters.location = null;
      this.filters.gender = 0;
      this.filters.zipcode = null;
      this.filters.miles = 0;
      this.filters.language = 0;
      this.filters.credentialed = 0;
      this.filters.start_time = null;
      this.filters.end_time = null;
      this.filters.date = null;
      this.filters.experience = 0;

    },

    submit() {

      this.filters.location = $("#shoppingWindowUserAddress").val()
      var filters = this.validateFilters();
      let page = 1;
      this.fetchTreatments(page, filters);
    },

    appendTreatments(page, filters= {}) {

      if(this.pageIsOutOfBounds(page)) {
        return;
      }

      var destinations = [];
      this.loadingInfinite = true;

      axios.get(`${process.env.api.baseURL}/fetchTreatments`, {
        params: {
          ...filters,
          page
        }
      })
      .then(({data}) => {
        //this.calculateDistance(data);
        this.loadingInfinite = false;
        this.fillTreatments(data, true);
      })
      .catch((err) => {
        this.loadingInfinite = false;
      });

    },

    fetchTreatments(page = 1, filters = {}) {

      if(this.pageIsOutOfBounds(page)) {
        return;
      }

      this.loading = true;
      var destinations = [];

      this.updateRoute(filters);

      axios.get(`${process.env.api.baseURL}/fetchTreatments`, {
        params: {
          ...filters,
          page
        }
      })
      .then(({data}) => {
        //this.calculateDistance(data);
        this.fillTreatments(data);
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
      });

    },

    updateRoute(filters) {

     this.$router.replace({
        query: {
          ...filters
        }
      });

    },

    fillTreatments(data, append = false) {
      if(append == true) {
        this.treatments.push(...data.data);
      }
      else {
        this.treatments = data.data;
      }
      this.meta = data.meta
    },

    pageIsOutOfBounds(page) {
      //return page <= 0 || page > this.meta.last_page;
      return page <= 0 || page > Math.floor(this.meta.total)
    },

    validateFilters() {
      let filters = {};
      for(const [key, value] of Object.entries(this.filters)) {
        if(value == null || value == 0 || value == '') {
          continue;
        }
        // if(key == 'code') {
        //   continue;
        // }
        filters[key] = value;
      }
      return filters;
    },

    calculateDistance(data) {

      var origin = '2650 RIDGE AVE EVANSTON HOSPITAL, EVANSTON, IL, USA';
      var destinations = [];

      data.forEach((addr) => {
        var address = addr.street_address1 + " " + addr.street_address2 + ", " + addr.city + ", " + addr.state +", USA";
        destinations.push(address);
      });

      var geocoder = new google.maps.Geocoder;

      var service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
        origins: [origin],
        destinations: destinations,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      },
      function(response, status) {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        }
        else {

          var originList = response.originAddresses;
          var destinationList = response.destinationAddresses;
          var distances = [];

          for (var i = 0; i < originList.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
              //converting to meters to miles
              data[j]['distance'] = Number(((results[j].distance.value/1000) * 1.69).toFixed(2));
            }
          }
        }

      });

      this.treatments = data;
      this.filters.location = this.$route.query.location;
      this.loading = false;

    },

    fetchDescriptionOfCode() {

      axios.get(`${process.env.api.baseURL}/fetchCodeDescription`, {
        params: {
          code:this.$route.query.code
        }
      })
      .then(({data}) => {
        this.treatment_description = data[0].cpt_code_full_description;
      });
    },

    fetchCreds() {
      // axios.get(`${process.env.api.baseURL}/getDoctorCreds`)
      // .then(({data}) => {
      //   this.creds = data;
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    },

    addToCart(treatment) {

      let data = this.getCartData(treatment);

      data.treatment_id = treatment.id;

      if(data.negotiatedCost != null) {
        let cost = (parseFloat(treatment.average_cost) - parseFloat(data.negotiatedCost));
        data['savedCost'] = parseFloat(cost) + parseFloat(treatment.average_saved)
      }

      //validate before adding to cart
      if(!this.validateCart(data)) {
        return;
      }

      //adding to cart
      this.fillCartTable(data)
      .then((res) => {
        this.$toast.success('Cart updated').goAway(2000);
        //this.$router.push({name:'cart'});
      })
      .catch((err) => {
        this.$toast.error('Error updating cart').goAway(2000);
      });

    },

    emailUser(treatment = []) {

      let data = this.getCartData();

      let counter_offer = parseFloat(this.counter_offer);
      let market_rate = parseFloat(this.current_treatment.market_rate);

      if(!this.validateCounterOffer(counter_offer, market_rate)) {
        return;
      }

      //validate before adding to cart
      if(!this.validateCart(data)) {
        this.$toast.error("please enter time and date").goAway(2000);
        return;
      }

      data['counter_offer'] = counter_offer;
      data['avg_cost'] = this.current_treatment.average_cost;
      this.sendMail(data);
    },

    validateCounterOffer(counter_offer, market_rate) {
      let errors = {};

      if(counter_offer == 0 || isNaN(counter_offer)) {
        errors['counter_offer'] = ['Please enter your offer'];
        this.setErrors(errors);
        return false;
      }

      if(counter_offer < market_rate) {
        errors['counter_offer'] = ['Your offer is below our market price'];
        this.setErrors(errors);
        return false;
      }
      return true;
    },

    async sendMail(data) {

      var formattedData = this.formatCartData(data);

      this.closeModal('popup');

      await this.$axios.post('auth/sendOffer', {
        ...formattedData
      })
      .then((res) => {
        this.addToCart(this.current_treatment);
        this.$toast.success('Your offer has been accepted!').goAway(2000);
      });

    },

    formatCartData(data) {
      var formattedData = [];
      for(let [key, value] of Object.entries(data)) {
          formattedData[key] = value;
      }
      return formattedData;
    },

    validateCart(data) {
      if(!this.authenticated) {
        this.$router.push({name:'login', query: { redirect: `/shopping_window?code=${this.$route.query.code}`}});
        // this.openModal('login');
        return false;
      }
      if(data.date_of_service == null || data.date_of_service == '') {
        this.setErrors([{key:'date_of_service', value:'Date is required'}]);
        this.$toast.error("please enter time and date").goAway(2000);
        return false;
      }
      return true;
    },

    getCartData(current_treatment = null) {

      if(current_treatment == null) {
        current_treatment = this.current_treatment
      }

      let speciality = current_treatment.hasOwnProperty('provider_type')
      ? current_treatment.provider_type : null;

      var data = {
        location        : this.filters.location,
        treatment       : this.treatment_description,
        averageCost     : parseFloat(current_treatment.average_cost),
        purchaseCost    : parseFloat(current_treatment.purchase_cost),
        savedCost       : parseFloat(current_treatment.average_saved),
        negotiatedCost  : this.counter_offer,
        date_of_service : this.filters.date,
        time_of_service : this.filters.start_time,
        doctor          : current_treatment.doctor_id,
        cpt             : current_treatment.all_codes,
        speciality
      }

      return data;

    },

    getProviderTypes(code = null) {
      // let providerTypes = []
      // data.map((treatment) => {
      //   if(!providerTypes.includes(treatment.provider_type)) {
      //     providerTypes.push(treatment.provider_type)
      //   }
      // })
      // this.providerTypes = providerTypes
      if(code == null) code = this.$route.query.code

      axios.get(`${process.env.api.baseURL}/fetch-provider-types?code=${code}`)
      .then(({data}) => {
        this.providerTypes = data
      })

    },

    fillAddress() {
      let location = this.$route.query.location
      if(this.authenticated) {
        this.filters.location = this.user.address ? this.user.address.address : null;
        return
      }
      if(location && location != null && location != '') {
        this.filters.location = location
        return
      }
      this.filters.location = this.userLocation
    },

    fillReasonForVisit() {
      let reason_for_visit = this.$route.query.reason_for_visit
      if(reason_for_visit && reason_for_visit != null && reason_for_visit != '') {
        this.filters.reason_for_visit = reason_for_visit.toLowerCase()
        return
      }
      this.filters.reason_for_visit = 0;
    },

    fillLatLng() {
      if(this.latitude == null || this.longitude == null) {
        this.filters.latlng = null
        return
      }
      this.filters.latlng = this.latitude + "," + this.longitude
    }

  },

  created() {
    this.fetchDescriptionOfCode();
    this.fetchCreds();
    this.fillReasonForVisit();
    this.fillAddress();
    this.fillLatLng();
    this.fetchTreatments(1, this.validateFilters());
    this.getProviderTypes();
  }

}

</script>

<style>
  tr:not(:first-child) {
    background: #fff;
  }
  tr:first-child td {
    border-right:2px solid #fcfcfc;
  }
  .date-time-picker {
    margin:5px auto;
  }

</style>

<template>

  <div>

      <main class="home">

        <!--####################### Front Display #######################-->

        <section class="home__display">

            <div class="home__display--heading-section">
                <h1 class="heading-primary heading-primary--main">
                    Welcome to Carepays
                </h1>
                <h2 class="heading-primary heading-primary--sub">
                    How can we take care of you?
                </h2>
            </div>

            <figure class="home__display--background-image">
                <img src="@/assets/images/banner-img.png" alt="Carepays goals" class="img">
            </figure>

        </section>

        <!--####################### Search Box Section #######################-->

        <section class="home__search-box">

          <div class="search-btns">

            <button class="btn btn--primary-front search-btn--1 no-shadow border-radius-0 btn--lg">
              <!-- <span class="icon">
                  <i class="fa fa-search"></i>
              </span> -->
              Search
            </button>

            <nuxt-link class="btn btn--primary-front search-btn--2 no-shadow border-radius-0 btn--lg" :to="{name:'preventive-care'}">
              Save a life
            </nuxt-link>

            <nuxt-link class="btn btn--primary-front search-btn--3 no-shadow border-radius-0 btn--lg" :to="{name:'anatomy'}">
              Anatomy
            </nuxt-link>

          </div>

          <div class="tabcontent" id="search">
            <h4 class="heading-4 heading--primary">
              Find all medical care services & get instant quote
            </h4>

            <form action="#" class="form" autocomplete="off">

              <div class="position--relative">

                <input type="search" class="form__input" :class="{'has-error':errors.text}" placeholder="Search Treatments, Diseases, Doctors..." v-debounce:300="suggestSearches" debounce-events="keyup" v-model="text" @keyup.esc="emptyResults">

                <!--Dropdown-->
                <searchCategories @change="suggestSearches" />

                <!-- sugestions box -->
                <suggestionsBox @fetch="fetchCptsAndRedirect($event)" @select="selectSearch($event)" />

              </div>

              <div class="position--relative">

                <autocomplete id="userAddressIndex" classes="form__input pr-5" :class="{'has-error':errors.zipCode}" name="address" v-model="zipCode" />

                <gpsLocator @clicked="assignZipCode($event)" />

                <div class="helping-popup">
                  Location will help us show you best results in your area!
                  <i class="fas fa-times fa-circle" @click.prevent="hideBaloon($event.target)"></i>
                </div>

              </div>

              <button :disabled="shouldDisabled || loading" @click.prevent="searchTerm" type="submit" class="btn btn--secondary no-shadow search-btn">
                Search
                <i class="fas fa-spinner fa-spin" v-show="loading"></i>
              </button>

            </form>
          </div>

        </section>

        <!--####################### Patients Box Section #######################-->

        <section class="home__patients-box">

            <figure class="home__patients-box--img">
                <img src="@/assets/images/graphic2.png" alt="Carepays graphics">
            </figure>

            <div class="home__patients-box--content">
                <h3 class="heading-3 mb-xs">Carepays For Patients</h3>
                <ul class="patients-box__list">
                    <li class="patients-box__list-item">
                        <span class="hyphen">-</span> Unrestricted access to over 500,000 licensed Professionals</li>
                    <li class="patients-box__list-item">
                        <span class="hyphen">-</span> Shop Quality care at competitive prices
                    </li>
                    <li class="patients-box__list-item">
                        <span class="hyphen">-</span> As much as 70% savings on health care costs
                    </li>
                    <li class="patients-box__list-item">
                        <span class="hyphen">-</span> Credit card and Loan options
                    </li>
                    <li class="patients-box__list-item">
                        <span class="hyphen">-</span> One price - No balance billing
                    </li>
                </ul>

                <div class="buttons-block mt-sm">
                    <button class="btn btn--secondary mr-xs">Get Benefits</button>
                    <button class="btn btn--secondary">Get Funding</button>
                </div>

            </div>

        </section>

        <!--####################### provider Box Section #######################-->

        <section class="home__providers-box">

          <div class="home__providers-box--content">

            <h3 class="heading-3 mb-xs">Carepays For Healthcare providers</h3>

            <ul class="providers-box__list">
                <li class="providers-box__list-item">
                    <span class="hyphen">-</span> Cash Flow Opportunities</li>
                <li class="providers-box__list-item">
                    <span class="hyphen">-</span> Carepays Will Send You New Patients
                </li>
                <li class="providers-box__list-item">
                    <span class="hyphen">-</span>
                    Reduce Optional Costs by upto 80%
                </li>
                <li class="providers-box__list-item">
                    <span class="hyphen">-</span>
                    Claims are settled within 3-5 bussiness days
                </li>
                <li class="providers-box__list-item">
                    <span class="hyphen">-</span>
                    Eliminate Billings and Collections
                </li>

                <li class="providers-box__list-item">
                    <span class="hyphen">-</span>
                    Denial Management
                </li>
            </ul>

            <div class="buttons-block mt-sm">
                <button class="btn btn--secondary mr-xs">Get Benefits</button>
                <button class="btn btn--secondary">Get Funding</button>
            </div>

          </div>

          <figure class="home__providers-box--img">
              <img src="@/assets/images/bills.png" alt="Carepays graphics">
          </figure>

        </section>

        <!--####################### Benefit Card Section #######################-->

        <section class="home__benefit-card">
            <figure class="home__benefit-card--img">
                <img src="@/assets/images/prime-img.png" alt="Carepays graphics">
            </figure>

            <div class="home__benefit-card--content">
                <h3 class="heading-3 mb-md">Carepays Benefit card</h3>
                <ul class="benefit-card__list">
                    <li class="benefit-card__list-item">
                        <span class="hyphen">-</span> Four packages to fit your needs</li>
                    <li class="benefit-card__list-item">
                        <span class="hyphen">-</span> Save time and money on health care expenses
                    </li>
                    <li class="benefit-card__list-item">
                        <span class="hyphen">-</span> Select from a variety of options for 24/7 access to nurses and physicians by phone
                    </li>
                    <li class="benefit-card__list-item">
                        <span class="hyphen">-</span> All packages include savings on eyeglasses, contact lenses, eye exams and more
                    </li>
                </ul>

                <div class="buttons-block mt-md">
                    <button class="btn btn--secondary mr-xs">Get Benefits</button>
                    <button class="btn btn--secondary">Get Funding</button>
                </div>

            </div>
        </section>

         <!--####################### Happy Patients #######################-->

        <section class="home__happy-patients">

          <h4 class="heading-4 mb-md">Our Happy Patients</h4>

          <div class="user">

            <div class="user--1">

              <p class="home__happy-patients--text text--1">
                Carepays is setting itself apart from other healthcare services by emphasizing
                technology, data and easy-to-understand explanations of its services.
              </p>

              <div class="about">

                <figure class="about__img">
                  <img src="@/assets/images/testimonila-user.jpg" alt="User">
                </figure>

                <div class="about__info">
                  <h5 class="about__name to--upper text--left">ricky siskaro</h5>
                  <p class="about__details">
                    Lorem ipsum dolor sit.
                  </p>
                </div>

              </div>

            </div>

            <div class="user--2">

              <p class="home__happy-patients--text text--2">
                Carepays is setting itself apart from other healthcare services by emphasizing
                technology, data and easy-to-understand explanations of its services.
              </p>

              <div class="about">

                <figure class="about__img">
                  <img src="@/assets/images/adam-smith.jpg" alt="User">
                </figure>

                <div class="about__info">
                  <h5 class="about__name to--upper text--left">Adam Smith</h5>
                  <p class="about__details">
                    Lorem ipsum dolor sit.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>

        <referenceDoctor @close="closeModal($event)" />

        <termBodyParts @close="closeModal($event)" />

      </main>

  </div>
</template>

<script>

import suggestionsBox from '@/components/suggestionsBox';
import autocomplete from '@/components/autocomplete';
import searchCategories from '@/components/search-categories'
import gpsLocator from '@/components/gpsLocator'
import referenceDoctor from '@/components/layouts/modals/home/reference_doctor';
import termBodyParts from '@/components/layouts/modals/home/term_body_parts';

import {mapGetters, mapActions} from 'vuex';
import axios from 'axios';

export default {

  components: {
    suggestionsBox,
    autocomplete,
    searchCategories,
    gpsLocator,
    referenceDoctor,
    termBodyParts
  },

  head() {
    return {
      title: `${process.env.appName} ${process.env.appDesc}`
    };
  },

  computed: {

    ...mapGetters({
      search    : 'index_and_search/search',
      loading   : 'index_and_search/loading',
      latitude  : 'latitude',
      longitude : 'longitude'
    }),

    text: {

      set(value) {
        this.setSearchDetails({type:'text', value});
      },

      get() {
        return this.search.text;
      }

    },

    zipCode: {
      set(value) {
        this.setSearchDetails({type:'zipCode', value});
      },

      get() {
        return this.search.zipCode;
      }
    },

    shouldDisabled() {
      if(this.zipCode == '' || this.text == '') {
        return true;
      }
      return false;
    }

  },


  methods: {

    ...mapActions('index_and_search', {

      suggestSearches      : 'suggestSearches',
      setSearchDetails     : 'setSearchDetails',
      selectSearch         : 'selectSearch',
      searchSubmit         : 'searchSubmit',
      fetchCptsAndRedirect : 'fetchCptsAndRedirect',
      emptyResults         : 'emptyResults',

    }),

    ...mapActions({
      editInfo    : 'anatomy/editInfo',
      setCptCodes : 'setCptCodes',
      fillErrors  : 'validation/fillErrors'
    }),

    searchTerm() {
      this.fillErrors();
      this.searchSubmit();
      this.openModal('term_body_parts');
    },

    fillErrors() {
      if(this.zipCode == '' || this.zipCode == null) {
        this.setErrors([{'zipCode' : 'Please enter your location'}]);
      }
      if(this.text == '' || this.text == null) {
        this.setErrors([{'text' : 'Please enter search term'}]);
      }
    },

    authAddress() {
      if(this.authenticated) {
        this.zipCode = this.user && this.user.address ? this.user.address.address : null;
      }
    }

  },

  created() {
    this.authAddress();
    this.editInfo({type:'part', part:''});
    this.setCptCodes([]);
  }

}

</script>

<style lang="scss" scoped>
  .helping-popup {
    position: absolute;
    top:130%;
    left:0;
    z-index:1000;
    background:#2271d9;
    color:#fff;
    display:inline-block;
    width:100%;
    text-align:center;
    padding:1.5rem 2rem;
    // opacity:.7;
    transition: all .2s;
    font-family: inherit;
    font-size:1.4rem;
    &::after {
      content:"";
      position:absolute;
      top:-18%;
      left:50%;
      border-left:10px solid transparent;
      border-top:12px solid transparent;
      border-right:10px solid transparent;
      border-bottom:12px solid #2271d9;
      transform:translate(-50%, -50%);
    }
    i {
      position:absolute;
      top:5%;
      right:3%;
      cursor:pointer;
      &:hover {
        opacity: .8;
      }
    }
  }
</style>


<template>

  <div class="modal fade searchModal bd-example-modal-lg" id="searchModal">

    <div class="modal-dialog modal-dialog-centered model-lg" role="document">

      <div class="modal-content">

          <div class="modal-header">
            <h4 class="modal-title heading-4">Search</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <!-- <i class="fas fa-times-circle text-danger"></i> -->
            </button>
          </div>

          <div class="modal-body">
            <div class="tabcontent" id="search">
                <h4 class="heading-4 heading--primary">
                  Find all medical care services & get instant quote
                </h4>

                <form action="#" class="form" autocomplete="off">

                    <div class="form__group position--relative">
                        <input type="search" class="form__input-control" placeholder="Search Treatments, Diseases, Doctors..." @keyup="suggestSearches" v-model="text" @keyup.esc="emptyResults">

                        <!--Dropdown-->
                        <select v-model="category" class="form__input-control form__front-dropdown" @change="suggestSearches">

                          <option :value="value" v-for="(value, category) in search.categories" :key="value">
                            {{category}}
                          </option>

                        </select>

                        <!-- sugestions box -->
                        <suggestionsBox @fetch="fetchCptsAndRedirect($event)" @select="selectSearch($event)"></suggestionsBox>

                    </div>

                    <div class="form__group position--relative">
                      <input type="text" name="location" id="location" class="form__input-control" v-model="zipCode" placeholder="Location...">
                      <span class="icons" @click="detectLocation" title="Auto Detect Location">
                        <img src="@/assets/images/svg-icons/gps-fixed-indicator.svg" alt="Gps Auto detect location">
                      </span>
                    </div>

                    <div class="form__group">
                        <button @click.prevent="searchSubmit" type="submit" class="btn btn--secondary btn--border no-shadow">
                          Search
                        </button>
                    </div>

                </form>
            </div>

          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-danger btn--sm" data-dismiss="modal">
              Close
            </button>
          </div>

      </div>
    </div>


  </div>

</template>

<script>
import suggestionsBox from '@/components/suggestionsBox';
import {mapGetters, mapActions} from 'vuex';
import axios from 'axios';

export default {
  name:'searchModal',
  //registering components
  components: {
    suggestionsBox
  },

  computed: {

    ...mapGetters('index_and_search', {
      search : 'search'
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

    category: {

      set(value) {
        this.setSearchDetails({type:'category', value});
      },

      get() {
        return this.search.category;
      }

    }

  },


  methods: {

    ...mapActions('index_and_search', {

      suggestSearches      : 'suggestSearches',
      setSearchDetails     : 'setSearchDetails',
      selectSearch         : 'selectSearch',
      searchSubmit         : 'searchSubmit',
      fetchCptsAndRedirect : 'fetchCptsAndRedirect',
      emptyResults         : 'emptyResults'

    }),


    detectLocation() {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },

    showPosition(position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      console.log(lat, lng);

      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBjmzNlPIeeD5qk9ZxXz4ihXx5b1Wh9esk`)
      .then(({data}) => {
        this.zipCode = data.results[0].formatted_address;
      });
      //this.displayLocation(lat, lng);
    }

  }
}
</script>

<template>
  <span class="icons" @click="detectLocation" title="Auto Detect Location">
    <img src="@/assets/images/svg-icons/gps-fixed-indicator.svg" alt="Gps Auto detect location">
  </span>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {

  methods: {

    ...mapActions({
      setSearchDetails : 'index_and_search/setSearchDetails',
      setUserLatLng    : 'setUserLatLng'
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
      this.setUserLatLng({lat, lng});
      this.displayLocation(lat, lng);
    },

    displayLocation(latitude,longitude) {
      var geocoder;
      geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(latitude, longitude);
      var zipCode;
      geocoder.geocode(
        {'latLng': latlng},
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

              if (results[0]) {

                var addr= results[0].formatted_address;
                var value=addr.split(",");

                let count=value.length;
                let country=value[count-1];
                let state=value[count-2];
                let city=value[count-3];
                this.assignZipCode(addr);

              }
              else  {
                alert("address not found");
              }

            }
            else {
              alert("Geocoder failed due to: " + status);
            }
        }.bind(this));//callback

    },//displayLocation

    assignZipCode(value) {
      this.setSearchDetails({type:'zipCode', value});
      // this.$emit('clicked', value);
    }


  }
}
</script>

<style>

</style>

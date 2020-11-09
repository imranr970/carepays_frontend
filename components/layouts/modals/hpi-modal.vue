<template>

  <div class="popup" id="hpi">

    <div class="popup__content">

      <a href="#" class="popup__close" @click.prevent="$emit('close', 'hpi')">&times;</a>

      <h4 class="heading-4 px-sm pt-xs">
        Welcome to Virtual Scribe
      </h4>

      <hr>

      <section class="px-sm py-xs form">

        <div v-if="step==1">

          <h5 class="heading-5">Location</h5>

          <div class="form__group">

            <label class="form__label"> What is the site of the problem? </label>

            <select class="form__input-control form__input-control--sm" v-model="hpi.location" @change="checkPart">
              <option value="0">Please select</option>
              <option :value="part.name.toLowerCase()" :key="part.id" v-for="part in parts">
                {{part.name}}
              </option>
            </select>

          </div>

          <div class="form__group" v-if="hpi.bilateral">

            <label class="form__label">Which side exactly are you feeling pain?</label>

            <input type="radio" name="location-bilateral" id="location-left" value="left" v-model="hpi.location_bilateral">
            <label for="location-left">Left
                <span class="radio-button"></span>
            </label>

            <input type="radio" name="location-bilateral" id="location-right" value="right" v-model="hpi.location_bilateral">
            <label for="location-right">Right
                <span class="radio-button"></span>
            </label>

            <input type="radio" name="location-bilateral" id="location-both" value="both" v-model="hpi.location_bilateral">
            <label for="location-both">Both
                <span class="radio-button"></span>
            </label>

          </div>

        </div>

        <div v-if="step==2">

          <h5 class="heading-5">Quality</h5>

          <div class="form-group">

            <p class="form__label">What is the nature of the pain?</p>

            <input type="radio" name="nature" v-model="hpi.nature_of_pain" id="nature-constant" value="constant">
            <label for="nature-constant">Constant
              <span class="radio-button"></span>
            </label>

            <input type="radio" id="nature-acute" name="nature" v-model="hpi.nature_of_pain" value="acute">
            <label for="nature-acute">Acute
              <span class="radio-button"></span>
            </label>

            <input type="radio" name="nature" v-model="hpi.nature_of_pain" id="nature-chronic" value="chronic">
            <label for="nature-chronic">Chronic
              <span class="radio-button"></span>
            </label>

            <input type="radio" name="nature" v-model="hpi.nature_of_pain" id="nature-improved" value="improved">
            <label for="nature-improved">Improved
              <span class="radio-button"></span>
            </label>

            <input type="radio" name="nature" v-model="hpi.nature_of_pain" id="nature-worsening" value="worsening">
            <label for="nature-worsening">Worsening
              <span class="radio-button"></span>
            </label>

          </div>

        </div>

        <div v-if="step==3">
          <h5 class="heading-5">Severity</h5>

          <div class="form-group range-wrapper my-sm">

            <label class="form__label">
              Describe the pain or redness, on a scale of 1 to 10, with 10 being the worst.
            </label>

            <input :title="hpi.pain_bar" type="range" @change="changeSeverity" class="slider" id="myRange" min="1" max="10" v-model="hpi.pain_bar" list="numbers"/>

          </div>
        </div>

        <div v-if="step==4">

          <h5 class="heading-5">Duration</h5>

          <p class="form__label">How long has the problem been an issue?</p>

          <div class="flex">

            <div class="form__group flex-1">

              <label class="form__label">From</label>
              <input v-model="hpi.from_time" type="date" class="form__input-control form__input-control--xs" id="fromTime">

            </div>

            <div @click="set_present = false" v-if="set_present" class="form__group flex-1">

              <label class="form__label">To</label>
              <input v-model="hpi.to_time" type="text" class="form__input-control form__input-control--sm present" value="Till present">

            </div>

            <div v-if="!set_present" class="form__group flex-1">

              <label class="form__label">To</label>
              <div class="time-input">
                <input v-model="hpi.to_time" type="time" class="form__input-control form__input-control--xs">
                <i @click="set_present=true" class="fas fa-times-circle text-danger pointer"></i>
              </div>

            </div>

          </div>

        </div>

        <div v-if="step==5">

          <h4 class="d-inline-block heading-4">Chief complain</h4>

          <div title="Add more complains" class="icon__add-more d-inline-block" @click="storeComplain">
            <i class="fas fa-plus"></i>
          </div>
          <div class="clearfix"></div>

          <ul class="list-group">
            <li class="list-group-item" v-for="(hpi, index) in cc" :key="index">

              <span v-if="index == 0">
                <strong>Primary complain</strong>
              </span>

              <span v-if="index != 0">
                <strong>Secondary complain</strong>
              </span>

              Patient complains of pain in {{hpi.location}}

              <span v-if="hpi.bilateral">
                in {{hpi.location_bilateral}}
                <span v-if="hpi.location_bilateral =='both'">sides</span><span v-else>side</span>.
              </span>

            </li>
          </ul>

        </div>

        <div v-if="step==6">

          <h4 class="heading-4">Thankyou</h4>
          <p class="form__label">Your provided information is important for us and your doctor.</p>

          <div class="card m-2" v-for="(complain, index) in cc" :key="index">

            <h5 class="card-header" v-if="index == 0">
                <strong>Primary complain</strong>
            </h5>

            <h5 class="card-header" v-if="index != 0">
                <strong>Secondary complain</strong>
            </h5>

            <div class="card-body">

                Patient complains of {{complain.location}}

                <span v-if="complain.bilateral">
                    in {{complain.location_bilateral}}
                    <span v-if="complain.location_bilateral =='both'">sides</span><span v-else>side</span>.
                </span>

                <div class="nature">
                    Nature of pain: {{complain.nature_of_pain}}
                </div>

                <div class="pain_severity">
                    Pain severity: {{complain.pain_bar}}
                </div>

                <div class="time">
                    Pain Duration:<br>
                      From :{{complain.from_time}}
                      To : {{complain.to_time}}
                </div>

            </div>

          </div>

        </div>

      </section>

      <hr>

      <div class="popup__content--footer px-sm py-xs float--right">

        <div v-if="step != 6">
          <button v-if="step != 1" class="btn btn--default btn--sm less-shadow" @click="decrementStep">
            Previous
          </button>

          <button v-if="step != 5" class="btn btn--secondary btn--sm" @click="incrementStep">
            Next
          </button>
        </div>

        <button @click="showThankyou" v-if="step == 5" class="btn btn--primary btn--sm d--inline">
          Finish
        </button>

        <button v-if="step == 6" type="button" class="btn btn--default btn--sm d--inline" @click.prevent="$emit('close', 'hpi')">
          Close
        </button>


      </div>

      <div class="clearfix"></div>

    </div><!--popup__content-->

  </div><!--popup-->

</template>

<script>

import axios from 'axios';
import {mapGetters, mapActions} from 'vuex'

export default {

  data() {

    return {

      hpi: {
        location:'0',
        bilateral:false,
        location_bilateral:'both',
        nature_of_pain:'constant',
        pain_bar:'0',
        to_time:'present',
        from_time:''
      },

      step: 1,
      set_present:true,
      cc:[],
      loading:false,
      parts:{}

    };

  },

  computed: {
    ...mapGetters({
      selectedPartFromSearch  : 'index_and_search/part'
    })
  },

  methods: {

    ...mapActions({
      storeHpiData : 'index_and_search/storeHpiData'
    }),

    showThankyou() {
      this.step = 6;
      this.storeHpiData(this.cc);
      this.finishSetup();
    },

    storeComplain() {

      //start from the step1
      this.step = 1;

      //pop that part which has been compaint of!
      var parts = this.parts.filter((part) => {
        return part.name != this.hpi.location;
      });

      this.parts = parts;

      this.resetHpi();
    },

    finishSetup() {
      //this.cc.push(this.hpi);
      this.resetHpi();
    },

    resetHpi() {
      this.hpi.location = 0;
      this.hpi.bilateral = false;
      this.hpi.location_bilateral = 'both';
      this.hpi.nature_of_pain = 'constant',
      this.hpi.pain_bar='1',
      this.hpi.to_time = '',
      this.hpi.from_time = ''
    },

    changeSeverity() {

      var x = document.getElementById('myRange');

      if (this.hpi.pain_bar == '1' || this.hpi.pain_bar == '2' || this.hpi.pain_bar == '3') {
          x.style.background = '-webkit-linear-gradient(to right bottom, #56ab2f, #55c57a)';
          x.style.background = 'linear-gradient(to right bottom, #56ab2f, #55c57a)';
      }

      else if (this.hpi.pain_bar == '4' || this.hpi.pain_bar == '5' || this.hpi.pain_bar == '6' || this.hpi.pain_bar == '7') {
          x.style.background = '-webkit-linear-gradient(-60deg, #f09819 0%, #ff5858 100%)';
          x.style.background = 'linear-gradient(-60deg, #f09819 0%, #ff5858 100%)';
      }

      else if (this.hpi.pain_bar == '8' || this.hpi.pain_bar == '9' || this.hpi.pain_bar == '10') {
          x.style.background = '#D31027';
          x.style.background = '-webkit-linear-gradient(to bottom, #ff416c, #ff4b2b)';
          x.style.background = 'linear-gradient(to bottom, #ff416c, #ff4b2b)';
      }

    },

    incrementStep() {
      if(this.step == 4) {
        this.pushHpi();
      }

      if(this.step != 5) {
        this.step += 1;
      }
    },

    pushHpi() {

      if(this.hpi.location != 0 && !this.locationExists()) {

        let ccData = {};
        //clone hpi data and assign to ccData
        Object.assign(ccData, this.hpi);
        //hpi.to_time
        this.hpi.from_time = document.getElementById('fromTime').value;

        //push ccData to cc
        this.cc.push(ccData);

      }

    },

    locationExists() {

      var location = this.hpi.location;
      var exists = false;
      //if current complain's location exists in cc then return exists true
      this.cc.filter((objs) => {
        if(location == objs.location) {
          exists = true;
        }
      });
      return exists;

    },

    decrementStep() {
      if(this.step != 1) {
        this.step -= 1;
      }
    },

    fetchParts() {
      axios.get(`${process.env.api.baseURL}/hpi-parts-all`)
      .then((res) => {
        this.parts = res.data;
      })
      .catch((error) => {
      });
    },

    checkPart() {

      var parts = ['eyes', 'ear', 'shoulder', 'upper arm', 'elbow', 'fore arm', 'wrist', 'fingers', 'armpit', 'palm', 'toes', 'sole', 'ankle', 'calf', 'thigh', 'knee', 'shin', 'groin', 'hip', 'buttock', 'hamstring', 'upper abdomen', 'lower abdomen'];

      var part = this.hpi.location.toLowerCase();

      if(parts.indexOf(part) == -1) {
        this.hpi.bilateral = false;
      }

      else {
        this.hpi.bilateral = true;
      }

    },

    mapPartWithSearchSelectedPart() {
      this.hpi.location = this.selectedPartFromSearch.name ? this.selectedPartFromSearch.name.toLowerCase() : 0
    }

  },

  created() {
    this.fetchParts();
    this.mapPartWithSearchSelectedPart();
  }

}
</script>

<style lang="scss" scoped>

.d--inline {
  display:inline-block !important;
}

.present {
  padding-bottom:.8rem;
}
.to-present {
  pointer-events:none;
  opacity:0.9;
}
.time-input {
    position:relative;
}
.time-input > i {
    position:absolute;
    top:50%;
    right:12%;
    cursor:pointer;
    transform:translateY(-50%);
}

.range-wrapper {
  position:relative;
}

.slider {
  -webkit-appearance: none;
  width:100%;
  height:15px;
  border-radius: 5px;
  background: linear-gradient(to right bottom, #28b485, #55c57a);
  outline: none;
  -webkit-transition: .2s;
  transition: all .2s;
  position:absolute;
  top:1rem;
  margin:2rem 0;

  &::before {
    display:none;
  }

}

.icon__add-more {
    width:30px;
    height:30px;
    background: white;
    box-shadow:0 1px 4px rgba(0,0,0,0.2) !important;
    border-radius:50%;
    cursor:pointer;
    color:#222;
    position:relative;
    transition:all 0.3s;

    i {
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        font-size:15px;
    }

    &:hover {
        box-shadow:0 3px 6px rgba(0,0,0,0.4) !important;
    }
    &:focus,
    &:active {
        box-shadow:0 1px 3px rgba(0,0,0,0.2) !important;
        transform: translateY(2px);
    }
}
</style>

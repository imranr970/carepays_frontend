<template>

  <main class="preventive-care">

    <div class="preventive-care__heading">
      <h4 class="heading-4">Save a life program</h4>
    </div>

    <div class="preventive-care--grid">

      <div class="preventive-care--left">
        <div>
          <template v-if="step==1">

            <div class="left-main">

              <h1>Age and Gender</h1>

              <div class="icons icons--grid">

                <!-- <img src="@/assets/images/svg-icons/preventiveCare/svg/043-boy-5.svg" alt="boy"/>
                <img src="@/assets/images/svg-icons/preventiveCare/svg/023-girl-1.svg" alt="girl"/> -->

              </div>

            </div>

          </template>

          <template v-if="step==2">


            <div class="h--100 left-main">

              <div>
                <h1>Services</h1>
                <p class="my-xs">Select services which you want to avail</p>
              </div>

              <div class="icons" v-show="!loading">

                <!-- <img src="@/assets/images/svg-icons/preventiveCare/services/heart.svg" alt="heart service icon"/>
                <img  src="@/assets/images/svg-icons/preventiveCare/services/syringe.svg" alt="syringe"/>
                <img src="@/assets/images/svg-icons/preventiveCare/services/strip.svg" alt="strip"/> -->

              </div>


            </div>

          </template>

          <template v-if="step==3">
            <div class="h--100 left-main">
              <h1>{{formattedTerm(step3Type)}}</h1>
            </div>
          </template>

          <template v-if="step==4">

            <div class="h--100 left-main">
              <div v-if="step3Type == 'questions'">
                <h2>Which services did you avail before?</h2>
              </div>
              <div v-if="step3Type == 'excludes'">
                <h2>Questions</h2>
              </div>
            </div>

          </template>

          <template v-if="step==5">
            <div class="left-main h--100">

              <div v-if="step3Type == 'questions'">
                <h2>When did you last avail these services?</h2>
              </div>
              <div v-if="step3Type == 'excludes'">
                <h2>Which services did you avail before?</h2>
              </div>

            </div>
          </template>

          <template v-if="step==6">
            <div class="left-main h--100">
              <div v-if="step3Type == 'excludes'">
                <div v-if="selectedAvailedServices.length > 0">
                  <h2>When did you last avail these services?</h2>
                </div>
                <div v-else>
                  <h2>Treatments suggested for you</h2>
                </div>
              </div>

              <div v-if="step3Type == 'questions'">
                <h2>Treatments suggested for you</h2>
              </div>

            </div>

          </template>
        </div>
      </div>

      <div class="preventive-care--right">

        <div class="card">

          <div class="card__body">

            <template v-if="step == 1">
              <ageGender />
            </template>

            <template v-if="step == 2">
              <services />
            </template>

            <template v-if="step == 3">

              <template v-if="loading">
                <i class="fa fa-spinner fa-spin"></i>
              </template>

              <template v-else>

                <div v-if="step3Type == 'questions'">
                  <questions @skip="incrementStepAndSendReq" />
                </div>

                <div v-if="step3Type == 'excludes'">
                  <excludes/>
                </div>

              </template>

            </template>

            <template v-if="step == 4">

              <template v-if="loading">
                <i class="fa fa-spinner fa-spin"></i>
              </template>

              <template v-else>

                <template v-if="step3Type == 'questions'">

                  <div class="mb-sm" v-for="service in selectedServices" :key="service.id">

                    <label class="checkbox__container checkbox__container--block" :for="service.id">

                      {{service.service}}
                      <span>
                        <i class="fas fa-question-circle" :title="service.definition"></i>
                      </span>
                      <input :checked="service.checked" class="answers-checkbox" :id="service.id" type="checkbox" :value="service.id" @change="addOrRemoveAvailedService($event, service)">
                      <span class="checkmark checkmark--green"></span>

                    </label>

                  </div>

                  <div class="mb-sm">

                    <label class="checkbox__container checkbox__container--block none-checkbox" for="none">

                      None of the above

                      <input class="answers-checkbox" id="none" type="checkbox" value="none" @change="addOrRemoveAvailedService($event, null)">
                      <span class="checkmark checkmark--green"></span>

                    </label>

                  </div>

                </template>

                <template v-if="step3Type == 'excludes'">
                  <questions @skip="incrementStepAndSendReq"/>
                </template>

              </template>


            </template>

            <template v-if="step == 5">

              <template v-if="loading">
                <i class="fa fa-spinner fa-spin"></i>
              </template>

              <template v-else>

                <template v-if="step3Type == 'questions'">
                  <frequencies/>
                </template>

                <template v-if="step3Type == 'excludes'">

                  <div class="mb-sm" v-for="service in selectedServices" :key="service.id">

                    <label class="checkbox__container checkbox__container--block" :for="service.id">

                      {{service.service}}
                      <span>
                        <i class="fas fa-question-circle" :title="service.definition"></i>
                      </span>
                      <input :checked="service.checked" class="answers-checkbox" :id="service.id" type="checkbox" :value="service.id" @change="addOrRemoveAvailedService($event, service)">
                      <span class="checkmark checkmark--green"></span>

                    </label>

                  </div>

                  <div class="mb-sm">

                    <label class="checkbox__container checkbox__container--block" for="none">

                      None of the above

                      <input class="answers-checkbox none-checkbox" id="none" type="checkbox" value="none" @change="addOrRemoveAvailedService($event, null)">
                      <span class="checkmark checkmark--green"></span>

                    </label>

                  </div>

                </template>

              </template>

            </template>

            <template v-if="step == 6">

              <template v-if="loading">
                <i class="fa fa-spinner fa-spin"></i>
              </template>

              <template v-else>

                <template v-if="step3Type == 'excludes'">

                  <div v-if="selectedAvailedServices.length > 0">
                    <frequencies/>
                  </div>

                  <div v-else>
                    <treatments/>
                  </div>

                </template>

                <template v-if="step3Type == 'questions'">
                  <treatments/>
                </template>

              </template>

            </template>

          </div><!--card-body-->

        </div><!--card-->

      </div><!--preventive-care--right-->

    </div><!--preventive-care--grid-->

    <div class="buttons mt-sm">

      <div class="form__group btn-left">
        <button v-show="step!==1" @click.prevent="decrementStep" type="button" class="btn btn--default">
          <i class="fa fa-angle-left"></i> Back
        </button>
      </div>

      <div class="form__group btn-right">

        <button v-show="!this.finalStep" @click.prevent="incrementStepAndSendReq" type="button" class="btn btn--primary">
          Next <i class="fa fa-angle-right"></i>
        </button>
      </div>

    </div>

  </main>

</template>

<script>

import {mapGetters, mapActions} from 'vuex';

//components

import ageGender from '@/components/preventive_care/ageGender.vue'
import services from '@/components/preventive_care/services.vue'
import excludes from '@/components/preventive_care/excludes.vue'
import questions from '@/components/preventive_care/questions.vue'
import frequencies from '@/components/preventive_care/frequencies.vue'
import treatments from '@/components/preventive_care/treatments.vue'

export default {

  head() {
    return {title:`Save a life - ${process.env.appName}`}
  },

  components: {
    ageGender,
    services,
    excludes,
    questions,
    frequencies,
    treatments
  },

  computed: {

    ...mapGetters('preventiveCare', {
      step1                    : 'step1',
      step                     : 'step',
      loading                  : 'loading',
      availedServices          : 'availedServices',
      selectedAvailedServices  : 'selectedAvailedServices',
      frequencies              : 'frequencies',
      selectedServices         : 'selectedServices',
      step3Type                : 'step3Type',
      finalStep                : 'finalStep'
    })

  },

  methods: {

    ...mapActions('preventiveCare', {

      getServices                   : 'getServices',
      incrementStep                 : 'incrementStep',
      decrementStep                 : 'decrementStep',
      setLoading                    : 'setLoading',
      getQuestions                  : 'getQuestions',
      getAvailedServices            : 'getAvailedServices',
      setSelectedServices           : 'setSelectedServices',
      addAvailedSelectedServices    : 'addAvailedSelectedServices',
      removeAvailedSelectedServices : 'removeAvailedSelectedServices',
      getFrequencies                : 'getFrequencies',
      sendExcludes                  : 'sendExcludes',
      subtractFrequencies           : 'subtractFrequencies',
      setFinal                      : 'setFinal',
      resetAvailedServices          : 'resetAvailedServices'
    }),

    formattedTerm(term) {
      return term.charAt(0).toUpperCase() + term.slice(1);
    },

    incrementStepAndSendReq() {

      this.incrementStep();

      this.setLoading(true);

      if(this.step == 2) {

        this.getServices()
        .then(() => {
          this.setLoading(false);
        });

      }

      if(this.step == 3) {
        //this step will fetch questions or excludes
        this.getQuestions()
        .then(() => {
          this.setLoading(false);
        });

      }

      if(this.step == 4) {

        //based on response in step 3
        if(this.step3Type == 'questions') {
          //availed services will be shown and no request is being sent because we already have services saved
          this.setLoading(false);

        }

        if(this.step3Type == 'excludes') {
          //subtract services based on exludes and show questions
          this.sendExcludes()
          .then(() => {
            this.setLoading(false);
          });

        }

      }

      if(this.step == 5) {

        if(this.step3Type == 'questions') {

          //if availed services are selected
          if(this.selectedAvailedServices.length > 0) {

            this.getFrequencies()
            .then(() => {
              this.setLoading(false);
            });

          }
          //if availed services are empty
          else {
            //force increment the step
            this.incrementStep();
            this.subtractFrequencies()
            .then(() => {
              this.setLoading(false);
              this.setFinal(true);
            });

          }

        }
        else {
          //availed services will be shown
          this.setLoading(false);
        }

      }

      if(this.step == 6) {

        if(this.step3Type == 'excludes') {

          if(this.selectedAvailedServices.length > 0) {
            this.getFrequencies()
            .then(() => {
              this.setLoading(false);
            });
          }

          else {
            this.subtractFrequencies()
            .then(() => {
              this.setLoading(false);
              this.setFinal(true);
            });

          }

        }

        else if(this.step3Type == 'questions') {

          this.subtractFrequencies()
          .then(() => {
            this.setLoading(false);
            this.setFinal(true);
          });

        }

      }

      if(this.step == 7) {

        this.subtractFrequencies()
        .then(() => {
          this.setLoading(false);
          this.setFinal(true);
        });

      }

    },

    addOrRemoveAvailedService(event, service) {

      if(event.target.checked) {

        if(service == null) {

          //uncheck the services which are checked
          let selectedServices = [];
          for(var i = 0; i < this.selectedServices.length; i++) {
            let service = this.selectedServices[i];
            service.checked = false;
            selectedServices.push(service);
          }

          this.setSelectedServices(selectedServices);
          this.resetAvailedServices();

        }

        else {
          //if checkbox other than none is checked uncheck none
          var checkbox = document.getElementById('none').checked = false;
           //uncheck the services which are checked
          let selectedServices = [];

          for(var i = 0; i < this.selectedServices.length; i++) {

            let thisService = this.selectedServices[i];

            if(service.id == thisService.id) {
              thisService.checked = true;
            }

            selectedServices.push(thisService);

          }

          this.setSelectedServices(selectedServices);//setting excludes
          this.addAvailedSelectedServices(service);

        }

      }

      else {

        if(service == null) {
          //uncheck the services which are checked
          return;
        }

        //the service which is unchecked make that unchecked and set selected services
        let selectedServices = [];
        for(var i = 0; i < this.selectedServices.length; i++) {

          let thisService = this.selectedServices[i];

          if(service.id == thisService.id) {
            thisService.checked = false;
          }

          selectedServices.push(thisService);

        }

        this.setSelectedServices(selectedServices);
        this.removeAvailedSelectedServices(service);

      }

    }

  }//methods

}//export default


</script>

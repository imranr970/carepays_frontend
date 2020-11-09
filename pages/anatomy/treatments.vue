<template>

    <div class="anatomy anatomy--symptoms">

        <div class="mb-sm">

          <nuxt-link to="/anatomy" class="btn btn--light less-shadow text--dark">
            Start over
          </nuxt-link>

        </div>

        <form action="" method="post">

          <div class="anatomy--symptoms__row">

            <div class="anatomy--symptoms__row--col1">

              <div class="card">

                <div class="card__header">
                  Click to change body part
                </div>

                <div class="card__body models-div">

                  <male  v-show="patientInfo.gender == 1" @fillPart="fillPart($event)"></male>
                  <female v-show="patientInfo.gender == 2"  @fillPart="fillPart($event)"></female>

                   <!-- ---------refinedParts------ -->

                  <div class="refined" v-if="openParts">
                    <refinedParts @closeParts="closeRefineParts" @changePart="partIsChanged($event)" :part="patientInfo.part"/>
                  </div>

                  <!-- open refined parts button -->

                  <div class="refined-action-button pointer" @click="openParts = true" v-show="!openParts">
                    <a href="javascript:void(0)">
                      Refine parts in {{patientInfo.part}}
                    </a>
                  </div>

                </div><!--card__body-->

              </div><!--card-->

            </div><!--anatomy--symptoms__row--col1-->

            <div class="anatomy--symptoms__row--col2">

              <div class="card">

                <div class="card__header">
                  Select type of service
                </div>

                <div class="card__body p-0">

                  <ul class="anatomy-list">
                    <categories @changed="fetchDefaultTreatments" />
                  </ul>

                </div>

              </div>


            </div>

            <div class="anatomy--symptoms__row--col3">

              <div class="card">

                <div class="card__header">

                  <div v-if="searched_keyword == ''" class="d--inline">

                    Found Treatments in

                    <strong>{{patientBodyPart}}</strong>

                    <strong>
                      <span v-if="patientInfo.subpart" class="d--inline">
                        --
                        {{patientInfo.subpart}}
                      </span>
                    </strong>

                    <span class="badge badge-danger">
                      {{this.unique_treatments.length}}
                    </span>

                  </div>

                  <div v-else class="d--inline">
                    Searched Symptoms in
                    <strong>{{searched_keyword}}</strong>
                  </div>

                </div>

                <div class="p-0 card__body">

                  <template v-if="loading">
                    <span class="fas fa-spinner fa-spin text--center p-2"></span>
                  </template>

                  <template v-else>
                    <ul class="anatomy-list" v-if="unique_treatments.length">

                      <li class="px-sm pt-xs" :key="index" v-for="(treatment, index) in unique_treatments">

                        <input type="radio" name="treatment" :id="treatment.id"  @change="setTreatment(treatment)">
                        <label :for="treatment.id">
                          {{treatment.children.name}}
                          <span class="radio-button"></span>
                        </label>

                      </li>

                    </ul>
                  </template>

                </div><!--card__body-->

              </div><!--card-->

            </div><!--anatomy--symptoms__row--col3-->

          </div><!--row-->


          <div class="form__group right">
            <button type="button" class="btn btn--primary px-md" @click.prevent="findTreatmentAndSetCodes">
              Next
            </button>
          </div>

        </form>

    </div><!--root-div-->

</template>

<script>

    import male from '@/components/anatomy/male';
    import female from '@/components/anatomy/female';
    import categories from '@/components/anatomy/categories';
    import refinedParts from '@/components/anatomy/refinedParts';

    import {mapGetters, mapActions} from 'vuex';

    export default {

      //registering components used in this component

      components: {
        male,
        female,
        categories,
        refinedParts
      },

      data() {
        return {
          warning_data:{},
          opened:false,
          loading:false,
          openParts:true,
          inner_part:''
        };
      },

      head() {
        return {
          title: `Anatomy Treatments - ${process.env.appName}`
        };
      },

      computed: {

        ...mapGetters('anatomy', {

          treatments:'treatments',
          selected_symptoms:'selectedSymptoms',
          patientInfo:'patientInfo',
          questions:'questions',
          searched_symptom:'searched_symptom',
          treatment : 'treatment'

        }),

        searched_keyword: {
          set(key) {
            this.setSearchKeyword(key);
          },
          get() {
            return this.searched_symptom;
          }
        },

        patientBodyPart() {

          if(this.patientInfo.hasOwnProperty('part')) {
            return this.patientInfo.part.charAt(0).toUpperCase() + this.patientInfo.part.slice(1);
          }

        },

        max_threshold() {
          if(this.selected_symptoms.length == 10) {
            return true;
          }
          return false;
        },

        unique_treatments() {

          let treatments = [];

          this.treatments.forEach((treatment) => {

            let exists = treatments.some(term => term.children.name == treatment.children.name);

            if(!exists) {
              treatments.push(treatment);
            }

          });

          return treatments;

        }

      },

      methods: {

        ...mapActions('anatomy', {

          getTreatments               : 'getTreatments',
          setTreatment                : 'setTreatment',
          findTreatmentAndSetCodes    : 'findTreatmentAndSetCodes',
          fillSymptoms                : 'pushSypmtom',
          FILL_SYMPTOMS_ACTION        : 'FILL_SYMPTOMS_ACTION',
          removeSelectedSymptoms      : 'removeSelectedSymptoms',
          removeFromSelectedQuestions : 'removeFromSelectedQuestions',
          addToSelectedSymptom        : 'addToSelectedSymptom',
          removeSymptom               : 'removeSymptom',
          emptySelectedSymptoms       : 'emptySelectedSymptoms',
          editInfo                    : 'editInfo',
          getSymptomsFromSubParts     : 'getSymptomsFromSubParts',
          fillQuestions               : 'fillQuestions',
          current_symptom_questions   : 'current_symptom_questions',
          selectQuestions             : 'SELECT_QUESTIONS',
          reset                       : 'reset',
          searchSymptoms              : 'searchSymptoms',
          setSearchKeyword            : 'setSearchKeyword'

        }),

        //selectPartView() {
        //     if(this.patientInfo.view == 'B' && this.patientInfo.gender == 1) {
        //         $('.frt_base').hide().animate({'opacity':'0'}, 1000);
        //         $('.bck_base').show().animate({'opacity':'1'}, 1000);
        //     }
        //     else if(this.patientInfo.view == 'F' && this.patientInfo.gender == 1) {
        //         $('.bck_base').hide().animate({'opacity':'0'}, 1000);
        //         $('.frt_base').show().animate({'opacity':'1'}, 1000);
        //     }
        //     else if(this.patientInfo.view == 'F' && this.patientInfo.gender == 2) {
        //         $('.bck_base_female').hide().animate({'opacity':'0'}, 1000);
        //         $('.frt_base_female').show().animate({'opacity':'1'}, 1000);
        //     }
        //     else if(this.patientInfo.view == 'B' && this.patientInfo.gender == 2) {
        //         $('.bck_base_female').show().animate({'opacity':'0'}, 1000);
        //         $('.frt_base_female').hide().animate({'opacity':'1'}, 1000);
        //     }
        // },

          partIsChanged(info) {

            let id = info.value;
            let inner_part = info.id;

            //if not sure is select in refined parts
            if(id == 0) {
              this.editInfo({type:'subpart', subpart:''});
              this.fetchTreatments();
              return;
            }

            this.editInfo({type:'subpart', subpart:inner_part});
            this.fetchTreatments();

          },

          closeRefineParts() {
            this.openParts = false;
          },

          isEmpty(obj, key) {
            if(obj.hasOwnProperty(key)) {
              return false;
            }
            return true;
          },

          fetchTreatments() {

            this.loading = true;

            this.getTreatments()
            .then(()=> {
              this.loading = false;

            })
            .catch(e => this.loading = false);

          },

          fillPart(partInfo) {

            //filling part and part view from the original [male|female].vue

            let part = partInfo.id;
            let view = partInfo.view;
            this.editInfo({type:'part', part});
            this.editInfo({type:'subpart', subpart:''})

            this.fetchTreatments();

          },

          openPopup(symptom, index) {

            //checking if symptom has warning then open the warning modal
            if(symptom.warning_text) {
              this.showWarning(symptom);
            }

            //checking if symptom has questions then open the modal of questions & answers
            if(symptom.has_questions) {

              this.opened = true;
              this.loading = true;

              this.selectQuestions(symptom)
              .then(() => {

                //set loader to false
                this.loading = false;

              });

              this.loading = false;

            }

            //checking if threshold of max symptoms selcetion reached
            if(!this.max_threshold)
            {
              //add current index in sypmtom object
              if(!symptom.hasOwnProperty('index')) {
                symptom = Object.assign({}, symptom, {index:index});
              }

              //fill symptoms which are selected
              this.addToSelectedSymptom(symptom);

              //remove symptom from original symptoms data
              this.removeSymptom(symptom.index);

            }

          },

          hidePopup(event) {
            this.opened = false;
          },

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

          redirectIfEmpty() {
            if(this.patientInfo.part == '' || this.patientInfo.age == '' || this.patientInfo.gender=='') {
              this.$router.push({path:'/anatomy'});
            }
          },

          fetchDefaultTreatments() {
            this.editInfo({type:'subpart', subpart:''});
            this.loading = true;
            this.getTreatments()
            .then(res => this.loading = false)
            .catch(e => this.loading = false);
          }

      },

      created() {
        this.redirectIfEmpty();
        this.fetchDefaultTreatments();
        this.editInfo({type:'subpart', subpart:''});
        //this.selectPartView();
      },

    }//export default
</script>

<style type="text/css">

    .right {
      display: flex;
      justify-content: flex-end;
      margin-top:-1.5rem;
    }
    .models-div {
        position: relative;
    }
    .refined {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100% !important;
    }
    .refined-action-button {
        position:absolute;
        top:20px;
        right:10px;
    }
    .pointer-none {
        pointer-events:none;
        background: #f7f7f7 !important;
    }
	.symptoms {
		position:relative;
	}
	.symptoms-body {
		height:450px;
		overflow:auto;
		width:100%;
	}
    .selected_symptoms{
        height:450px;
        overflow:auto;
        width:100%;
    }
    #organswrapper {
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    max-width: 1920px;
    margin: 0 auto;
    padding: 0 0;
    background-color: transparent;
    min-width: 220px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: default;
}
#organswrapper svg {
    max-height: 100%;
    width: 100%;
    margin: 0;
}
.go_bck, .go_frt, .go_bck_female, .go_frt_female{
    fill: #72B8FC;
    opacity: 0.7;
    -webkit-transition: fill 0.1s ease;
    -moz-transition: fill 0.1s ease;
    -o-transition: fill 0.1s ease;
    transition: fill 0.1s ease;
    cursor: pointer;
}
.go_bck:hover, .go_frt:hover{
    opacity: 1;
}
.organs-tip {
    font: 14px/16px Trebuchet MS, Helvetica, Arial, sans-serif;
    display: none;
    padding: 5px;
    border: 1px solid #404040;
    color: #404040;
    z-index: 1000;
    float: left;
    position: absolute;
    background: rgba(265, 265, 265, 0.9);
    word-break: keep-all;
    box-shadow:1px 2px 4px rgba(0, 0, 0, 0.5);
    -moz-box-shadow:1px 2px 4px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow:1px 2px 4px rgba(0, 0, 0, 0.5);
}
.organs-tip p {
    margin: 0!important;
    color: #404040!important;
}
.organs-tip img {
    float: left;
    padding: 3px;
}
@media screen and (max-width: 320px){
    #organswrapper svg {
        height:260px;
    }
    .organs-tip {
        max-width: 40%;
    }
    .organs-tip img {
        max-width: 95%;
    }
}
@media screen and (max-width: 400px) and (min-width: 321px) {
    #organswrapper svg {
        height:300px;
    }
}
@media screen and (max-width: 480px) and (min-width: 401px) {
    #organswrapper svg {
        height:360px;
    }
}
@media screen and (max-width: 568px) and (min-width: 481px) {
    #organswrapper svg {
        height:440px;
    }
}
@media screen and (max-width: 685px) and (min-width: 569px) {
    #organswrapper svg {
        height:530px;
    }
}
@media screen and (max-width: 767px) and (min-width: 686px) {
    #organswrapper svg {
        height:640px;
    }
}
@media screen and (min-width: 768px) {
    #organswrapper svg {
        height:720px;
    }
}

</style>

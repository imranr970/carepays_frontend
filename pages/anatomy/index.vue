<template>

  <div class="anatomy">

    <h3 class="heading-3 mb-md">Anatomy</h3>


    <form action="" method="post" @submit.prevent="submit">

      <div class="anatomy__row">

        <div class="anatomy__row-col1 position--relative">

          <male v-if="info.gender == '1'"  @fillPart="fillPart($event)">
          </male>

          <female v-if="info.gender == '2'"  @fillPart="fillPart($event)">
          </female>

          <div class="helping-popup">
            Click on the body parts to select
            <i class="fas fa-times fa-circle" @click.prevent="hideBaloon($event.target)"></i>
          </div>

        </div>

        <div class="anatomy__row-col2 form">

          <div class="form__group my-xs">
            <label for="gender" class="form__label">Gender</label>

            <div class="position--relative">

              <select id="gender" class="form__input-control form__input-control--sm" name="gender" v-model="gender">
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>

            </div>
          </div>

          <div class="form__group my-xs">

            <label for="age" class="form__label">Age</label>

            <div class="position--relative">
              <input type="text" id="age" class="form__input-control form__input-control--sm" name="age" v-model="age" placeholder="Please enter your age">
            </div>

          </div>

          <div class="form-group mt-sm">

            <span class="position--relative">
              <input type="submit" class="btn btn--primary btn--lg px-md" value="Treatments">
              <div class="helping-popup helping-popup--treatments">
                Click to fetch treatments
                <i class="fas fa-times fa-circle" @click.prevent="hideBaloon($event.target)"></i>
              </div>
            </span>

            <span class="position--relative">
              <input type="button" class="btn btn--primary btn--lg px-md" value="Symptoms" @click.prevent="$router.push({path:'/anatomy/symptoms'});">
              <div class="helping-popup helping-popup--symptoms">
                Click to fetch symptoms
                <i class="fas fa-times fa-circle" @click.prevent="hideBaloon($event.target)"></i>
              </div>
            </span>

          </div>

        </div>

      </div>

    </form>

  </div>

</template>

<script>

  import male from '@/components/anatomy/male';
  import female from '@/components/anatomy/female';
  import popover from '@/components/utilities/helping_popover'
  import axios from 'axios';

  import {mapActions, mapGetters} from 'vuex';

  export default {

    head() {
      return {
        title: `Anatomy - ${process.env.appName}`
      };
    },

    //registering components use in this component
    components: {
      male,
      female,
      popover
    },

    computed: {

      ...mapGetters('anatomy', {
        ages:'ages',
        info:'patientInfo'
      }),

      age: {

        set(age) {
          this.editInfo({type:'age', age});
        },

        get() {
          return this.info.age;
        }

      },

      gender: {

        set(gender) {
          this.editInfo({type:'gender', gender});
        },

        get() {
          return this.info.gender;
        }

      },

      part: {

        set(part) {
          this.editInfo({type:'part', part});
        },

        get() {
          return this.info.part;
        }

      },

      view: {

        set(view) {
          this.editInfo({type:'view', view});
        },

        get() {
          return this.info.view;
        }

      }

    },

    mounted() {
      this.authGender();
      this.authAge();
      this.authAddress();
    },

    methods: {

      ...mapActions('anatomy', {

        getAges         : 'getAges',
        fillPatientInfo : 'fillPatientInfo',
        editInfo        : 'editInfo'

      }),

      submit() {
        //this.$router.push({path:'/anatomy/symptoms'});
        this.$router.push({path:'/anatomy/treatments'});
      },

      fillPart(part) {
        //filling part and part view from the original male or female[.vue]
        this.part = part.id;
        this.view = part.view;
      },

      authAge() {
        if(this.authenticated) {
          let dob = this.user.dob;
          let date = new Date;
          let userYear = dob.split('-');
          date = date.getFullYear();
          userYear = userYear[0];
          let age = parseInt(date) - parseInt(userYear);
          this.editInfo({type:'age', age});
        }
        return null;
      },

      authGender() {
        if(this.authenticated) {
          let gender = this.user.gender
          this.editInfo({type:'gender', gender});
        }
      },

      authAddress() {
        if(this.authenticated) {
          let address = this.user.address
          this.editInfo({type:'location', address});
        }
      }

    }

  }

</script>


<style lang="scss" scoped>

  .helping-popup {
    position: absolute;
    top:-10%;
    left:0;
    z-index:1000;
    background:#2271d9;
    color:#fff;
    display:inline-block;
    width:100%;
    text-align:center;
    padding:1.5rem 2rem;
    transition: all .2s;
    font-family: inherit;
    font-size:1.4rem;
    &::after {
      content:"";
      position:absolute;
      top:120%;
      left:50%;
      border-left:10px solid transparent;
      border-bottom:12px solid transparent;
      border-right:10px solid transparent;
      border-top:12px solid #2271d9;
      transform:translate(-50%, -50%);
      display:none;
    }
    i {
      position:absolute;
      top:6%;
      right:2%;
      cursor:pointer;
      &:hover {
        opacity: .8;
      }
    }

    &--treatments {
      background:#2271d9;
      left:0;
      top:110%;
      width:120%;
      transform:translateY(50%);
      &::after {
        display:inline-block;
        top:-18%;
        left:50%;
        border-top:12px solid transparent;
        border-bottom:12px solid #2271d9;
      }
      i {
        right:4%;
      }
    }

    &--symptoms {
      background:#2271d9;
      left:110%;
      top:20%;
      width:120%;
      transform:translateY(-50%);
      &::after {
        display:inline-block;
        top:50%;
        left:-6%;
        border-right:12px solid #2271d9;
        border-bottom:12px solid transparent;
        border-left:10px solid transparent;
        border-top:12px solid transparent;
      }
      i {
        right:4%;
      }
    }
  }

  #organswrapper {
    position:relative;
    top:-10rem;
    left:0;
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    margin: 0 0;
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

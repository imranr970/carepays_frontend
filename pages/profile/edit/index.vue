<template>
  <main class="user-profile">

    <profileSidebar />

    <div class="main">
      <h4 class="heading-4 mb-sm">User Profile</h4>

      <div class="card">

        <div class="card__body">

          <form class="form-editable form" @keydown="removeError($event.target.name)" @change="removeError($event.target.name)">

            <div class="form__group">

              <label :class="{'text-danger':errors.first_name}" for="" class="form__label">First name</label>

              <input type="text" class="form__input-control" :class="{'has-error':errors.first_name}" placeholder = "Enter first name" v-model="first_name" name="first_name">

              <span class="error-message" v-if="errors.first_name">
                {{errors.first_name[0]}}
              </span>

            </div>

            <div class="form__group">
              <label for="" :class="{'text-danger':errors.middle_name}" class="form__label">Middle name</label>
              <input type="text" class="form__input-control" :class="{'has-error':errors.middle_name}" placeholder = "Enter middle name" v-model="middle_name" name="middle_name">

              <span class="error-message" v-if="errors.middle_name">
                {{errors.middle_name[0]}}
              </span>

            </div>

            <div class="form__group">
              <label for="" :class="{'text-danger':errors.last_name}" class="form__label">Last name</label>

              <input type="text" class="form__input-control" :class="{'has-error':errors.last_name}" placeholder = "Enter last name" v-model="last_name" name="last_name">

              <span class="error-message" v-if="errors.last_name">
                {{errors.last_name[0]}}
              </span>

            </div>

            <div class="form__group">

              <label for="" :class="{'text-danger':errors.gender}" class="form__label">Gender</label>
              <select v-model="gender" name="gender" class="form__input-control" :class="{'has-error':errors.gender}">
                <option value="0">Please select</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>

              <span class="error-message" v-if="errors.gender">
                {{errors.gender[0]}}
              </span>

            </div>

            <div class="form__group">

              <label for="" :class="{'text-danger':errors.phone}" class="form__label">
                Contact Number
              </label>

              <input type ="text" name="phone" class="form__input-control" :class="{'has-error':errors.phone}" placeholder="contact number" v-model="phone">

              <span class="error-message" v-if="errors.phone">
                {{errors.phone[0]}}
              </span>

            </div>

            <div class="form__group">

              <label for="" :class="{'text-danger':errors.alt_phone}" class="form__label">Alt. contact number</label>

              <input type ="text" name="alt_phone" class="form__input-control" :class="{'has-error':errors.alt_phone}" placeholder="Enter alternate contact number" v-model="alt_phone">

              <span class="error-message" v-if="errors.alt_phone">
                {{errors.alt_phone[0]}}
              </span>

            </div>

            <div class="form__group">

              <label for="" :class="{'text-danger':errors.day || errors.month || errors.year}" class="form__label">Birthday</label>

              <div class="flex">

                <div>
                  <select name="day" class="form__input-control flex-1" v-model="day" :class="{'has-error':errors.day}">
                    <option value="0">Day</option>
                    <option v-for="(day, index) in 31" :key="index" :value="index+1">{{day}}</option>
                  </select>
                </div>

                <div>
                  <select name="month" class="form__input-control flex-2" v-model="month" :class="{'has-error':errors.month}">
                    <option value="0">Month</option>
                    <option v-for="(month, index) in months" :value="index+1" :key="index">{{month}}</option>
                  </select>
                </div>

                <div>
                  <select name="year" class="form__input-control flex-1" v-model="year" :class="{'has-error':errors.year}">
                    <option value="0">Year</option>
                    <option v-for="(year, index) in years" :key="index" :value="year">
                      {{year}}
                    </option>
                  </select>
                </div>

              </div>

            </div>

            <div class="form__group">

              <label for="" class="form__label">Language</label>

              <select name="language" class="form__input-control" :class="{'has-error':errors.language}" v-model="language">
                  <option value="0">Please select language</option>
                  <option :value="lang.id" v-for="lang in languages" :key="lang.id">{{lang.name}}</option>
              </select>

              <span class="error-message" v-if="errors.language">
                {{errors.language[0]}}
              </span>

            </div>

          </form><!--form-->

            <!-- <div class="my-md" id="profileEmergencyQuestions">
                <a href="#" class="link">Emergency questions
                  <i class="fas fa-plus-circle fa-fw"></i>
                </a>
            </div> -->

            <!-- <div class="form" id="profileEmergencyQuestionsForm">
                <div class="form__group">
                    <label for="" class="form__label">First name</label>
                    <input name="emergency_first_name" type="text" class="form__input-control" placeholder = "Enter first name">
                </div>

                <div class="form__group">
                    <label for="" class="form__label">Middle name</label>
                    <input name="emergency_middle_name" type="text" class="form__input-control" placeholder = "Enter middle name">
                </div>

                <div class="form__group">
                    <label for="" class="form__label">Last name</label>
                    <input name="emergency_last_name" type="text" class="form__input-control" placeholder = "Enter last name">
                </div>

                <div class="form__group">
                    <label for="" class="form__label">Gender</label>
                    <select name="emergency_gender" class="form__input-control">
                        <option value="0">Please select</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                    </select>
                </div>

                <div class="form__group">
                    <label for="" class="form__label">Relationship</label>
                    <input type="text" name="emergency_relationship" class="form__input-control" placeholder="Enter relationship status">
                </div>

                <div class="form__group">
                    <label for="" class="form__label">Zip code</label>
                    <input id="zipcode" type="text" name="emergency_zipcode" class="form__input-control" placeholder="Enter zipcode">
                </div>

                <div class="form__group">
                    <label for="" class="form__label">State</label>
                </div>

                <div class="form__group">
                    <label for="" class="form__label">City</label>
                </div>

                <div class="form__group">
                    <label for="" class="form__label">Adress line 1</label>
                    <textarea name="emergency_address1" class="form__input-control"></textarea>
                </div>

                <div class="form__group">
                    <label for="" class="form__label">Adress line 2</label>
                    <textarea name="emergency_address2" class="form__input-control"></textarea>
                </div>

                <div class="form__group">
                    <label for="" class="form__label">Contact Number</label>
                    <input type ="text" name="emergency_contact_number" class="form__input-control" placeholder="contact number">
                </div>

                <div class="form__group">
                    <label for="" class="form__label">Email address</label>
                    <input type ="email" name="emergency_email_address" class="form__input-control" placeholder="Email address">
                </div>

            </div> -->

        </div><!--card__body-->

      </div><!--card-->

      <div class="buttons-group my-sm float--right">
        <button class="btn btn--secondary less-shadow" @click.prevent="update">Save</button>
      </div>
      <span class="clearfix"></span>

    </div>

</main>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import { validateProfileBasics } from '@/plugins/validationForm/profile/validateProfileBasics.js'
import profileSidebar from '@/components/layouts/profile-sidebar'

export default {

  name:'profile',
  middleware:'auth',

  components: {
    profileSidebar
  },

  head: {
    title: `Edit Profile Basic Info - ${process.env.appName}`
  },

  computed: {

    ...mapGetters('auth', {
      profile      : 'profile',
      mandatory    : 'mandatory'
    }),

    ...mapGetters({
      years     : 'years',
      months    : 'months',
      languages : 'languages'
    }),

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

    alt_email: {
      set(key) {
        this.editInfo({param:'alt_email', value:key, section:'profile'});
      },
      get() {
        return this.profile.alt_email;
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

    alt_phone: {
      set(key) {
        this.editInfo({param:'alt_phone', value:key, section:'profile'});
      },
      get() {
        return this.profile.alt_phone;
      }
    },

    gender: {
      set(key) {
        this.editInfo({param:'gender', value:key, section:'profile'});
      },
      get() {
        return this.profile.gender;
      }
    },

    day: {
      set(key) {
        this.editDob({param:'day', value:key, section:'profile'});
      },
      get() {
        return this.profile.dob.day;
      }
    },

    month: {
      set(key) {
        this.editDob({param:'month', value:key, section:'profile'});
      },
      get() {
        return this.profile.dob.month;
      }
    },

    year: {
      set(key) {
        this.editDob({param:'year', value:key, section:'profile'});
      },
      get() {
        return this.profile.dob.year;
      }
    },

    language: {
      set(key) {
        this.editInfo({param:'language', value:key, section:'profile'});
      },
      get() {
        return this.profile.language == null ? '0' : this.profile.language;
      }
    }

  },

  methods: {

    update() {

      if(!validateProfileBasics(this.$store)) {

        this.$toast.error('Please fix errors below').goAway(5000);

        window.scrollTo({
          top:20,
          behavior:'smooth'
        });

      }

      let first_name = this.first_name;
      let middle_name = this.middle_name;
      let last_name = this.last_name;

      if(!Object.entries(this.errors).length > 0) {
        this.updateProfileBasics()
        .then(() => {
          this.updateUserName({first_name, middle_name, last_name});
        })
        .catch(() => {
          window.scrollTo({
            top:20,
            behavior:'smooth'
          });
        });
      }

    },

    ...mapActions('auth', {
      editInfo             : 'editInfo',
      editDob              : 'editDob',
      updateProfileBasics  : 'updateProfileBasics',
      updateUserName       : 'updateUserName'
    }),

    ...mapActions({
      autoFillAuthInfo : 'autoFillAuthInfo',
      removeError      : 'validation/removeError',
      getLanguages     : 'languages'
    })

  },

  created() {
    this.autoFillAuthInfo({section:'profile', module:'auth'});
    this.getLanguages();
  }

}

</script>

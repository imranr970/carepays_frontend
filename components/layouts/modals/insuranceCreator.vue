<template>

  <main class="user-insurance">

    <h4 class="heading-4">Add new insurance</h4>

    <form class="form form-editable" @keydown="removeError($event.target.name)" @change="removeError($event.target.name)">

      <div class="form__group grid-all-cols">

          <label :class="{'text-danger':errors.person}" class="form__label">
            Relationship of patient with person
          </label>

          <select v-model="insurance_person" name="person" class="form__input-control" :class="{'has-error':errors.person}">
              <option value="0">Select</option>
              <option value="self">Self</option>
              <option value="spouse">Spouse</option>
              <option value="parent">Parent</option>
          </select>

          <span class="error-message" v-if="errors.person">
            {{errors.person[0]}}
          </span>

      </div>

      <div class="form__group">

          <label :class="{'text-danger':errors.package}" class="form__label">
            Select Insurance Package
          </label>

          <select name="package" v-model="package" class="form__input-control" :class="{'has-error':errors.package}">
              <option value="0">Select</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="tertiary">Tertiary</option>
          </select>

          <span class="error-message" v-if="errors.package">
            {{errors.package[0]}}
          </span>

      </div>

      <div class="form__group" v-if="insurance_person !== 'self' && insurance_person !== 0">

          <label :class="{'text-danger':errors.financial_guarantor}" class="form__label">Financial guarantor name</label>

          <input type="text" name="financial_guarantor" v-model="financial_guarantor" class="form__input-control" placeholder="Enter person name" :class="{'has-error':errors.financial_guarantor}">

          <span class="error-message" v-if="errors.financial_guarantor">
            {{errors.financial_guarantor[0]}}
          </span>

      </div>

      <div class="form__group position--relative">

        <label :class="{'text-danger':errors.name}" class="form__label">Insurance Name</label>

        <input type="text" name="name" class="form__input-control" placeholder="Enter your insurance name" v-model="name" @keyup="fetchPayerNames" :class="{'has-error':errors.name}" autocomplete="off">

        <suggestionsBox @select="selectSearch($event)"></suggestionsBox>

        <span class="error-message" v-if="errors.name">
          {{errors.name[0]}}
        </span>

      </div>

      <div class="form__group">

          <label :class="{'text-danger':errors.type}" class="form__label">
              Select Type of Insurance
          </label>

          <select v-model="insurance_type" name="type" class="form__input-control" :class="{'has-error':errors.type}">
              <option value="0">Please Select</option>
              <template v-if="insurance_types.length">
                <option v-for="(type, index) in insurance_types" :key="index">
                  {{type}}
                </option>
              </template>
          </select>

          <span class="error-message" v-if="errors.type">
            {{errors.type[0]}}
          </span>

      </div>

      <div class="form__group">

        <label :class="{'text-danger':errors.policy_number}" class="form__label">
            Policy Number (FECA number)
        </label>

        <input type="text" name="policy_number" class="form__input-control" placeholder="Enter insurance policy number" v-model="insurance_policy_number" :class="{'has-error':errors.policy_number}">

        <span class="error-message" v-if="errors.policy_number">
          {{errors.policy_number[0]}}
        </span>

      </div>

      <div class="form__group">

        <label :class="{'text-danger':errors.plan_name}" class="form__label">
            Plan name
        </label>

        <input type="text" name="plan_name" class="form__input-control" placeholder="Enter insurance plan name or program name" v-model="insurance_plan_name" :class="{'has-error':errors.plan_name}">

        <span class="error-message" v-if="errors.plan_name">
          {{errors.plan_name[0]}}
        </span>

      </div>

      <div class="form__group">

        <label :class="{'text-danger':errors.id_or_ssn}" class="form__label">Insured's ID / Insured's SSN </label>

        <input type="text" name="id_or_ssn" class="form__input-control" placeholder="Enter insured's id/ssn" v-model="id_or_ssn" :class="{'has-error':errors.id_or_ssn}">

        <span class="error-message" v-if="errors.id_or_ssn">
          {{errors.id_or_ssn[0]}}
        </span>

      </div>

      <div class="form__group">

        <label class="form__label">Insured's First name</label>

        <input type="text" name="first_name" class="form__input-control" placeholder="Enter First name" v-model="first_name">

      </div>

        <div class="form__group">
          <label for="" class="form__label">Insured's Middle name</label>
          <input type="text" name="middle_name" class="form__input-control" placeholder="Enter middle name initial" v-model="middle_name">
        </div>

        <div class="form__group">
          <label for="" class="form__label">Insured's Last name</label>
          <input type="text" name="last_name" class="form__input-control" placeholder="Enter last name" v-model="last_name">
        </div>

        <div class="form__group">

          <label for="" class="form__label">Insured's title</label>
          <select name="title" :class="{'text-danger':errors.title}"  class="form__input-control" v-model="title">
            <option value="0">Please select</option>
            <option value="mr">Mr.</option>
            <option value="mrs">Mrs.</option>
            <option value="ms">Ms.</option>
          </select>
            <span class="error-message" v-if="errors.title">
            {{errors.title[0]}}
          </span>

        </div>

        <div class="form__group">
          <label for="" class="form__label">Insured's Gender</label>
          <select name="gender" class="form__input-control" v-model="gender">
              <option value="0">Please select</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
          </select>
        </div>

        <div class="form__group">

          <label for="" class="form__label">Insured's Birthdate</label>

          <div class="flex" style="margin-top:-5px;">

              <select name="day" class="form__input-control flex-1" v-model="day">
                  <option value="0">Day</option>
                  <option v-for="(day, index) in 31" :key="index" :value="index+1">{{day}}</option>
              </select>

              <select name="month" class="form__input-control flex-2" v-model="month">
                  <option value="0">Month</option>
                  <option v-for="(month, index) in months" :value="index+1" :key="index">
                    {{month}}
                  </option>
              </select>

              <select name="year" class="form__input-control flex-1" v-model="year">
                  <option value="0">Year</option>
                  <option v-for="(year, index) in years" :key="index" :value="year">
                    {{year}}
                  </option>
              </select>

          </div>

        </div>

        <div class="form__group">
            <label for="" class="form__label">Insured's Address</label>
            <input type="text" name="insurance_address" class="form__input-control" placeholder="House no, street no, city, state" v-model="address">
        </div>

        <div class="form__group">

            <label for="" class="form__label">Insured's State</label>

            <select name="state" class="form__input-control" v-model="state" @change="getCities({namespace:'insurance', change:0})">
                <option value="null">Please select</option>
                <option :value="state.id" v-for="state in states" :key="state.id">
                  {{state.state}}
                </option>
            </select>

        </div>

        <div class="form__group">
            <label for="" class="form__label">Insured's City</label>

            <select name="city" class="form__input-control" v-model="city">
                <option value="null">Please select</option>

                <template v-if="cities.length">
                  <option :value="city.city_id" v-for="city in cities" :key="city.id">
                    {{city.city}}
                  </option>
                </template>

            </select>

        </div>

        <div class="form__group">
            <label for="" class="form__label">Insured's Zipcode</label>
            <input type ="text" name="zipcode" class="form__input-control" placeholder="insrured zipcode" v-model="zipcode">
        </div>

        <div class="form__group">
            <label for="" class="form__label">Insured's Email address</label>
            <input type="text" name="email" class="form__input-control" placeholder="Enter email address" v-model="email">
        </div>

        <div class="form__group">
            <label for="" class="form__label">Insured's phone no</label>
            <input type="text" name="phone" class="form__input-control" placeholder="Enter phone number with area code" v-model="phone">
        </div>

        <div class="form__group">
            <label :class="{'text-danger':errors.service_number}" class="form__label">
                Customer Service number
            </label>
            <input type="text" name="service_number" class="form__input-control" v-model="service_number" :class="{'has-error':errors.service_number}">

            <span class="error-message" v-if="errors.service_number">
              {{errors.service_number[0]}}
            </span>


        </div>

        <div class="form__group">

            <p class="form__label">Are you employeed?</p>

            <label class="switch switch--sm">
              <input type="checkbox" v-model="employeed" name="employeed">
              <span class="slider slider--sm round"></span>
            </label>

        </div>

        <template v-if="employeed">
          <div class="form__group">
              <label class="form__label">
                  May we contact your employer to verify coverage?
              </label>
              <label class="switch switch--sm">
                <input type="checkbox" v-model="contact_for_verification" name="contact_for_verification">
                <span class="slider slider--sm round"></span>
              </label>
          </div>
        </template>

    </form><!--form-->

    <div class="my-md">
      <span class="dashed-border"></span>
    </div>

    <template v-if="employeed && contact_for_verification">
      <form class="form employer-form" >

          <div class="form__group">
              <label for="" class="form__label">Name of Employer</label>
              <input name="name_of_employer" type="text" class="form__input-control" placeholder = "Name of Employer">
          </div>

          <div class="form__group">
              <label for="" class="form__label">HR contact person</label>
              <input name="hr_contact_person" type="text" class="form__input-control" placeholder = "Enter contact person">
          </div>

          <div class="form__group">
              <label for="" class="form__label">HR phone no</label>
              <input name="hr_phone_no" type="text" class="form__input-control" placeholder = "Enter phone no">
          </div>


          <div class="form__group">
              <label for="" class="form__label">Group ID Number</label>
              <input type="text" name="group_id_number" class="form__input-control" placeholder="Enter group id">
          </div>

      </form><!--form-->
    </template>

    <div class="buttons-group my-sm">
      <button class="btn btn--secondary btn--sm mr-xs less-shadow" @click.prevent="save">Save</button>
      <button class="btn btn--default btn--sm ml-xs less-shadow" @click.prevent="cancelCreating">Cancel</button>
    </div>

  </main>

</template>

<script>

import suggestionsBox from '@/components/suggestionsBox';
import axios from 'axios';
import {mapGetters, mapActions} from 'vuex';
import {validate} from '@/plugins/validationForm/validateInsurance';

export default {

  components: {
    suggestionsBox
  },

  middleware:'auth',

  computed: {

    ...mapGetters('insurance', {
      insurance : 'insurance',
      insured   : 'insured'
    }),

    ...mapGetters({
      months : 'months',
      years  : 'years',
      states : 'states',
      cities : 'cities'
    }),

    insurance_person: {
      set(key) {
        this.editInfo({param:'person', value:key, section:'insurance'});
      },
      get() {
        return this.insurance.person;
      }
    },

    package: {
      set(key) {
        this.editInfo({param:'package', value:key, section:'insurance'});
      },
      get() {
        return this.insurance.package;
      }
    },

    name: {
      set(key) {
        this.editInfo({param:'name', value:key, section:'insurance'});
      },
      get() {
        return this.insurance.name;
      }
    },

    financial_guarantor: {
      set(key) {
        this.editInfo({param:'financial_guarantor', value:key, section:'insurance'});
      },
      get() {
        return this.insurance.financial_guarantor;
      }
    },

    insurance_type: {
      set(key) {
        this.editInfo({param:'type', value:key, section:'insurance'});
      },
      get() {
        return this.insurance.type;
      }
    },

    insurance_policy_number: {
      set(key) {
        this.editInfo({param:'policy_number', value:key, section:'insurance'});
      },
      get() {
        return this.insurance.policy_number;
      }
    },

    insurance_plan_name: {
      set(key) {
        this.editInfo({param:'plan_name', value:key, section:'insurance'});
      },
      get() {
        return this.insurance.plan_name;
      }
    },

    ////////////////////insured data///////////////////

    id_or_ssn: {
      set(key) {
        this.editInfo({param:'id_or_ssn', value:key, section:'insured'});
      },
      get() {
        return this.insured.id_or_ssn;
      }
    },

    first_name: {
      set(key) {
        this.editInfo({param:'first_name', value:key, section:'insured'});
      },
      get() {
        return this.insured.first_name;
      }
    },

    middle_name: {
      set(key) {
        this.editInfo({param:'middle_name', value:key, section:'insured'});
      },
      get() {
        return this.insured.middle_name;
      }
    },

    last_name: {
      set(key) {
        this.editInfo({param:'last_name', value:key, section:'insured'});
      },
      get() {
        return this.insured.last_name;
      }
    },

    title: {
      set(key) {
        this.editInfo({param:'title', value:key, section:'insured'});
      },
      get() {
        return this.insured.title;
      }
    },

    day: {
      set(key) {
        this.editDob({param:'day', value:key});
      },
      get() {
        return this.insured.dob.day;
      }
    },

    month: {
      set(key) {
        this.editDob({param:'month', value:key});
      },
      get() {
        return this.insured.dob.month;
      }
    },

    year: {
      set(key) {
        this.editDob({param:'year', value:key});
      },
      get() {
        return this.insured.dob.year;
      }
    },

    address: {
      set(key) {
        this.editInfo({param:'insurance_address', value:key, section:'insured'});
      },
      get() {
        return this.insured.insurance_address;
      }
    },

    state: {
      set(key) {
        this.editInfo({param:'state', value:key, section:'insured'});
      },
      get() {
        return this.insured.state;
      }
    },

    city: {
      set(key) {
        this.editInfo({param:'city', value:key, section:'insured'});
      },
      get() {
        return this.insured.city;
      }
    },

    zipcode: {
      set(key) {
        this.editInfo({param:'zipcode', value:key, section:'insured'});
      },
      get() {
        return this.insured.zipcode;
      }
    },

    email: {
      set(key) {
        this.editInfo({param:'email', value:key, section:'insured'});
      },
      get() {
        return this.insured.email;
      }
    },

    phone: {
      set(key) {
        this.editInfo({param:'phone', value:key, section:'insured'});
      },
      get() {
        return this.insured.phone;
      }
    },

    service_number: {
      set(key) {
        this.editInfo({param:'service_number', value:key, section:'insured'});
      },
      get() {
        return this.insured.service_number;
      }
    },

    employeed: {
      set(key) {
        this.editInfo({param:'employeed', value:key, section:'insured'});
      },
      get() {
        return this.insured.employeed;
      }
    },

    contact_for_verification: {
      set(key) {
        this.editInfo({param:'contact_for_verification', value:key, section:'insured'});
      },
      get() {
        return this.insured.contact_for_verification;
      }
    },

    gender: {
      set(key) {
        this.editInfo({param:'gender', value:key, section:'insured'});
      },
      get() {
        return this.insured.gender;
      }
    },

    insurance_types() {
      var types =  [
        'commercial',
        'medicare',
        'medicade',
        'champus',
        'champva',
        'group health plan',
        'other'
      ];
      return types.map((type) => {
        return type.toUpperCase();
      });
    }

  },

  methods: {

    ...mapActions('insurance', {
      editInfo        : 'editInfo',
      editDob         : 'editDob',
      resetAuthInfo   : 'resetAuthInfo',
      fetchPayerNames : 'fetchPayerNames',
      fetchTypes      : 'fetchTypes',
      addInsurance    : 'addInsurance'
    }),

    ...mapActions({
      autoFillAuthInfo : 'autoFillAuthInfo',
      getStates        : 'getStates',
      getCities        : 'getCities',
      removeError      : 'validation/removeError',
    }),

    cancelCreating() {
      this.$emit('cancel');
    },

    //for insurance_name dropdown
    ...mapActions('index_and_search', {
      emptyResults  : 'emptyResults'
    }),

    save() {

     if(!validate(this.$store)) {

      this.$toast.error('Please fix errors below').goAway(5000);
      return;

     }

     this.addInsurance()
     .then(() => {
       this.$toast.success('Insurance saved successfully').goAway(2000);
       this.cancelCreating();
       this.$emit('created');
     });

    },

    selectSearch($event) {
      let term = $event.term;
      this.editInfo({param:'name', value:term, section:'insurance'});
      this.emptyResults();
    }

  },

  created() {
    this.getStates();
    this.getCities({namespace:'insurance', change:1});
    this.fetchTypes();
    this.autoFillAuthInfo({section:'insured', module:'insurance'});
  }


}
</script>

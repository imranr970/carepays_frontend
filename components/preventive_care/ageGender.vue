<template>

  <div class="form">
    <div class="form__group">

      <label for="for" class="form__label">For</label>

      <select class="form__input-control" id="for" name="for" v-model="forWho">
        <option value="none">Select</option>
        <option value="me">Me</option>
      </select>

    </div>

    <div class="form__group">

      <label for="age" class="form__label">Age</label>

      <input class="form__input-control" type="text" name="age" placeholder="Please specify your age" id="age" v-model="age">

    </div>

    <div class="my-sm">

      <div class="mb-xs">
        <label class="form__label">Gender</label>
      </div>

      <div class="form__group d--inline">
        <input type="radio" name="gender" id="male" value="1" v-model="gender">
        <label for="male">Male
            <span class="radio-button radio-button--green"></span>
        </label>
      </div>

      <div class="form__group d--inline">
        <input type="radio" name="gender" id="female" value="2" v-model="gender">
        <label for="female">Female
            <span class="radio-button radio-button--green"></span>
        </label>
      </div>

    </div>

  </div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {

  computed: {

    ...mapGetters('preventiveCare', {
      step1 : 'step1'
    }),

    age: {

      set(value) {
        this.editInfo({step:1, type:'age', value});
      },

      get() {
        return this.step1.age;
      }

    },

    gender: {

      set(value) {
        this.editInfo({step:1, type:'gender', value});
      },

      get() {
        return this.step1.gender;
      }

    },

    forWho: {

      set(value) {
        this.editInfo({step:1, type:'forWho', value});
      },

      get() {
        return this.step1.forWho;
      }

    }

  },//components

  methods: {

    ...mapActions('preventiveCare', {
      editInfo : 'editInfo'
    }),

    authAge() {
      if(this.authenticated) {
        let dob = this.user.dob;
        let date = new Date;
        date = date.getFullYear();
        let userYear = dob.split('-');
        userYear = userYear[0];
        let age = parseInt(date) - parseInt(userYear);
        this.editInfo({step:1, type:'age', value:age});
      }
      return null;
    },

    authGender() {
      if(this.authenticated) {
        this.editInfo({step:1, type:'gender', value:this.user.gender});
      }
    }

  },

  created() {
    this.authAge();
    this.authGender();
  }

}
</script>

<style>

</style>

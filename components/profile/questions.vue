<template>

  <div class="address-form">

    <p class="paragraph">
      This will help you when you lost your account!
    </p>

    <div class="form__group">

      <label :class="{'text-danger':errors.security_question1}" for="" class="form__label">Security Question 1</label>

      <select @change="removeError('security_question1')"  :class="{'has-error':errors.security_question1}" name="security_question1" class="form__input-control" v-model="security_question1">
        <option value="0">Select question</option>
        <option :value="question" :key="index" v-for="(question, index) in security_questions1">
          {{question}}
        </option>
      </select>

      <span class="error-message" v-if="errors.security_question1">
        {{errors.security_question1[0]}}
      </span>

    </div>


    <div class="form__group">

      <label :class="{'text-danger':errors.security_answer1}" for="" class="form__label">Enter Answer</label>

      <input @keydown="removeError('security_answer1')" placeholder="Enter your answer" type="text" name="security_answer1" class="form__input-control" :class="{'has-error':errors.security_answer1}" v-model="security_answer1">

      <span class="error-message" v-if="errors.security_answer1">
        {{errors.security_answer1[0]}}
      </span>

    </div>

    <div class="form__group">

      <label :class="{'text-danger':errors.security_question2}" for="" class="form__label">Security Question 2</label>

      <select @change="removeError('security_question2')" :class="{'has-error':errors.security_question2}" name="security_question2" class="form__input-control" v-model="security_question2">
        <option value="0">Select question</option>
        <option :value="question" :key="index" v-for="(question, index) in security_questions2">
          {{question}}
        </option>
      </select>

      <span class="error-message" v-if="errors.security_question2">
        {{errors.security_question2[0]}}
      </span>

    </div>


    <div class="form__group">

      <label :class="{'text-danger':errors.security_answer2}" for="" class="form__label">Enter Answer</label>

      <input  @keydown="removeError('security_answer2')" type="text" name="security_answer2" class="form__input-control" :class="{'has-error':errors.security_answer2}" v-model="security_answer2" placeholder="Enter your answer">

      <span class="error-message" v-if="errors.security_answer2">
        {{errors.security_answer2[0]}}
      </span>

    </div>

    <button class="btn btn--secondary btn--sm float--right mt-sm" @click.prevent="changeSecurityQuestions">
      Save
    </button>
    <span class="clearfix"></span>

  </div>

</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {

  computed: {

    ...mapGetters('auth', {
      profile  : 'profile'
    }),

    security_question1: {
      set(key) {
        this.editInfo({param:'security_question1', value:key, section:'profile'});
      },
      get() {
        return this.profile.security_question1;
      }
    },

    security_answer1: {
      set(key) {
        this.editInfo({param:'security_answer1', value:key, section:'profile'});
      },
      get() {
        return this.profile.security_answer1;
      }
    },

    security_question2: {
      set(key) {
        this.editInfo({param:'security_question2', value:key, section:'profile'});
      },
      get() {
        return this.profile.security_question2;
      }
    },

    security_answer2: {
      set(key) {
        this.editInfo({param:'security_answer2', value:key, section:'profile'});
      },
      get() {
        return this.profile.security_answer2;
      }
    },

    security_questions1() {
      return [
        'What was your childhood nickname?',
        'In what city did you meet your spouse/significant other?',
        'What is the name of your favorite childhood friend?',
        'What street did you live on in third grade?',
        'What is your oldest sibling’s birthday month and year? (e.g., January 1900)'
      ];
    },

    security_questions2() {
      return [
        'What is the middle name of your oldest child?',
        'What is your oldest sibling\'s middle name?',
        'What school did you attend for sixth grade?',
        'In what city or town did your mother and father meet?',
        'Where were you when you had your first kiss?'
      ];
    }
  },

  methods: {

    ...mapActions({
      editInfo         : 'auth/editInfo',
      removeError      : 'validation/removeError',
      autoFillAuthInfo : 'autoFillAuthInfo',
      updateUserInfo   : 'auth/updateUserInfo'
    }),

    changeSecurityQuestions() {

      this.$axios.post(`auth/update/security/questions`, {

        security_question1 : this.security_question1,
        security_question2 : this.security_question2,
        security_answer1   : this.security_answer1,
        security_answer2   : this.security_answer2

      })
      .then(({data}) => {

       this.$toast.success(data).goAway(5000);
       this.updateUserInfo({param:'security_question1', value:this.security_question1});
       this.updateUserInfo({param:'security_question2', value:this.security_question2});
       this.updateUserInfo({param:'security_answer1', value:this.security_answer1});
       this.updateUserInfo({param:'security_answer2', value:this.security_answer2});

      });

    }

  },

  created() {
    this.autoFillAuthInfo({section:'profile', module:'auth'});
  }

}
</script>


<template>

  <main>

    <div class="" v-if="questions.length !=0">

      <div v-for="(question, index) in questions" :key="index" class="mb-sm">

        <label class="checkbox__container checkbox__container--block" :for="index">

          {{question}}?
          <input :id="index" type="checkbox" :value="index" @change="addOrRemoveQuestions($event, index, question)">
          <span class="checkmark checkmark--green"></span>

        </label>

      </div>

    </div>

    <div class="skip-link">
      <a href="#" @click="skipStep">Skip this step</a>
    </div>

  </main>

</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {

  computed: {
    ...mapGetters('preventiveCare', {
      questions        : 'questions',
      loading          : 'loading'
    })
  },

  methods: {

    ...mapActions('preventiveCare', {

      addSelectedQuestions          : 'addSelectedQuestions',
      removeSelectedQuestions       : 'removeSelectedQuestions'

    }),

    addOrRemoveQuestions(event, index, question) {

      if(event.target.checked) {
        this.addSelectedQuestions(question);
      }
      else {
        this.removeSelectedQuestions(question);
      }

    },

    skipStep() {
      this.$emit('skip');
    }

  }

}
</script>

<style>

</style>

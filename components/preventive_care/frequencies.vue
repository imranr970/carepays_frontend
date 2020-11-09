<template>

  <main>

    <div class="mb-sm" v-for="(item, index) in frequencies" :key="index">

      <label class="checkbox__container checkbox__container--block" :for="index">

        {{item.frequency}} ({{item.service}})

        <input class="answers-checkbox" :id="index" type="checkbox" :value="item.frequency_id" @change="addOrRemoveAvailedfrequency($event, item)">
        <span class="checkmark checkmark--green"></span>

      </label>

    </div>

  </main>

</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {

  computed: {
    ...mapGetters('preventiveCare', {
      frequencies  : 'frequencies'
    })
  },

  methods: {

    ...mapActions('preventiveCare', {

      addSelectedFrequency          : 'addSelectedFrequency',
      removeSelectedFrequency       : 'removeSelectedFrequency'

    }),

    addOrRemoveAvailedfrequency(event, frequency) {
      if(event.target.checked) {
        this.addSelectedFrequency(frequency);
      }
      else {
        this.removeSelectedFrequency(frequency);
      }
    }

  }

}
</script>

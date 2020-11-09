<template>
  <main>
    <div v-if="treatmentCodes.length!=0">
      <h4 class="heading-4">Treatments found for you!</h4>
      <div v-for="(code, index) in treatmentCodes" :key="index">
        {{code}}
      </div>
    </div>
  </main>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {

  computed: {
    ...mapGetters('preventiveCare', {
      treatmentCodes : 'treatmentCodes'
    })
  }

}
</script>


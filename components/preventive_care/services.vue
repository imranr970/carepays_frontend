<template>

  <main>

    <template v-if="loading == true">
      <i class="fa fa-spinner fa-spin"></i>
    </template>

    <template v-else>

      <div class="mb-sm" v-for="service in services" :key="service.id">
        <label class="checkbox__container checkbox__container--block" :for="service.id">

          {{service.service}}
          <span>
            <i class="fas fa-question-circle" :title="service.definition"></i>
          </span>
          <input class="answers-checkbox" :id="service.id" type="checkbox" :value="service.id" @change="addOrRemoveService($event, service)">
          <span class="checkmark checkmark--green"></span>

        </label>

      </div>

    </template>

  </main>

</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {

  computed: {
    ...mapGetters('preventiveCare', {
      services         : 'services',
      loading          : 'loading'
    })
  },

  methods: {

    ...mapActions('preventiveCare', {

      addSelectedServices           : 'addSelectedServices',
      removeSelectedServices        : 'removeSelectedServices'

    }),

    addOrRemoveService(event, service) {

      if(event.target.checked) {
        this.addSelectedServices(service);
      }
      else {
        this.removeSelectedServices(service);
      }

    }

  }

}
</script>

<style>

</style>

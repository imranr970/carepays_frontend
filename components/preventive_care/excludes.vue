<template>
  <div v-if="excludes.length !=0">

    <div v-for="(exclude, index) in excludes" :key="index" class="mb-sm">

      <label class="checkbox__container checkbox__container--block" :for="index">

        {{exclude.exclude}}
        <input :checked ="exclude.checked" :id="index" type="checkbox" :value="exclude.id" @change="addOrRemoveExcludes($event, index, exclude)">
        <span class="checkmark checkmark--green"></span>

      </label>

    </div>

    <div class="mb-sm">

      <label class="checkbox__container checkbox__container--block" for="noneExclude">

        None of the above
        <input id="noneExclude" checked type="checkbox" value="null" @change="addOrRemoveExcludes($event, 0, null)">
        <span class="checkmark checkmark--green"></span>

      </label>

    </div>

    {{selectedExcludes}}
  </div>

</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {

  computed: {

    ...mapGetters('preventiveCare', {
        step1            : 'step1',
        step             : 'step',
        loading          : 'loading',
        excludes         : 'excludes',
        selectedExcludes : 'selectedExcludes',
        step3Type        : 'step3Type'
    })

  },

  methods: {

    ...mapActions('preventiveCare', {

      addSelectedExcludes           : 'addSelectedExcludes',
      removeSelectedExcludes        : 'removeSelectedExcludes',
      setSelectedExcludes           : 'setSelectedExcludes',
      resetExcludes                 : 'resetExcludes'

    }),

    addOrRemoveExcludes(event, index, exclude) {

      if(event.target.checked) {

        if(exclude == null) {

          //uncheck the services which are checked
          let selectedExcludes = [];
          for(var i = 0; i < this.excludes.length; i++) {
            let thisExclude = this.excludes[i];
            thisExclude.checked = false;
            selectedExcludes.push(thisExclude);
          }

          this.setSelectedExcludes(selectedExcludes);
          this.resetExcludes();

        }
        else {

          //if checkbox other than none is checked uncheck none
          var checkbox = document.getElementById('noneExclude').checked = false;
           //uncheck the services which are checked
          let selectedExcludes = [];

          for(var i = 0; i < this.excludes.length; i++) {

            let thisExclude = this.excludes[i];

            if(exclude.id == thisExclude.id) {
              thisExclude.checked = true;
            }

            selectedExcludes.push(thisExclude);

          }//for
          this.addSelectedExcludes(exclude);
          this.setSelectedExcludes(selectedExcludes);
        }


      }

      else {

        if(exclude != null) {

           //uncheck the services which are checked
          let selectedExcludes = [];

          for(var i = 0; i < this.excludes.length; i++) {

            let thisExclude = this.excludes[i];

            if(exclude.id == thisExclude.id) {
              thisExclude.checked = false;
            }

            selectedExcludes.push(thisExclude);

          }

          this.setSelectedExcludes(selectedExcludes);
          this.removeSelectedExcludes(exclude);
        }
      }

    }

  }

}
</script>

<style>

</style>

<template>

  <div class="main">

    <div class="container" v-if="parts.length">
      
      <div class="my-xs">
        <h4 class="my-2 float-left">Refine Parts</h4>

        <span class="pointer float-right" @click="close">
          <i class="fa fa-times-circle text-danger text--md"></i>
        </span>
      </div>

        <div class="clearfix"></div>

        <ul class="my-2">
            
          <li class="list-style-none" :key="i" v-for="(part, i) in parts">
              <div class="radio">
                  <input @change="changeSymptoms($event)" type="radio" name="optradio" :id="part.part" :value="part.id">
                  <label :for="part.part">
                      {{part.part}}
                      <span class="radio-button"></span>
                  </label>
              </div>
          </li>
          
          <li class="list-style-none">
              <div class="radio">
                  <input @change="changeSymptoms($event)" type="radio" name="optradio" value="0" id="not_sure">
                  <label for="not_sure">
                      Not sure
                      <span class="radio-button"></span>
                  </label>
              </div>
          </li>

        </ul>

    </div><!--container-->

    <div v-if="parts.length == 0 ? close() : ''">
    </div>

  </div><!--main-->

</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    
    name:'refinedParts',
    props:['url', 'part'],

    computed: {

      ...mapGetters('anatomy', {
        parts : 'refinedParts'
      })

    },

    created() {
      let url = this.url;
      let part = this.part;
      this.getParts({url, part});
    },

    methods: {

      ...mapActions('anatomy', [
          'getParts'
        ]
      ),

      close() {
        this.$emit('closeParts');
      },

      changeSymptoms(event) {

        let value = event.target.value;
        let id = event.target.id;

        this.$emit('changePart', {value, id});
      }

    } 
}
</script>

<style scoped lang="scss">
    .main {
      background:white;
      height:100%;
    }
    .list-style-none {
      list-style:none;
    }
</style>

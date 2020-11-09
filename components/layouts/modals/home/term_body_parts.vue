<template>

  <div class="popup" id="term_body_parts">

    <!-- popup__content--center -->
    <div class="popup__content">

      <a href="#" class="popup__close" @click.prevent="close">&times;</a>

      <h4 class="heading-4 small-heading-4 px-sm py-xs">
        Refine your search by telling us body part
      </h4>
      <hr>

      <div class="popup__body">

        <template v-if="step==1">
          <bodyPartsForSearch @increment="incrementStep" />
        </template>

        <template v-if="step==2">

          <div class="form__group" v-if="part.is_bilateral">

            <input id="part_left" type="radio" name="part_sides" value="left" v-model="part_side">

            <label for="part_left">
              Left side
              <span class="radio-button"></span>
            </label>

            <input id="right_side" type="radio" name="part_sides" value="right" v-model="part_side">

            <label for="right_side">
              Right side
              <span class="radio-button"></span>
            </label>


            <input id="both" type="radio" name="part_sides" value="both" v-model="part_side">

            <label for="both">
              Both sides
              <span class="radio-button"></span>
            </label>

          </div>

          <div v-else>
            <i class="fas fa-spinner fa-spin"></i>
            {{redirect()}}
          </div>

          <a v-show="step > 1" href="#" class="link text--sm ml-xs" @click.prevent="step--">Go Back</a>

        </template>


      </div>

      <hr>
      <div class="popup__content--footer px-sm py-xs">
        <button class="btn btn--secondary btn--sm popup__close" @click.prevent="incrementStep">
          Confirm
        </button>

        <a href="#" class="btn btn--default btn--sm" @click.prevent="close">Cancel</a>
      </div>

    </div><!--popup__content-->

  </div><!--popup-->

</template>

<script>

import {mapGetters, mapActions} from 'vuex';
import bodyPartsForSearch from '@/components/layterms/body-parts-for-search-term';

export default {

  components : {
    bodyPartsForSearch,
  },

  data() {
    return {
      step:1,
      part_side:null
    };
  },

  computed: {
    ...mapGetters({
      cptCodes : 'cptCodes',
      search   : 'index_and_search/search',
      codes    : 'index_and_search/codes'
    }),

    part() {
      return this.search.part;
    }

  },

  methods: {

    ...mapActions({
      filterCodeParts : 'index_and_search/filterCodeParts'
    }),

    incrementStep() {
      this.step++;
      if(this.step == 3) {
        this.filterCodeParts();
        this.$router.push({path:'/treatment-layterms'});
      }
    },

    redirect() {
      this.filterCodeParts();
      this.$router.push({path:'treatment-layterms'});
    },

    close() {
      this.$emit('close', 'term_body_parts');
      this.step=1;
    }

  }

}

</script>

<style lang="scss" scoped>

  .small-heading-4 {
    font-size:2rem !important;
    display:block !important;
  }

</style>


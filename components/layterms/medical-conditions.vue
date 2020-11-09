<template>
  <main>

    <h4 class="heading-4 mt-sm">
      Change Your Medical condition (optional)
    </h4>

    <div class="form__group mb-sm">
      
      <select :disabled="!icds.length" name="icds" id="medical_conditions" class="form__input-control form__input-control--sm" v-model="icd">
        <option value="0" id="icd0">Please choose</option>
        <option :id="icd.icd_id" :value="icd.cpt_id" v-for="icd in icds" :key="icd.icd_id" :title="icd.description">
          {{formattedDesc(icd.description, 80)}}
        </option>
      </select>

    </div>

  </main>
</template>

<script>

import {mapGetters} from 'vuex';

export default {

  props: ['cpt'],

  data() {
    return {
      icds: [],
      icd: 0
    }
  },

  watch: {

    icd: function(value) {
      if(value && value != 0 && value != this.cpt.cpt_code) {
        this.$emit('fetch', value);
      }
    }

  },

  computed: {
    ...mapGetters({
      cptCodes: 'cptCodes'
    })
  },

  methods: {

    formattedDesc(desc, given_length = 50) {
      return desc.length > given_length ? desc.substring(0, given_length) + "..." : desc;
    },

    fillIcds() {

      var cpts = this.cptCodes;
      
      if(cpts.length) {

        cpts.forEach((item, index) => {

          if(item.codes.icds) {

            item.codes.icds.forEach((icd, index) => {

              let exists = this.icds.some(oldIcd => oldIcd.icd_id == icd.icd_id)

              if(!exists) this.icds.push(icd)

            })

          }

        })

      }

    }

  },

  created() {
    this.fillIcds();
  }

}
</script>

<style lang="scss" scoped>
.heading-4 {
  font-size:2rem;
  display:block;
}
</style>


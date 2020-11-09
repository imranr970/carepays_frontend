<template>

  <main>

    <h4 class="mb-sm heading-4">Related Treatments</h4>

    <ul class="related-treatments-list" v-if="codeRanges.length">

      <li id="accordion" v-for="(range, index) in codeRanges" :key="index" class="pointer related-treatments-list-item">

        <span :title="range.description" data-toggle="collapse" :data-target="accordionTarget(index, 'target')">
          <small><i class="fas fa-plus-circle open-circle"></i></small>
          {{formattedDesc(range.description, 25)}}
        </span>

        <ul :id="accordionTarget(index, 'id')" class="collapse ml-sm pt-xs">
          <li class="list" :title="code.description" v-for="code in range.codes" :key="code.id">
            <a href="#" class="link" @click.prevent="fetchData(code.code)">
              {{formattedDesc(code.description, 25)}}
            </a>
          </li>
        </ul>

      </li>

    </ul>

    <ul class="related-treatments-list" v-else>

      <li :id="code" v-for="(code) in paginatedCodeTerms" :key="code.code" class="pointer related-treatments-list-item" :class="{'active':activeCpt(code.code)}" @click="fetchData(code.code)">

        <span>{{code.terms.name}} ({{code.code}})</span>
        <div v-if="code.description.lay_summary" :title="code.description.lay_summary">
          <small>{{formattedDesc(code.description.lay_summary, 65)}}</small>
        </div>

        <!-- <div class="popovers">

          <template v-if="loading_wiki">

            <i class="fas fa-spinner fa-spin"></i>

          </template>

          <template v-else>

            <div class="popovers__image" v-if="extract!=null">
              <img :src="extract.image" :alt="extract.title">
            </div>

            <div v-if="extract!=null" class="popovers__body px-xs py-xs">
              <p v-html="extract.extract"></p>
              <span>Reference:</span>
              <a target="_blank" href="https://en.wikipedia.org/wiki/Current_Procedural_Terminology">Wikipedia Current Procedural Terminology</a>
            </div>

          </template>

        </div>-->

      </li>

    </ul>

    <a href="#" class="link my-2" @click.prevent="incrementPaginationCount" v-if="codeTerms.length > paginatedNumber">
      show more
    </a>

  </main>
</template>

<script>

import {mapGetters} from 'vuex';

export default {

  props: ['cpt'],

  data() {
    return {
      codeRanges      : [],
      codeTerms       : [],
      paginatedNumber : 5
    };
  },

  computed: {
    ...mapGetters({
      cptCodes     : 'cptCodes',
      patientInfo  : 'anatomy/patientInfo',
      category     : 'index_and_search/category',
      codes        : 'index_and_search/codes',
      search       : 'index_and_search/search'
    }),

    part() {
      return this.search.part;
    },

    paginatedCodeTerms() {
      if(this.paginatedNumber > this.codeTerms.length) {
        return this.codeTerms
      }
      return this.codeTerms.slice(0, this.paginatedNumber)
    }

  },

  watch: {
    codes() {
      this.fetchRelatedCodes();
    }
  },

  methods: {

    incrementPaginationCount() {
      this.paginatedNumber += 5
    },

    fetchData(code) {
      this.$emit('fetch', code);
    },

    activeCpt(cpt) {
      if(this.cpt.cpt_code == cpt) {
        return true;
      }
      return false;
    },

    formattedDesc(desc, given_length = 50) {
      return desc.length > given_length ? desc.substring(0, given_length) + "..." : desc;
    },

    accordionTarget(index, type) {

      if(type == 'target') {
        return '#collapse'+index;
      }
      else {
        return 'collapse'+index;
      }

    },

    fetchPartRanges() {

      let part = this.patientInfo.part;
      let subpart = this.patientInfo.subpart;
      let category = this.category;

      if(part == '' || part == null) {
        this.fetchRelatedCodes();
        return;
      }

      this.$axios.get('fetchPartRanges', {
        params:{
          part,
          subpart,
          category
        }
      })
      .then(({data}) => {
        this.codeRanges = data;
      });

    },

    fetchRelatedCodes() {

      if(this.codes.length) {

        this.$axios.get('get-code-terms', {
          params: {
            codes : this.codes
          }
        })

        .then(({data}) => {
          this.codeTerms = data;
        });

      }

    },

    fetchWikiDesc(code) {
      this.loading_wiki = true;
      axios.get(`${process.env.api.baseURL}/getTreatmentsExtract`, {
        params: {
          code
        }
      })

      .then(({data}) => {
        this.extract = data[0];
        this.loading_wiki = false;
      })

      .catch((e) => {
        this.loading_wiki = false;
        console.log("e");
      });

    },


  },

  created() {
    this.fetchPartRanges();
  }

}
</script>

<style scoped lang="scss">
.heading-4 {
  font-size:2rem;
  display:block;
}
</style>

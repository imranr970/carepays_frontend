<template>

    <div class="layterms">

      <div class="layterms--grid">

        <div class="layterms__left">

          <div class="form flex">

            <div class="flex-1">
              <medicalConditions :cpt="cpt" @fetch="fetchData($event)" />
            </div>

            <!-- <div class="flex-1">
              <bodyPartsForSearch :codes="codes" />
            </div> -->

          </div>

          <hr>

          <template v-if="loading==true">
            <i class="fa fa-spinner fa-spin"></i>
          </template>

          <template v-if="loading == false && cpt">

            <h4 class="heading-4 heading-4--secondary my-xs mb-sm" v-if="cpt.cpt_code_full_description">
              Treatment:
              <span>
                {{formattedDesc(cpt.cpt_code_full_description, 100)}}
              </span>
            </h4>

            <h4 class="heading-4 heading-4--secondary my-xs" v-if="cpt.cpt_code_full_description">
              Code description
            </h4>

            <p v-html="cpt.cpt_code_full_description"></p>

            <h4 class="heading-4 heading-4--secondary my-xs">
              Treatment description
            </h4>

            <div v-if="cpt.lay_summary">
                <h5 class="heading-5">Lay description</h5>
                <p v-html="cpt.lay_summary"></p>
            </div>

            <div v-if="cpt.terminology">
                <h5 class="heading-5">Terminology</h5>
                <div class="my-xs">
                  <p v-html="cpt.terminology"></p>
                </div>
            </div>

            <!-- <div v-if="cpt.section_notes">
            <h5 class="heading-5">Section notes</h5>
              <div class="my-2">
                <p v-html="cpt.section_notes"></p>
              </div>
            </div> -->

            <div v-if="cpt.additional_info">
              <h5 class="heading-5">Additional info</h5>

              <div class="my-xs">
                  <p v-html="cpt.additional_info"></p>
              </div>
            </div>

            <!-- <div v-if="cpt.coding_tips">

              <h5 class="heading-5">Tips</h5>

              <div class="my-xs">
                <p v-html="cpt.coding_tips"></p>
              </div>

            </div> -->

            <nuxt-link :to="{path:`/shopping_window`, query:{location:$route.query.location, code:cpt.cpt_code}}" class="btn btn--primary my-md">
              Proceed
            </nuxt-link>

            <div title="Virtual scribe" class="virtual-scribe" @click.prevent="openModal('hpi')">
              <span>
                <img class="virtual-scribe__img" src="@/assets/images/svg-icons/nurse.svg" alt="Vitual scribe">
              </span>
            </div>


          </template>

        </div>

        <div class="layterms__right my-sm">
          <relatedTreatments @fetch="fetchData($event)" :cpt="cpt" />
        </div>

        <hpiModal @close="closeModal($event)" />

      </div><!--layterms-grid-->

    </div><!--layterms-->
</template>

<script>

import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
import hpiModal from '@/components/layouts/modals/hpi-modal';
import medicalConditions from '@/components/layterms/medical-conditions';
import relatedTreatments from '@/components/layterms/related-treatments';
import bodyPartsForSearch from '@/components/layterms/body-parts-for-search-term';

export default {

  components: {
    hpiModal,
    bodyPartsForSearch,
    medicalConditions,
    relatedTreatments
  },

  head() {
    return {
      title: `Treatment layterms - ${process.env.appName}`
    };
  },

  data() {
    return {
      extract:null,
      cpt:{},
      loading:false,
      codesCategories:[],
      loading_wiki:false,
      prevRoute:null
    };
  },

  watch: {

    cptCodes: function(value) {
      this.fetchData();
    }

  },

  computed: {

    ...mapGetters({
      cptCodes     : 'cptCodes',
      patientInfo  : 'anatomy/patientInfo',
      category     : 'index_and_search/category',
      codes        : 'index_and_search/codes'
    })
  },

  methods: {

    ...mapActions({
      filterCodeParts  : 'index_and_search/filterCodeParts',
      fillCodes        : 'index_and_search/fillCodes'
    }),

    formattedDesc(desc, given_length = 50) {
      return desc.length > given_length ? desc.substring(0, given_length) + "..." : desc;
    },

    fetchData(cpt = null) {

      if(!this.codes.length) {
        this.$router.push({name:'index'});
      }
      this.loading = true;

      if(cpt == null) {
        cpt = this.highestRankFrequency();
      }

      axios.get(`${process.env.api.baseURL}/anatomy/cpt_layterms`, {
        params:{
          cpt:cpt
        }
      })
      .then(({data}) => {
        this.cpt = data[0] || {};
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
      });
    },

    highestRankFrequency() {

      var cpts = this.cptCodes;

      let highestRankCpt = this.codes[0];
      let highestRankFrequency = 0;

      if(cpts) {

        cpts.forEach((item, index) => {

          let codes = item.codes;
          let frequency = Number(codes.frequency);
          if(frequency > highestRankFrequency) {
            highestRankFrequency = frequency;
            highestRankCpt = codes.code;
          }

        });
      }

      return highestRankCpt;

    },

    openModal(id) {

      try {
        $(`#${id}`).css({
          opacity:'1',
          visibility:'visible'
        });
        $(`#${id} .popup__content`).css({
          opacity:'1',
          transform: 'translate(-50%, -50%) scale(1)',
        });
      }
      catch(e) {
        console.log(e);
      }

    },

    closeModal(id) {

      try {
        $(`#${id}`).css({
          opacity:'0',
          visibility:'hidden'
        });
        $(`#${id} .popup__content`).css({
          opacity:'0',
          transform: 'translate(-50%, -50%) scale(0.5)',
        });
      }
      catch(e) {
        console.log(e);
      }
    }

  },

  created() {
    this.fetchData();
  }

}
</script>

<style scoped lang=scss>

  .heading-4 {
    font-size:2rem;
    display:block;
  }

  .open-circle {
    &:hover {
      color:#323d5e;
    }
  }

  .pointer {
    cursor:pointer;
  }

  .virtual-scribe {
      width:50px;
      height:50px;
      background-image: linear-gradient(purple, #c02bc0);
      border-radius:50%;
      display:block;
      position:fixed;
      bottom:5%;
      right:5%;
      overflow: hidden;
      box-shadow: 1px 3px 5px rgba(0,0,0,0.4);
      transition:all 0.3s;


      &:hover {
          box-shadow:0 6px 10px rgba(0,0,0,0.4);
          cursor:pointer;
      }

      &:active,
      &:focus {
          box-shadow:0 4px 6px rgba(0,0,0,0.4);
          transform:translateY(4px);
      }

      &__img {
          width:70%;
          height:70%;
          position: absolute;
          top:50%;
          left:50%;
          transform:translate(-50%, -50%);
      }
  }

  #numbers {
    display:inline-block;
  }


</style>

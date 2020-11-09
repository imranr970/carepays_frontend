<template>

  <main>

    <template v-if="loader">
      <i class="fas fa-spinner fa-spin"></i>
    </template>

    <template v-else>

      <div v-if="formattedPart.length">

        <span v-for="(part, index) in formattedParts" :key="index" class="span-checkboxes-for-bodyparts">

          <input :checked="shouldBeChecked(part) || index == 0" :id="part.name" type="radio" name="part"  @change="updatePart(part)">

          <label :for="part.name">
            {{formattedPart(part.name)}}
            <span class="radio-button"></span>
          </label>

          <span v-if="part.has_definition" class="definition-markup-box">
            <span class="definition" @mouseover="fetchDefinition(part)" @mouseleave="hideDefintion">?</span>
          </span>

        </span>

        <div class="definition-markup card" ref="definitionMarkup" v-if="currentPart.hasOwnProperty('id')">

          <img class="definition-image" :src="currentPart.thumbnail" :alt="currentPart.name">
          <div class="card__body">
            <span class="definition-text" v-html="formattedDesc(currentPart.definition, 300)"></span>
          </div>

        </div>

      </div>

    </template>

  </main>


</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {

  data() {
    return {
      loading:false,
      currentPart : {},
      showDefinition : false
    };
  },

  computed: {

    ...mapGetters({
      cptCodes : 'cptCodes',
      search   : 'index_and_search/search',
      loader   : 'index_and_search/loading'
    }),

    formattedPart() {

      return function(part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      };

    },

    part: {

      set(key) {
        this.setSearchDetails({type:'part', value:key});
      },

      get() {
        return this.search.part;
      }

    },

    formattedParts() {

      let data = this.cptCodes;

      let parts = [];

      data.forEach((item, index) => {

        if(item.parts) {

          item.parts.forEach((part, index) => {
            let exists = parts.some(bodyPart => bodyPart.name == part.name);
            if(!exists) {
              parts.push(part);
            }
          });

        }

      });

      if(parts.length == 1) {
        this.$emit('increment');
      }

      return parts;
    }

  },

  methods: {

    ...mapActions({
      removeError      : 'validation/removeError',
      setSearchDetails : 'index_and_search/setSearchDetails',
      filterCodeParts  : 'index_and_search/filterCodeParts'
    }),

    shouldBeChecked(partGiven) {
      if(partGiven.id == this.part.id) {
        return true;
      }
      return false;
    },

    updatePart(part) {
      this.part = part;
    },

    changeLayterms() {

      this.loading = true;

      this.filterCodeParts()
      .then(() => this.loading = false)
      .catch(() => this.loading = false);

    },

    fetchDefinition(bodypart) {
      this.showDefinition = true
      this.currentPart = bodypart
    },

    hideDefintion() {
      this.showDefinition = false
      this.currentPart = {}
    }

  }

}

</script>

<style lang="scss" scoped>
  .heading-4 {
    font-size:2rem;
    display:block;
  }
  .span-checkboxes-for-bodyparts {
    margin:2rem 0 0 0 !important;
  }
  .definition {
    font-size:12px;
    border:1px solid #666;
    border-radius:50%;
    display:inline-block;
    width:16px;
    height:16px;
    text-align:center;
    color:#666;
  }

  .definition-markup-box {
    position:relative;
  }

  .definition-markup {
    width:33rem;
    height:auto;
    position:absolute;
    top:0;
    left:100%;
    box-shadow: 0 .2rem .2rem rgba(#ccc, .4);
  }
  .definition-markup img.definition-image {
    width:100%;
    height:200px;
  }
  .definition:hover .definition-markup {
    display:inline-block !important;
  }
</style>

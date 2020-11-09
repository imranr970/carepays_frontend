<template>
  <div class="px-sm pt-xs">

    <div class="form__group" v-for="(searchCategory, index) in searchCategories" :key="index">
      <input :checked="searchCategory.id == category.id" type="radio" name="type_of_service" :id="searchCategory.name"  @change="changeCategory(searchCategory)">
      <label :for="searchCategory.name">
        {{searchCategory.name}}
        <span class="radio-button"></span>
      </label>
    </div>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {

  name:'categories',

  data() {
    return {
      loading:false
    };
  },

  computed: {
    ...mapGetters({
      searchCategory : 'index_and_search/category',
      searchCategories : 'searchCategories'
    }),

    category: {
      set(key) {
        this.setCategory(key);
      },
      get() {
        return this.searchCategory
      }
    }

  },

  methods: {

    ...mapActions({
      setCategory      : 'index_and_search/setCategory',
      fetchCategories  : 'fetchCategories'
    }),

    changeCategory(category) {
      this.category = category;
      this.$emit('changed');
    },

    setDefaultCategory() {
      this.category = this.searchCategories[0];
    }

  },

  created() {
    this.fetchCategories();
    this.setDefaultCategory();
  }

}
</script>


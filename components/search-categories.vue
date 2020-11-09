<template>

  <main class="categories-box"  v-click-outside="hide">

    <nav class="form__categories-box border" v-show="open">

      <ul class="form__categories-lists">

        <li @click.prevent="selectCategory({id:0, name:'Type'})" class="form__categories-item d--block" :class="{'form__categories-item--primary' : category.name == 'Type'}">
          Type
        </li>

        <template v-if="!filteredCategories.length">
          <li @click.prevent="selectCategory(cat)" class="form__categories-item d--block" :class="{'form__categories-item--primary' : cat.name == category.name}" v-for="(cat, index) in categories" :key="index">
            {{cat.name}}
          </li>
        </template>

        <template v-else>
          <li @click.prevent="selectCategory(cat)" class="form__categories-item d--block" :class="{'form__categories-item--primary' : cat.name == category.name}" v-for="(cat, index) in filteredCategories" :key="index">
            {{cat.name}}
          </li>
        </template>

        <li @click.prevent="selectCategory({id:-1, name:'Not sure'})" class="form__categories-item d--block" :class="{'form__categories-item--primary' : category.name == 'Not sure'}">
          Not sure
        </li>

      </ul>

    </nav>

    <div @click.prevent="show" class="selected-category form__input" :class="{'border border__primary':suggestions.length}" v-show="!open">
      <li v-if="category">
        {{category.name.charAt(0).toUpperCase() + category.name.slice(1)}}
      </li>
    </div>

    <div class="helping-popup">
      You can change Type of Service from here
      <i class="fas fa-times fa-circle" @click.prevent="hideBaloon($event.target)"></i>
    </div>

  </main>


</template>

<script>

import {mapGetters, mapActions} from 'vuex';
import ClickOutside from 'vue-click-outside'

export default {

  data() {
    return {
      open:false
    }
  },

  computed : {
    ...mapGetters({
      categories         : 'searchCategories',
      category           : 'index_and_search/search_category',
      suggestions        : 'index_and_search/results',
      filteredCategories : 'index_and_search/filteredCategories'
    }),
  },

  watch: {

    suggestions(data, old_data) {

      if(data.length > 0) {
        let categoriesFromSearch = [];

        data.forEach((record) => {
          if(!categoriesFromSearch.includes(record.category_id)) {
            categoriesFromSearch.push(record.category_id)
          }
        })

        let filteredCategories = this.categories.filter((category) => {
          return categoriesFromSearch.includes(category.id)
        })

        this.setFilteredCategories(filteredCategories)
      }
      else {
        this.setFilteredCategories([])
      }

    }

  },

  methods: {

    ...mapActions({

      setSearchDetails      : 'index_and_search/setSearchDetails',
      setDefaultCategory    : 'index_and_search/setDefaultCategory',
      setFilteredCategories : 'index_and_search/setFilteredCategories',
      fetchCategories       : 'fetchCategories'

    }),

    selectCategory(value) {

      this.hide();

      this.setSearchDetails({type:'category', value});

      //not sure
      if(value.id != -1) {
        this.$emit('change');
      }

    },

    hide() {
      this.open = false
    },

    show() {
      this.open = true
    }

  },

  directives: {
    ClickOutside
  },

  created() {
    this.fetchCategories();
    //this.setDefaultCategory("Surgery");
  }

}
</script>

<style lang="scss" scoped>

  .border {
    border-width:1px !important;
    border-style:solid !important;
    transition: all .2s;
    &__primary {
      border-color:#323d5e !important;
    }
  }

  .helping-popup {
    position: absolute;
    top:130%;
    left:68%;
    z-index:1000;
    background:#2271d9;
    color:#fff;
    display:inline-block;
    width:32%;
    text-align:center;
    padding:1.5rem 2rem;
    transition: all .2s;
    font-family: inherit;
    font-size:1.4rem;
    &::after {
      content:"";
      position:absolute;
      top:-18%;
      left:50%;
      border-left:10px solid transparent;
      border-top:12px solid transparent;
      border-right:10px solid transparent;
      border-bottom:12px solid #2271d9;
      transform:translate(-50%, -50%);
    }
    i {
      position:absolute;
      top:5%;
      right:3%;
      cursor:pointer;
      &:hover {
        opacity: .8;
      }
    }
  }

</style>



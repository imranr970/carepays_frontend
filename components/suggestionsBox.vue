<template>

  <div>

    <div class="form__suggestions-box" v-if="suggestions.length">
      <ul class="form__suggestions-list">

        <li @click="setSelectedTerm(suggestion)" class="form__suggestions-item" v-for="(suggestion, index) in suggestions" :key="index">
          <div v-if="shouldDisplayResults(suggestion)">
            <!-- <span v-if="suggestion.term" v-html="formattedTerm(suggestion.term)">
            </span> -->

            <client-only placeholder="loading...">
              <text-highlight :queries="queries" highlightComponent="span" highlightClass="text--black">{{suggestion.term}}</text-highlight>
            </client-only>

            <div v-if="suggestion.description" :title="suggestion.description">
              <small>{{formattedDesc(suggestion.description)}}</small>
            </div>
          </div>

          <div v-if="search.category == 'diseases'">
            <span v-if="suggestion.term" v-html="formattedTerm(suggestion.term)">
            </span>
          </div>

          <div v-if="search.category=='symptom'">

            <span v-if="suggestion.term" v-html="formattedTerm(suggestion.term)">
            </span>

            <div v-if="suggestion.description">
              <small>{{formattedDesc(suggestion.description)}}</small>
            </div>

          </div>

        </li>
      </ul>
    </div>

  </div><!--main div-->

</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {
  computed: {
    ...mapGetters('index_and_search', {
      suggestions : 'results',
      search : 'search'
    }),
    queries() {
      if(this.search.text != '') {
        return this.search.text.split(' ')
      }
      return []
    }
  },

  methods: {

    ...mapActions({
      fetchCategoriesForSelectedTerm : 'index_and_search/fetchCategoriesForSelectedTerm'
    }),

    fetchAndSend(term) {
      this.$emit('fetch', term);
    },

    formattedTerm(term) {

      var text, loop, start, end, length;

      term = term.toLowerCase();
      text = this.search.text.toLowerCase();

      let textLoop = text.split(' ');

      textLoop.forEach((text, index) => {

        start = term.indexOf(text);
        length = text.length;
        end = parseInt(start) + parseInt(length);

        if(start != -1) {

          let string = term.substring(start, end);
          term = term.replace(string, "<span class='text--black'>" + string + "</span>");

        }

      });

      return term.length > 100 ? term.substring(0, 100) + '...' : term;

    },

    setSelectedTerm(suggestion) {
      this.$emit('select', suggestion);
      this.fetchCategoriesForSelectedTerm(suggestion);
    },

    shouldDisplayResults(suggestion) {
      if(suggestion.term != '' && suggestion.term != null) {
        return true
      }
      return false
    }

  }
}
</script>

<style>
  .text__highlight {
    background:none !important;
  }
</style>

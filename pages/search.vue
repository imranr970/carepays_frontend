<template>

  <div class="search-page">

    <h3 class="heading-3">
      Search Results
    </h3>

    <p class="paragraph mb-sm">
      Showing results for
      <strong>{{$route.query.search}}</strong>
    </p>

    <!-- Modal window -->
    <modal @submit="fetchCptsAndRedirect" />

    <template v-if="results">

        <!-- Showing results for diseases -->

        <template v-if="results.type == 'diseases'">
          <div class="card my-xs" v-for="(result, index) in results.data" :key="index">

            <div class="card__header">

              <strong>
                {{result.term}}
              </strong>

            </div>

            <div class="card__body">

              <template v-if="result.children">

                <div class="children">

                  <ul class="search-list">

                    <li class="search-list__item" v-for="(child, index) in result.children" :key="index" @click="setTerm(child)">

                      <a :class="{'search-list__link--active':queryExactMatch(child)}" class="search-list__link" href="#popup">
                        {{child.term}}
                      </a>

                    </li>

                  </ul>

                </div>

              </template>

            </div><!--card-body-->

          </div><!--card-->
        </template>


        <!-- Showing results for symptom -->
        <template v-if="results.type == 'symptom'">

          <div class="card my-xs py-sm px-sm" v-for="(result, index) in results.data" :key="index">

            <div class="card__body">

              <div class="mb-xs">
                {{result.question}}
              </div>

              <div v-for="(answer, index) in result.answers" :key="index">

                <label class="checkbox__container checkbox__container--block" :for="answer.id">

										{{answer.answer}}

										<input :checked="answer.checked" @change="callToActionForAnswers($event, answer)" class="answers-checkbox" :id="answer.answerId" type="checkbox" :value="answer.answerId">
										<span class="checkmark"></span>

								</label>

              </div>

            </div><!--card-body-->

          </div><!--card-->

          <div class="mt-sm" v-if="results.type == 'symptom'">
            <button class="btn btn--secondary btn--sm" @click="submit">
              Submit
            </button>
          </div>

        </template>

        <!-- Showing results for treatments -->
        <template v-if="results.type == 'treatment'">

          <div class="card my-xs">

            <div class="card__body">

              <ul class="search-list">

                <li class="search-list__item" v-for="(result, index) in results.data" :key="index">

                  <a class="search-list__link" href="#">
                    <i class="fas fa-plus-circle text--green"></i>
                    <strong>{{result.term}}</strong>
                  </a>

                </li>

              </ul>

            </div><!--card-body-->
          </div><!--card-->

        </template>
        <!-- treatments -->

    </template><!--if results are found-->

    <template v-else>
      <p>No record found</p>
    </template>


  </div>
</template>

<script>

import axios from 'axios';
import modal from '@/components/layouts/modal';
import { mapActions, mapGetters } from 'vuex';

export default {

    components: {
      modal
    },

    data() {
      return {
        results: []
      };
    },

    computed: {
    },

    asyncData({query}) {

      let search = query.search;
      let location = query.location;
      let category = query.category;

      return axios.get(`${process.env.api.baseURL}/searchSubmit`, {
        params: {
          q:search,
          location:location,
          category:category
        }
      })
      .then(({data}) => {
        return {
          results:data
        };
      })
      .catch((error) => {
        if(error.statusCode == '500') {
          return {results:[]};
        }
      });

    },

    methods: {

      ...mapActions('index_and_search', {
        sendToTreatments : 'sendToTreatments',
        fetchCptsAndRedirect : 'fetchCptsAndRedirect',
        fetchIcdsAndRedirect : 'fetchIcdsAndRedirect',
        pushAnswers: 'pushAnswers',
        popAnswers: 'popAnswers',
        setTerm : 'setTerm'
      }),

      submit() {
        this.setTerm(this.$route.query.search);
        this.fetchIcdsAndRedirect();
      },

      callToActionForAnswers(event, answer) {

        let checked = event.target.checked;
        this.applyEffectsOnAnswers(answer, checked);

				if(checked) {
					answer = Object.assign({}, answer, {checked:true});
					this.pushAnswers(answer);
        }

				else {
					answer = Object.assign({}, answer, {checked:false});
          this.popAnswers(answer);
        }

      },

			applyEffectsOnAnswers(answer, checked) {

        if(answer.type == 'unCheckAll') {
          this.apply('unCheckAll', answer, checked);
        }

        else if (answer.type == 'checkAll') {
          this.apply('checkAll', answer, checked);
        }

        else {
          this.apply('normal', answer, checked);
        }

      },

      apply(type, answer, checkProp) {

        var updated_questions = [];

				//loop through questions
				for(var question of this.results.data) {

					for (let ans of question.answers) {

            //in selected answers add or remove only those answers which belong this to this question
						if (ans.question_id == answer.question_id) {

							if(type == 'unCheckAll') {

                //uncheck all except self checkbox
                ans.checked = false;

                if(ans.answerId == answer.answerId) {
                  ans.checked = true;
                }

                //********* remove all answers except self **********/
                if(ans.answerId != answer.answerId) {
                  this.popAnswers(ans);
                }

              }//unCheckAll

							else if(type == 'checkAll') {

                //if checkbox is checked
                if(checkProp) {

                  if(ans.type != 'unCheckAll') {

                    ans.checked = true;
                    //do not add current answer which is checked because that is already being added above
                    if(ans.answerId != answer.answerId) {
                      this.pushAnswers(ans);
                    }

                  }

                }

                else {
                    ans.checked = false;
                    this.popAnswers(ans);
                }

              }//checkAll

              else if(type == 'normal') {

                if(checkProp && ans.type == 'unCheckAll' && ans.checked) {
                  ans.checked = false;
                }

                if(!checkProp) {

                  if(ans.type == 'checkAll') {
                    ans.checked = false;
                  }

                  if(ans.answerId == answer.answerId) {
                    ans.checked = false;
                  }

                }//checkProp

              }//else if

						}//ans.question_id == question.answer_id

          }//answers loop

					updated_questions.push(question);

        }//questions loop

        //update the questions with new checked or unchecked properties
        this.updateResults(updated_questions);

      },

      updateResults(data) {
        this.results = {data:data, type:'symptom'};
      },

      fetchChildren(id) {

        return axios.get('http://carepays.com/api/getChildrenOfRootChild', {
          params: {
            id:id
          }
        })
        .then(({data}) => {
          //this.children = data;
        });

      },

      queryExactMatch(child) {

        let search = this.$route.query.search.trim();

        if(search === child.term || search === child.code)
        {
          return true;
        }
        return false;
      }

    }

}
</script>

<template>
	<div>

		<div class="card">

			<div class="card__header">

					<span class="icon circle text--green">
						<i class="fas fa-pencil-alt"></i>
					</span>

					<span>Tell us more about your symptom</span>

					<span class="close pointer" @click="close">
						<i class="fa fa-times-circle text-danger"></i>
					</span>

			</div>

			<div class="card-body">

        <slot v-if="!loading">

					<div :key="question.id" v-for="(question, index) in questions">

            <div class="question my-xs">
              Question: {{index + 1}}
            </div>

						<p> <strong>{{question.question}}</strong> </p>

						<div v-if="question.answers.length != 0">

							<div :key="answer.id" v-for="answer in question.answers">

								<div v-if="question.type == 'checkbox'">

									<label class="checkbox__container checkbox__container--block" :for="answer.id">

										{{answer.answer}}
										<input class="answers-checkbox" :checked="answer.checked" :id="answer.id" type="checkbox" :value="answer.id" @change="selectAnswers($event, answer)">
										<span class="checkmark"></span>

									</label>

                </div>

								<div v-if="question.type == 'radio'">

                  <input :id="answer.id" :checked="answer.checked" type="radio" :name="answer.question_id" :value="answer.id" @change="selectAnswers($event, answer)">

									<label :for="answer.id">
										{{answer.answer}}
										<span class="radio-button"></span>
									</label>

                </div>

							</div>
						</div>

					</div>

				</slot>

				<slot v-else>
					<i class="fa fa-spinner fa-spin"></i>
				</slot>
			</div><!--card-body-->

			<div class="modal-footer">
				<button type="button" class="btn btn-secondary btn--sm" @click="close">
					Finish
				</button>
			</div>

		</div>

	</div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

	export default {

		props:['loading'],

		computed: {

      ...mapGetters('anatomy', {

        questions:'questions'

      }),
    },

		methods: {

      ...mapActions('anatomy', {

        updateQuestions : 'updateQuestions',
        fillAnswers     : 'fillAnswers',
        removeAnswer    : 'removeAnswer',

      }),

			close() {
        this.$emit('close', this.questions);
        this.updateQuestions([]);
			},

			selectAnswers(event, answer) {

        let checked = event.target.checked;
        let id = event.target.id;

				this.applyEffectsOnAnswers(answer, checked, id);

				if(checked) {
					answer = Object.assign({}, answer, {checked:true});
					this.fillAnswers(answer);
        }

				else {
					answer = Object.assign({}, answer, {checked:false});
          this.removeAnswer(answer);
        }

				//if answer has warning show it by emitting custom event showAnswerWarning
				if(answer.warning_text) {
					this.$emit('showAnswerWarning', answer);
				}

			},

			applyEffectsOnAnswers(answer, checked, id) {

				if(true) {

					if(answer.type == 'unCheckAll') {
						this.apply('unCheckAll', answer, checked);
					}

					else if (answer.type == 'checkAll') {
						this.apply('checkAll', answer, checked);
          }

          else {
            this.apply('normal', answer, checked);
          }

				}
			},

			apply(type, answer, checkProp) {

        var updated_questions = [];

				//loop through questions
				for(var question of this.questions) {

					for (let ans of question.answers) {

            //in selected answers add or remove only those answers which belong this to this question
						if (ans.question_id == answer.question_id) {

							if(type == 'unCheckAll') {
                //uncheck all except self checkbox
                ans.checked = false;

                //********* remove all answers except self **********/

                if(ans.id != answer.id) {
                  this.removeAnswer(ans);
                }

              }

							else if(type == 'checkAll') {

                //if checkbox is checked
                if(checkProp) {

                  if(ans.type != 'unCheckAll') {

                    ans.checked = true;
                    //do not add current answer which is checked because that is already being added above
                    if(ans.id != answer.id) {
                      this.fillAnswers(ans);
                    }

                  }
                  //forcely uncheck the none of the above checkbox
                  if(ans.type == 'unCheckAll') {
                    ans.checked = false;
                  }

                }

                else {
                    ans.checked = false;
                    this.removeAnswer(ans);
                }

              }

              else if(type == 'normal') {

                if(checkProp && ans.type == 'unCheckAll' && ans.checked) {
                  ans.checked = false;
                }

                if(!checkProp) {

                  if(ans.type == 'checkAll') {
                    ans.checked = false;
                  }

                  if(ans.id == answer.id) {
                    ans.checked = false;
                  }

                }

              }

						}//ans.question_id == question.answer_id

          }//answers loop

					updated_questions.push(question);

        }//questions loop

        //update the questions with new checked or unchecked properties
        this.updateQuestions(updated_questions);

			}

		}
	}
</script>

<style scoped>

.question {
  font-size:1.6rem;
  font-size:600;
}

.card {
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:450px;
	overflow:auto;
}
.card-body {
	position:relative;
}
.close {
	position:absolute;
	right:10px;
	top:15px;
}

</style>

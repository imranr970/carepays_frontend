<template>
  <main>
    <div class="popup" id="dependantsForm">

      <div class="popup__content">

        <a href="#" class="popup__close" @click.prevent="close('dependantsForm')">&times;</a>

        <div class="d-flex justify-content-between">

          <div class="px-sm">
            <h5 class="heading-5 pt-xs">
            <img src="@/assets/images/treatment-logo.jpg" class="card__img">
              Add Dependants
            </h5>
          </div>

        </div>

        <span class="clearfix"></span>

        <hr>

        <div class="px-sm mt-sm">

          <form class="form">

            <template v-if="!creating">

              <template v-if="dependants.length">

                <div v-for="(dependant, index) in dependants" :key="index">

                  <div class="flex my-xs">

                    <div class="form__group flex-1 mr-sm">
                      <label :for="dependant.id + '-dependant-name'" class="form__label">Name</label>
                      <input :id="dependant.id + '-dependant-name'" :disabled="editId != dependant.id" type="text" class="form__input-control form__input-control--sm" placeholder="Enter your dependant name" :value="dependant.dependant_name">
                    </div>

                    <div class="form__group flex-1">
                      <label :for="dependant.id + '-dependant-relation'" class="form__label">Relation</label>
                      <select :id="dependant.id + '-dependant-relation'" :disabled="editId != dependant.id" :value="dependant.dependant_relation" name="person" class="form__input-control form__input-control--sm" :class="{'has-error':errors.person}">
                        <option value="0">Select</option>
                        <option value="parent">Parent</option>
                        <option value="spouse">Spouse</option>
                        <option value="children">Children</option>
                      </select>
                    </div>

                    <div class="flex-1 form__group">
                      <label class="form__label">&nbsp;</label>

                      <template v-if="!showEditButton(dependant.id)">
                        <button  @click.prevent="setEdit(dependant.id)" class="btn btn--secondary btn--sm dependants-edit-button">
                          Edit <i class="fa fa-pencil"></i>
                        </button>

                        <button @click.prevent="deleteDependant(dependant.id)" class="btn btn--danger btn--sm dependants-edit-button">
                          Delete <i class="fas fa-trash"></i>
                        </button>
                      </template>

                      <template v-if="showEditButton(dependant.id)">
                        <button @click.prevent="edit" class="btn btn--secondary btn--sm dependants-edit-button">
                          save
                        </button>

                        <button @click.prevent="setEdit(0)" class="btn btn--default btn--sm dependants-edit-button">
                          cancel
                        </button>
                      </template>

                    </div>

                  </div>

                </div>


              </template>

              <template v-else>
                <p>You do not have any dependants in this insurance.</p>
              </template>

            </template>

            <template v-if="creating">

              <div class="flex">

                <div class="form__group flex-1 mr-sm">
                  <label for="#" class="form__label">Name</label>
                  <input type="text" class="form__input-control form__input-control--sm" placeholder="Enter your dependant name" v-model="name">
                </div>

                <div class="form__group flex-1">
                  <label for="#" class="form__label">Relation</label>
                  <select v-model="relation" name="person" class="form__input-control form__input-control--sm" :class="{'has-error':errors.person}">
                    <option value="0">Select</option>
                    <option value="parent">Parent</option>
                    <option value="spouse">Spouse</option>
                    <option value="children">Children</option>
                  </select>
                </div>

              </div>

            </template>

            <div class="float--right clearfix my-sm">
              <button class="btn btn--primary btn--sm" type="button" v-show="!creating && dependants.length < 3" @click.prevent="creating = true, resetData">
                Add new
              </button>

              <button class="btn btn--default btn--sm" type="button" v-show="creating" @click.prevent="creating = false">
                Cancel
              </button>

              <button :disabled="!validate()" class="btn btn--primary btn--sm" type="button" v-show="creating" @click.prevent="add">
                Save
              </button>
            </div>
            <div class="clearfix"></div>

          </form>

        </div>

      </div><!--popup__content-->

    </div><!--popup-->
  </main>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {

  data() {

    return {
      creating: false,
      editId  : 0,
      editing : false
    };

  },

  computed: {

    ...mapGetters('insurance', {
      dependants         : 'dependants',
      dependants_wrapper : 'dependants_wrapper',
      insurance          : 'current_insurance'
    }),

    name: {
      set(key) {
        this.editInfo({section:'dependants', param: 'name', value: key});
      },
      get() {
        return this.dependants_wrapper.name;
      },
    },

    relation: {
      set(key) {
        this.editInfo({section:'dependants', param: 'relation', value: key});
      },
      get() {
        return this.dependants_wrapper.relation;
      },
    },

    showEditButton() {
      return function(id) {
        if(this.editing && this.editId == id) {
          return true;
        }
        return false;
      }

    }

  },

  watch: {
    insurance(insurance) {
      this.addDependants([]);
      this.getAuthDependants(insurance.id);
    }
  },

  methods: {

    ...mapActions('insurance', {
      editInfo          : 'editInfo',
      getAuthDependants : 'getAuthDependants',
      addDependants     : 'addDependants',
      updateDependant   : 'updateDependant',
      addNewDependant   : 'addNewDependant',
      delete            : 'delete'
    }),

    setEdit(id = 0) {

      if(id == 0) {  //forcefully resetEdit
        this.resetEdit();
        return;
      }

      if(this.dependants.some(dependant => dependant.id == id)) {
        this.editId = id;
        this.editing = true;
        return;
      }

      this.resetEdit();
    },

    close(id) {
      this.$emit('close', id);
    },

    add() {
      if(!this.validate()) {
        return false;
      }
      this.addNewDependant()
      .then(data => {
        this.creating = false;
        this.resetData()
        this.$toast.success("New dependant added").goAway(2000);
      });

    },

    resetData() {
      this.editInfo({section:'dependants', param: 'name', value: ''});
      this.editInfo({section:'dependants', param: 'relation', value: 0});
    },

    edit() {

      let id = this.editId;

      let name = document.getElementById(`${id}-dependant-name`).value;
      let relation = document.getElementById(`${id}-dependant-relation`).value;

      if(!this.validate({name, relation})) {
        return false;
      }

      this.updateDependant({name, relation, id})
      .then((res) => {
        this.resetEdit();
        this.$toast.success('Dependant saved').goAway(2000);
      })
      .catch((err) => {
        this.$toast.error('Something went wrong').goAway(2000);
         this.resetEdit();
      });


    },

    deleteDependant(id) {
      this.delete(id).then(e => this.$toast.success('Deleted').goAway(2000));
    },

    validate(data = {}) {

      let name = this.name;
      let relation = this.relation;

      if(data.hasOwnProperty('name')) {
        name = data.name;
        relation = data.relation;
      }

      if(name == '' || relation == '0') {
        return false;
      }

      return true;

    },


    resetEdit() {
      this.editId = 0;
      this.editing = false;
    }

  },//methods

  created() {
    this.getAuthDependants(this.insurance.id);
    this.resetEdit();
  }

}
</script>

<style scoped lang="scss">
  .form__input-control--sm {
    &,
    &::placeholder {
      font-size: 1.25rem !important;
    }
  }
  .dependants-edit-button {
    margin-top:.5rem;
  }
</style>

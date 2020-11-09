<template>

  <main>

    <div class="popup" id="reason_for_visit">

      <!-- popup__content--center -->
      <div class="popup__content popup__content--small">

        <a href="#" class="popup__close" @click.prevent="closeModal('reason_for_visit')">&times;</a>

        <h5 class="heading-5 px-sm pt-xs">
          Type of service
        </h5>
        <hr>

        <form class="form px-sm py-xs">

          <div class="form__group">
            <input type="radio" name="reason" id="surgery" value="surgery" checked v-model="category">
            <label for="surgery">Surgery
                <span class="radio-button"></span>
            </label>
          </div>

          <div class="form__group">
            <input type="radio" name="reason" id="radiology" value="Radiology" v-model="category">
            <label for="radiology">Radiology
                <span class="radio-button"></span>
            </label>
          </div>

          <div class="form__group">
            <input type="radio" name="reason" id="anesthesia" value="anesthesia" v-model="category">
            <label for="anesthesia">Anesthesia
                <span class="radio-button"></span>
            </label>
          </div>

          <div class="form__group">
            <input type="radio" name="reason" id="medicine" value="medicine" v-model="category">
            <label for="medicine">Doctor Consultancy or Medicine
                <span class="radio-button"></span>
            </label>
          </div>

          <div class="form__group">
            <input type="radio" name="reason" id="Evaluation and management" value="Evaluation and management" v-model="category">
            <label for="Evaluation and management">Evaluation and management
                <span class="radio-button"></span>
            </label>
          </div>

          <div class="form__group">
            <input type="radio" name="reason" id="Pathology and laboratory" value="Pathology and laboratory" v-model="category">
            <label for="Pathology and laboratory">Pathology and laboratory
                <span class="radio-button"></span>
            </label>
          </div>

        </form>
        <hr>
        <div class="popup__content--footer px-sm py-xs">
          <button :disabled="loading" @click.prevent="submit" class="btn btn--secondary btn--sm popup__close">
            Confirm
            <span v-if="loading">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
          </button>
        </div>

      </div><!--popup__content-->

    </div><!--popup-->

  </main>

</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {

  name:'modal',

  data() {
    return {
      loading:false
    };
  },

  computed: {
    ...mapGetters('index_and_search', {
      searchCategory : 'category'
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
      setCategory : 'index_and_search/setCategory',
      submitAndFetchDiseases : 'anatomy/submitAndFetchDiseases'
    }),

    closeModal(id) {
      this.$emit('close', id);
    },

    submit() {

      this.loading = true;

      this.submitAndFetchDiseases()

      .then((data) => {
        this.loading = false;
        this.$router.push({name:'treatment-layterms'});
        this.closeModal('reason_for_visit');
      })
      .catch(e => this.loading = false);

    }

  }

}
</script>


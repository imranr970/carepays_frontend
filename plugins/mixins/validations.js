import Vue from 'vue';
import {mapGetters} from 'vuex';

const Validations = {

  install(Vue, options) {

    Vue.mixin({

      computed: {
        ...mapGetters('validation', {
          errors:'errors'
        })
      }

    });

  }

}

Vue.use(Validations)

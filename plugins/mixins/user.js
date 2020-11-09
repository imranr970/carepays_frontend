import Vue from 'vue';
import {mapGetters} from 'vuex';

const User = {

  install(Vue, options) {

    Vue.mixin({

      computed: {
        ...mapGetters('auth', {
          user:'user',
          authenticated:'loggedIn'
        })
      }

    });

  }

}

Vue.use(User)

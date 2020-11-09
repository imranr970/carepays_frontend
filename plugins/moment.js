import Vue from 'vue';
import moment from 'moment';
import VueMoment from 'vue-moment';

import 'moment/locale/en-ca';

export default ()=> {

  moment.locale('en-ca');

};

Vue.use(VueMoment, {moment});


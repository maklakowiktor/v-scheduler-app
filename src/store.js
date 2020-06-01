import Vue from 'vue';
import Vuex from 'vuex';

import userModule from './store/user';
import generalModule from './store/general';
import notificationsModule from './store/notifications';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        userModule,
        generalModule,
        notificationsModule
    }
})



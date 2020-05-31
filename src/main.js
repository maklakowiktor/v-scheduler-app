import Vue from 'vue';
import App from './App.vue';

import store from './store'
import vuetify from './plugins/vuetify';
import VueTextareaAutosize from 'vue-textarea-autosize';
import VuePageTransition from 'vue-page-transition';
import router from './router';
import firebaseConfig from './config/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(VueTextareaAutosize);
Vue.use(VuePageTransition);
Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const eventBus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  created() {
    const vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      vm.$store.dispatch('STATE_CHANGED', user);
    });
  },
  render: h => h(App)
}).$mount('#app')

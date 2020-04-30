import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueTextareaAutosize from 'vue-textarea-autosize';
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(VueTextareaAutosize);

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyBme7fmvf_pPwVGI1PETWfJ7V09Bsxa8-4",
  authDomain: "vue-calendar-cfccc.firebaseapp.com",
  databaseURL: "https://vue-calendar-cfccc.firebaseio.com",
  projectId: "vue-calendar-cfccc",
  storageBucket: "vue-calendar-cfccc.appspot.com",
  messagingSenderId: "374543033831",
  appId: "1:374543033831:web:6a3ef0d20b834783800942"
})

export const db = firebase.firestore();

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

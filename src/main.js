import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Calendar from './components/Calendar.vue';
import Todo from './components/Todo.vue';
import Today from './components/Today.vue';
import vuetify from './plugins/vuetify';
import VueTextareaAutosize from 'vue-textarea-autosize';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(VueRouter);
Vue.use(VueTextareaAutosize);
Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'Today',
      path: '/',
      component: Today
    },
    { 
      name: 'Calendar',
      path: '/calendar', 
      component: Calendar
    },
    {
      name: 'Todo',
      path: '/todo',
      component: Todo
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})

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
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

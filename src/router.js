import Vue from 'vue';
import VueRouter from 'vue-router';

import Calendar from './components/Calendar.vue';
import Todo from './components/Todo.vue';
import Today from './components/Today.vue';
import SignIn from './components/SignIn.vue';
import Register from './components/Register.vue';

Vue.use(VueRouter);

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
        name: 'SignIn',
        path: '/auth',
        component: SignIn
      },
      {
        name: 'Register',
        path: '/register',
        component: Register
      },
      {
        path: '/*',
        redirect: '/'
      }
    ]
  })
  
  export default router;
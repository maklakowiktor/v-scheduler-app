import Vue from 'vue';
import VueRouter from 'vue-router';

import Calendar from './components/Calendar.vue';
import Todo from './components/Todo.vue';
import Today from './components/Today.vue';
import SignIn from './components/SignIn.vue';
import Register from './components/Register.vue';
import Profile from './components/Profile.vue';
import Store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'Today',
      path: '/',
      component: Today,
      beforeEnter: authGuard,
    },
    { 
      name: 'Calendar',
      path: '/calendar', 
      component: Calendar,
      beforeEnter: authGuard,
    },
    {
      name: 'Todo',
      path: '/todo',
      component: Todo,
      beforeEnter: authGuard,
    },
    {
      name: 'SignIn',
      path: '/auth',
      component: SignIn,
      meta: { transition: 'none' },
    },
    {
      name: 'Register',
      path: '/register',
      component: Register,
      meta: { transition: 'none' },
    },
    {
      name: 'Profile',
      path: '/profile',
      component: Profile,
      beforeEnter: authGuard
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})

function authGuard(from, to, next) {
  if (Store.getters.isUserAuthenticated)
    next();
  else
    next('/auth');
}

  
  export default router;
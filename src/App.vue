<template>
  <v-app id="inspire">
      <v-content class="v-con-bg">
      <Menu />
        <vue-page-transition name="fade-in-right">
          <router-view></router-view>
        </vue-page-transition>
      </v-content>
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue';
import { eventBus } from '@/main.js';

export default {
  name: 'App',
  components: {
    Menu
  },
  data: () => ({
  }),
  methods: {
  },
};
</script>

<style>
  .v-con-bg {
    background: #f3f3f3;
  }

    ::-webkit-scrollbar {
        width: 6px;
        background-color: rgb(255, 255, 255)
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: rgb(230, 230, 230);
        border-radius: 5px;
        border: 1px solid lightgray;
    }
</style>

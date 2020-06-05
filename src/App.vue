<template>
  <v-app>
      <v-content>
        <Menu />
        <vue-page-transition name="fade-in-right">
          <router-view></router-view>
        </vue-page-transition>
      </v-content>
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue';

export default {
  name: 'App',
  components: {
    Menu
  },
  data: () => ({
  }),
};
</script>

<style>
  

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

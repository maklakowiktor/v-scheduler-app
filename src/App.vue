<template>
  <v-app>
      <v-content>
        <Menu />
        <vue-page-transition name="fade-in-right" class="fill-height" fluid>
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

<style scoped>
</style>

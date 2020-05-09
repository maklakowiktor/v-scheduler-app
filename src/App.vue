<template>
  <v-app>
    <v-content>
      <router-view></router-view>
      <!-- <Calendar/> -->
    </v-content>
  </v-app>
</template>

<script>
// import Calendar from './components/Calendar';

export default {
  name: 'App',
  components: {
    // Calendar,
  },
  data: () => ({
    //
  }),
};
</script>

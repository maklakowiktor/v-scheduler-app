<template>
  <v-row class="fill-height">
    <v-col>
        <template>
          <v-container>
              <div class="loader-wrapper" v-if="loading">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
              </div>
              <v-row v-else dense>
                <v-col v-if="!events.length">
                  <p>Нет запланированных встреч на сегодня</p>
                </v-col>
                <!-- <v-col
                  v-for="(event, i) in events"
                  :key="i"
                  cols="12"
                  class="ma-3"
                  v-else
                > -->
                  <!-- <v-card
                      :color="event.color"
                      dark
                      draggable="true"
                  >
                      <div class="d-flex flex-no-wrap justify-space-between">
                          <div>
                              <v-card-title class="headline">
                                <v-col cols="22" sm="6" md="4" lg="10">
                                  {{event.name}}
                                </v-col>
                                <v-col cols="22" sm="6" md="4" lg="2">
                                  <v-chip outlined>
                                    {{ event.category }}
                                  </v-chip>
                                </v-col>
                              </v-card-title>
                              
                              <v-card-subtitle v-text="event.details"></v-card-subtitle>
                          </div>
                          <div>
                              <v-card-subtitle v-text="event.start"></v-card-subtitle>
                          </div>
                      </div>
                  </v-card> -->
                  <v-card-text v-for="(event, i) in events" :key="i" class="py-0" v-else>
                    <v-timeline
                      align-top
                      dense
                    >
                      <v-timeline-item
                        :color="event.color"
                        small
                      >
                        <v-row class="pt-1">
                          <v-col cols="3">
                            <strong>{{ event.end | filterTime }}</strong>
                          </v-col>
                          <v-col>
                            <strong>{{ event.name }}</strong>
                            <div class="caption">{{ event.details }}</div>
                          </v-col>
                        </v-row>
                      </v-timeline-item>

                    </v-timeline>
                  </v-card-text>
                <!-- </v-col> -->
              </v-row>
          </v-container>
        </template>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'Today',
  data: () => ({
    item: 0,
    drawer: false,
    items: [
      { text: "Сегодня", icon: "mdi-clipboard-outline", link: "/" },
      { text: "Календарь", icon: "mdi-calendar", link: "/calendar" },
      { text: "Дела", icon: "mdi-check-circle-outline", link: "/todo" }
    ],
    elevation: 1,
    loading: false,
  }),
  beforeMount() {
  },
  mounted() {
    this.getEvents();
  },
  computed: {
    events() {      
      return this.$store.getters.getFormatedEvents;
    },
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    }
  },
  watch: {
    isUserAuthenticated(val) {
      if (val !== true)
        this.$router.push("/auth");
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('SIGNOUT'); 
    },
    getEvents() {
      this.$store.dispatch('setEvents');
    }
  },
  filters: {
    filterTime: v => {
      if (!v) return '';
      let pos = v.indexOf('T');
      v = v.split('').splice(pos + 1, pos).join().replace(/,/g, '');

      return v;
    }
  }
};
</script>

<style scoped>

.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}

/* Animation loader */
.loader-wrapper {
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: rgb(29, 100, 136);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}



</style>
<template>
    <v-col>
      <template>
        <v-container v-touch:swipe.right="openSidebar">
          <v-row class="pr-2" dense>
            <v-card min-width="100%">
              <v-dialog
                v-if="loading"
                v-model="loading"
                hide-overlay
                persistent
                width="300"
              >
                <v-card
                  color="primary"
                  dark
                >
                  <v-card-text>
                    Пожалуйста подождите...
                    <v-progress-linear
                      indeterminate
                      color="white"
                      class="mb-0"
                    ></v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-col v-else-if="!events.length">
                <div class="d-flex justify-center">
                  Нет запланированных встреч или событий на сегодня
                </div>
              </v-col>
              <v-col v-else>
                <v-card-text v-for="(event, i) in events" :key="i" class="py-0">
                  <v-timeline align-top dense>
                    <v-timeline-item :color="event.color" small align="center" justify="center">
                      <v-row class="pt-1">
                        <v-col >Время завершения: 
                          <strong>{{ event.end | filterTime }}</strong>
                        </v-col>
                        <v-col>
                          Название:
                          <strong>{{ event.name }}</strong>
                          <div class="caption">{{ event.details }}</div>
                        </v-col>
                      </v-row>
                    </v-timeline-item>

                  </v-timeline>
                </v-card-text>
              </v-col>
            </v-card>
          </v-row>
        </v-container>
      </template>
    </v-col>
</template>

<script>
import {eventBus} from "@/main.js";

  export default {
    name: 'Today',
    data: () => ({
      item: 0,
      drawer: false,
      items: [{
          text: "Сегодня",
          icon: "mdi-clipboard-outline",
          link: "/"
        },
        {
          text: "Календарь",
          icon: "mdi-calendar",
          link: "/calendar"
        },
        {
          text: "Дела",
          icon: "mdi-check-circle-outline",
          link: "/todo"
        }
      ],
      elevation: 1,
      loading: true,
    }),
    mounted() {
      this.getEvents();

      this.$store.dispatch('setCategories', this.authUser.uid);

      eventBus.$on('loading', () => {
        this.loading = false;
      })
    },
    computed: {
      events() {
        return this.$store.getters.getFormatedEvents;
      },
      isUserAuthenticated() {
        return this.$store.getters.isUserAuthenticated;
      },
      authUser() {
        return this.$store.getters.authUser;
      },
    },
    watch: {
      isUserAuthenticated(val) {
        if (val !== true)
          this.$router.push("/auth");
      }
    },
    methods: {
      openSidebar: function() {
        eventBus.$emit('openSidebar', true);
      },
      signOut() {
        this.$store.dispatch('SIGNOUT');
      },
      getEvents() {
        this.$store.dispatch('setEvents', this.authUser.uid);
      },
      getTime(str) {
        return str.substring(0, str.indexOf(":")); 
      }
    },
    filters: {
      filterTime: v => {
        if (!v) return '';
        
        let pos = v.indexOf('T');
        v = v.split('').splice(pos + 1, pos).join().replace(/,/g, '');
        
        // let plusThree = (parseInt(getTime(v)) + 0) + v.substring(v.length, v.indexOf(":"));
        
        // function getTime(str) {
        //   return str.substring(0, str.indexOf(":")); 
        // }

        return v;
      }
    }
  };
</script>

<style scoped>
  .lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top,
        rgba(0, 0, 0, 0.4) 0%,
        transparent 72px);
  }

  .v-con-bg {
    background: #ffffff;
  }
</style>
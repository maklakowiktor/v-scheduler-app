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
                <v-col
                  v-for="(event, i) in events"
                  :key="i"
                  cols="12"
                  class="ma-3"
                  v-else
                >
                <v-card
                    :color="event.color"
                    dark
                    draggable="true"
                >
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title
                            class="headline"
                            v-text="event.name"
                            ></v-card-title>

                            <v-card-subtitle v-text="event.details"></v-card-subtitle>
                        </div>
                        <div>
                            <v-card-subtitle v-text="event.start"></v-card-subtitle>
                        </div>
                    </div>
                </v-card>
                </v-col>
              </v-row>
          </v-container>
        </template>
    </v-col>
  </v-row>
</template>

<script>
import { db } from "@/main";
import Push from 'push.js';

export default {
  name: 'Today',
  data: () => ({
    events: [],
    item: 0,
    drawer: false,
    items: [
      { text: "Сегодня", icon: "mdi-clipboard-outline", link: "/" },
      { text: "Календарь", icon: "mdi-calendar", link: "/calendar" },
      { text: "Дела", icon: "mdi-check-circle-outline", link: "/todo" }
    ],
    elevation: 1,
    loading: true,
    planning: [
      {
        title: 'Task #1', 
        body: 'Body Task #1',
        timeout: 10/60
      }
    ],
  }),
  beforeMount() {
    this.eventIterator();
  },
  mounted() {
    this.getEvents();
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },
    completedTasks () {
      return this.tasks.filter(task => task.done).length
    },
    progress () {
      return this.completedTasks / this.tasks.length * 100
    },
    remainingTasks () {
      return this.tasks.length - this.completedTasks
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
    eventIterator() {
      if (!this.planning.length) return;
      const vm = this;
      this.planning.forEach(event => {
        vm.createEvent(event);
      });
    },
    createEvent(ev) {
      setTimeout((ev) => {
        Push.create(ev.title, {
          body: ev.body,
          icon: '../../public/calendar.png',
          onClick: function () {
            window.focus();
            this.close();
          }
        });
      }, this.planning[0].timeout * 1000 * 60, ev );
    },
    async getEvents() {
      const regExp = /(\d{4}-\d{2}-\d{2})/g,
            currentDate = new Date().toJSON().slice(0,10).toString();

      let snapshot = await db.collection("calEvent").get(),
          events = [];
      
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        events.push(appData);
      });
      
      events.map((event) => {
        for ( let key in event ) {
          let fieldStart = event[key];

          if ( key === 'start' ) {
            let arrField = fieldStart.match(regExp);
            event[key] = arrField[0];
          }
        }
      })

      events = events.filter( item => item.start === currentDate );

      this.events = events;
      this.loading = false;
    },
    create () {
      this.tasks.push({
        done: false,
        text: this.task
      })

      this.task = null
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
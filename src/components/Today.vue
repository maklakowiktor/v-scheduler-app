<template>
  <v-row class="fill-height">
    <!-- Сайдбар -->
    <v-navigation-drawer v-model="drawer" app class="white">
      <v-list nav dense>
        <v-list-item v-for="(item, i) in items" :key="i" link :to="item.link">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-col>
      <v-sheet :elevation="elevation" height="64">
        <v-toolbar flat color="white">
          <v-app-bar-nav-icon class="grey--text mr-1" @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Сегодня</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>
      <template>
        <v-container>
            <div class="loader-wrapper" v-if="loading">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
            <v-row v-else dense>
                <v-col
                v-for="(event, i) in events"
                :key="i"
                cols="12"
                class="ma-5"
                >
                <v-card
                    :color="event.color"
                    dark
                >
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title
                            class="headline"
                            v-text="event.name"
                            ></v-card-title>

                            <v-card-subtitle v-text="event.details"></v-card-subtitle>
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

export default {
  name: 'Todo',
  data: () => ({
    events: [],
    item: 0,
    drawer: false,
    items: [
        { text: "Сегодня", icon: "mdi-group", link: "/" },
        { text: "Календарь", icon: "mdi-calendar", link: "/calendar" },
        { text: "Дела", icon: "mdi-home", link: "/todo" }
    ],
    tasks: [
      {
        done: false,
        text: 'Foobar'
      },
      {
        done: false,
        text: 'Fizzbuzz'
      }
    ],
    task: null,
    elevation: 1,
    loading: true
  }),
  mounted() {
    this.getEvents();
  },
  computed: {
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
  methods: {
    async getEvents() {
      let snapshot = await db.collection("calEvent").get();
      let events = [];

      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        events.push(appData);
      });
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
.col {
  padding: 0 12px 0 12px !important;
}

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
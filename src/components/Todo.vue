<template>
  <v-row class="fill-height">
    <!-- Сайдбар -->
    <v-navigation-drawer v-model="drawer" app class="white">
      <v-list>
        <v-list-item class="mb-2">
          <v-list-item-avatar>
            <v-img src="../../public/logo.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ email }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item >
        <v-divider class="mb-3"></v-divider>
        <v-list-item v-for="(item, i) in items" :key="i" link :to="item.link">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn text @click.prevent="signOut" v-if="isUserAuthenticated">
            <v-icon>exit_to_app</v-icon>
            Выйти
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-col>
      <v-sheet :elevation="elevation" height="64">
        <v-toolbar flat color="white">
          <v-app-bar-nav-icon class="grey--text mr-1" @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Список задач</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>
      <template>
        <v-container style="max-width: 768px">
          <v-text-field
            v-model="task"
            label="Над чем работаете?"
            solo
            @keydown.enter="create"
          >
            <v-fade-transition slot="append">
              <v-icon v-if="task" @click="create">add_circle</v-icon>
            </v-fade-transition>
          </v-text-field>

          <h2 class="display-1 success--text pl-3">
            Задач:&nbsp;
            <v-fade-transition leave-absolute>
              <span :key="`tasks-${tasks.length}`">{{ tasks.length }}</span>
            </v-fade-transition>
          </h2>

          <v-divider class="mt-3"></v-divider>

          <v-layout my-1 align-center>
            <strong class="mx-3 info--text text--darken-3">Всего: {{ remainingTasks }}</strong>

            <!-- Will be fixed for v1.2 -->
            <v-divider vertical></v-divider>

            <strong class="mx-3 black--text">Завершено: {{ completedTasks }}</strong>

            <v-spacer></v-spacer>

            <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
          </v-layout>

          <v-divider class="mb-3"></v-divider>

          <v-card v-if="tasks.length > 0">
            <v-slide-y-transition class="py-0" group tag="v-list">
              <template v-for="(task, i) in tasks">
                <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
                <v-list-item :key="`${i}-${task.text}`">
                  <v-list-item-action>
                    <v-checkbox v-model="task.done" color="info darken-3" @change="completeTask(task.id, task.done)">
                      <div
                        slot="label"
                        :class="task.done && 'grey--text' || 'text--primary'"
                        class="ml-3"
                        v-text="task.text"
                      ></div>
                    </v-checkbox>
                  </v-list-item-action>

                  <v-spacer></v-spacer>

                  <v-scroll-x-transition>
                    <v-icon v-if="task.done" color="success">check</v-icon>
                  </v-scroll-x-transition>
                </v-list-item>
              </template>
            </v-slide-y-transition>
          </v-card>
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
      { text: "Сегодня", icon: "mdi-clipboard-outline", link: "/" },
      { text: "Календарь", icon: "mdi-calendar", link: "/calendar" },
      { text: "Дела", icon: "mdi-check-circle-outline", link: "/todo" }
    ],
    tasks: [],
    task: null,
    elevation: 1,
    email: null
  }),
  mounted() {
    this.getTasks();
    this.email = this.$store.getters.getEmail;
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
    },
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },
  },
  methods: {
    async getTasks() {
      let snapshot = await db.collection("todos").get(); // TODO: .where('', '==', this.email)
      let tasks = [];

      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        tasks.push(appData);
      });
      this.tasks = tasks;
    },
    async create() {
      let task = this.task;

      this.tasks.push({
        done: false,
        text: task
      })

      this.task = null;

      await db.collection('todos').add({
        done: false,
        text: task
      })
    },
    async completeTask(id, done) {
      await db.collection('todos').doc(id).update({
        done: done
      });
    },
    signOut() {
      this.$store.dispatch('SIGNOUT'); 
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
</style>
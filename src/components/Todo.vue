<template>
    <v-col>
      <template>
        <v-container style="max-width: 768px" v-touch:swipe.right="openSidebar">
          <v-text-field
            v-model="task"
            label="Введите задачу"
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
                  <v-btn class="ml-1" icon @click="deleteTask(task.id)">
                    <v-icon color="grey lighten-1">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item>
              </template>
            </v-slide-y-transition>
          </v-card>
        </v-container>
      </template>
    </v-col>
</template>

<script>
import { db } from "@/main";
import {eventBus} from "@/main.js";

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
    task: '',
    elevation: 1,
    time: null
  }),
  mounted() {
    this.getTasks(this.$store.getters.authUser);
  },
  computed: {
    authUser() {
      return this.$store.getters.authUser;
    },
    tasks() {
      return this.$store.getters.getTodos;
    },
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
    async getTasks(uid) {
      this.$store.dispatch('setTodos', this.authUser.uid);
    },
    async create() {
      if (this.task === '') return;
      let task = this.task;

      this.task = null;

      await db.collection('todos').add({
        done: false,
        text: task,
        ownerUid: this.authUser.uid
      })
      this.getTasks(this.authUser.uid);
    },
    async completeTask(id, done) {
      await db.collection('todos').doc(id).update({
        done: done
      });
    },
    async deleteTask(id) {
      await db.collection('todos').doc(id).delete();
      this.$store.dispatch('setTodos', this.authUser.uid);
    },
    signOut() {
      this.$store.dispatch('SIGNOUT'); 
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
</style>
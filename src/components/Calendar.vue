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
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <!-- Sidebar btn -->
          <v-app-bar-nav-icon class="grey--text mr-1" @click="drawer = !drawer"></v-app-bar-nav-icon>

          <!-- <v-btn color="" class="mr-4" @click="dialog = true" dark>+</v-btn> -->
          
          <v-btn outlined class="mr-4" @click="setToday">Сегодня</v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" class="mr-4" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-show="title != undefined">{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                color="grey darken-2"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>День</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Неделя</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Месяц</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 дня</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <!-- Предупреждение -->
      <v-slide-y-transition class="py-0">
        <v-alert type="error" v-show="errShow">
          Поля "Название", "Дата начала" и "Дата окончания" должны быть заполнены!
        </v-alert>
      </v-slide-y-transition>
      <!-- Диалоговое окно добавления события -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="name" type="text" label="Название (Обязательно)"></v-text-field>
              <v-text-field v-model="details" type="text" label="Описание"></v-text-field>
              <v-text-field v-model="start" type="datetime-local" label="Начало (Обязательно)"></v-text-field>
              <v-text-field v-model="end" type="datetime-local" label="Окончание (Обязательно)"></v-text-field>
              <v-text-field v-model="color" type="color" label="Цвет (Нажмите, чтобы открыть меню выбора цвета)"></v-text-field>
              <v-btn 
                type="submit" 
                color="primary" 
                class="mr-4" 
                @click.stop="dialog=false"
              >Создать событие</v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
      
      <v-sheet> <!-- Prop: height="600" -->
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <form v-if="currentlyEditing !== selectedEvent.id">
                {{ selectedEvent.details }}
              </form>
              <form v-else>
                <textarea-autosize
                  v-model="selectedEvent.details"
                  type="text"
                  style="width: 100%"
                  :min-height="100"
                  placeholder="Добавить заметку" 
                ></textarea-autosize>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">Закрыть</v-btn>
              <v-btn text v-if="currentlyEditing !== selectedEvent.id" 
              @click.prevent="editEvent(selectedEvent)">Изменить</v-btn>
              <v-btn text v-else @click.prevent="updateEvent(selectedEvent)">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
      <v-btn fixed bottom right class="ma-5" fab dark color="indigo" @click="dialog = true">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      
    </v-col>
  </v-row>
</template>

<script>
import { db } from '@/main';
export default {
    data: () => ({
        today: new Date().toISOString().substr(0, 10),
        focus: new Date().toISOString().substr(0, 10),
        type: 'month',
        typeToLabel: {
            month: 'Месяц',
            week: 'Неделя',
            day: 'День',
            "4day": '4 дня'
        },
        name: null,
        details: null,
        start: null,
        end: null,
        color: '#1976D2',
        category: null,
        currentlyEditing: null,
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        dialog: false,
        errShow: false,
        drawer: false,
        width: 300,
        item: 0,
        items: [
          { text: "Сегодня", icon: "mdi-clipboard-outline", link: "/" },
          { text: "Календарь", icon: "mdi-calendar", link: "/calendar" },
          { text: "Дела", icon: "mdi-check-circle-outline", link: "/todo" }
        ],
        email: null
    }),
    computed: {
      isUserAuthenticated() {
        return this.$store.getters.isUserAuthenticated;
      },
      title () {
        const { start, end } = this
        if (!start || !end) {
          return '';
        }

        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)

        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
          case '4day':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
    },
    mounted() {
      this.getEvents();
      this.email = this.$store.getters.getEmail;
      this.end = this.start = new Date().toJSON().slice(0, 10).toString() + 'T12:00';
    },
    methods: {
      signOut() {
        this.$store.dispatch('SIGNOUT'); 
      },
      alertErr() {
        this.errShow = true;
        setTimeout( () => {
          this.errShow = false;
        }, 3000)
      },
      async getEvents() {
        let snapshot = await db.collection("calEvent").get();
        let events = [];
        
        snapshot.forEach(doc => {
          let appData = doc.data();
          appData.id = doc.id;
          events.push(appData);
        });
        // events.map(item => this.events.push(item));
        this.events = events;
      },
      async addEvent() {
        if(this.name && this.start && this.end) {
          await db.collection('calEvent').add({
            name: this.name,
            details: this.details,
            start: this.start,
            end: this.end,
            color: this.color,
            category: this.category
          })
          this.getEvents();
          this.name = '';
          this.details = '';
          this.start = '';
          this.end = '';
          this.color = '#1976D2';
        } else {
          this.alertErr();
        }
      },
      async updateEvent(ev) {
        await db
          .collection('calEvent')
          .doc(this.currentlyEditing)
          .update({
            details: ev.details
          });
          this.selectedOpen = false;
          this.currentlyEditing = null;
      },
      async deleteEvent(ev) {
        await db
          .collection('calEvent')
          .doc(ev)
          .delete();
        
        this.selectedOpen = false;
        this.getEvents();
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      editEvent(ev) {
        this.currentlyEditing = ev.id;
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {

        this.start = start
        this.end = end
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      formatDate (a, withTime) {
        return withTime
          ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
          : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
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
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }

  .v-calendar {
    height: calc(100vh - 64px) !important;
  }

  .v-calendar-daily__day-interval:hover, .v-calendar-weekly__day:hover {
    background-color: #f5f5f5 !important;
  }
</style>
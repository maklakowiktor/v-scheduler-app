<template>
  <v-row class="fill-height">
    <v-col class="pt-0">
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
              <v-text-field v-model="name" type="text" label="Название *" required></v-text-field>
              <v-text-field v-model="details" type="text" label="Описание" required></v-text-field>
              <v-text-field v-model="start" type="datetime-local" label="Начало *" required></v-text-field>
              <v-text-field v-model="end" type="datetime-local" label="Окончание *" required></v-text-field>
              <v-select
                v-model="category"
                :items="categories"
                label="Категория *"
                color="success"
                required
              ></v-select>
              <v-text-field v-model="geo" type="text" label="Местоположение"></v-text-field>
              <v-text-field v-model="duration" type="text" label="Длительность"></v-text-field>
              <v-text-field
                v-model="color" 
                type="color" 
                label="Цвет (Нажмите, чтобы открыть меню выбора цвета)"
                :outlined="true"
                :background-color="color"
                height="5"
                :dense="true"
                full-width
                size="5"
              >Выбрать цвет</v-text-field>
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
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
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

      <v-btn fixed bottom right class="ma-5" fab dark color="indigo" @click="openDialog">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { db } from '@/main';
import { mapState } from 'vuex';
import {eventBus} from "@/main.js";

export default {
    name: 'Calendar',
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
        geo: null,
        duration: null,
        currentlyEditing: null,
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
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
    }),
    created() {
      eventBus.$on('eSetToday', () => {
        this.setToday();
      }),
      eventBus.$on('ePrev', () => {
        this.prev();
      }),
      eventBus.$on('eNext', () => {
        this.next();
      }),
      eventBus.$on('eType', (type) => {
        this.type = type;
      })
    },
    mounted() {
      this.getEvents();
    },
    computed: {
      categories() {
        let filterCats = []
        this.$store.getters.getCategories.map( cat => {
          filterCats.push(cat.category);
        });
        return filterCats;
      },
      events() {
        return this.$store.getters.getEvents;
      },
      isUserAuthenticated() {
        return this.$store.getters.isUserAuthenticated;
      },
      authUser() {
        return this.$store.getters.authUser;
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

        // this.end = this.start = new Date().toJSON().slice(0, 10).toString() + 'T12:00';

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
      monthFormatter (d) {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      }
    },
    watch: {
      isUserAuthenticated(val) {
        if (val !== true)
          this.$router.push("/auth");
      },
      title (val) {
        eventBus.$emit('eTitle', val)
      }
    },
    methods: {
      alertErr() {
        this.errShow = true;
        setTimeout( () => {
          this.errShow = false;
        }, 3000)
      },
      getEvents () {
        this.$store.dispatch('setEvents');
      },
      openDialog() {
        // this.end = this.start = new Date().toJSON().slice(0, 10).toString() + 'T12:00';
        this.dialog = true;
      },
      async addEvent() {
        if(this.name && this.start && this.end && this.category) {
          await db.collection('calEvent').add({
            name: this.name,
            details: this.details,
            start: this.start,
            end: this.end,
            color: this.color,
            category: this.category,
            geo: this.geo,
            ownerUid: this.authUser.uid
          })
          this.getEvents();
          this.name = '';
          this.details = '';
          this.end = '';
          this.start = '';
          this.category = '';
          this.geo = '';
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
        this.focus = this.today;
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
          ? 'е'
          : ['е', 'е', 'е', 'е', 'е', 'е', 'е', 'е', 'е', 'е'][d % 10]
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
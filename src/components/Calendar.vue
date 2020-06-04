<template>
  <v-row class="fill-height">
    <v-col class="pt-0 pr-0 pb-0">
      <!-- Предупреждение -->
      <v-slide-y-transition class="py-0">
        <v-alert type="error" v-show="errShow">
          Обязательные поля должны быть заполнены!
        </v-alert>
      </v-slide-y-transition>
      <!-- Диалоговое окно добавления события -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="name" type="text" label="Название *" required></v-text-field>
              
              <v-text-field v-model="details" type="text" label="Описание" required></v-text-field>
              
              <v-datetime-picker 
                dateFormat="dd.MM.yyyy" 
                format="24hr" 
                timeFormat="HH:mm" 
                okText="Сохранить" 
                clearText="" 
                label="Начало *" 
                v-model="start" 
                @input="outputDate"
                :datePickerProps="{ scrollable: true }" 
                :timePickerProps="{ format: '24hr', scrollable: true }" 
                required>
              </v-datetime-picker>

              <v-datetime-picker 
                dateFormat="dd.MM.yyyy" 
                format="24hr" 
                timeFormat="HH:mm" 
                okText="Сохранить" 
                clearText="" 
                label="Окончание *" 
                v-model="end" 
                @input="outputDate"
                :datePickerProps="{ scrollable: true }" 
                :timePickerProps="{ format: '24hr', scrollable: true }" 
                required>
              </v-datetime-picker>
              
              <v-select
                v-model="category"
                :items="categories"
                label="Категория *"
                required
              ></v-select>
              
              <v-text-field v-model="geo" type="text" label="Местоположение (каб., организация)"></v-text-field>
              
              <v-select
                item-text="name"
                item-value="value"
                :items="periods"
                v-model="duration"
                label="Надпомнить через"
                required
                @input="outputDuration"
              ></v-select>
              
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
      
      <v-sheet>
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

          v-touch="{
            left: () => show('Left'),
            right: () => show('Right'),
            up: () => show('Up slide'),
            down: () => show('Down slide')
          }"
          
        ></v-calendar>
        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-chip outlined>{{ selectedEvent.category }}</v-chip>
            </v-toolbar>
            <v-card-text>
                <span>
                  <v-icon>mdi-earth</v-icon>
                  {{ selectedEvent.geo }}
                </span>
                <v-divider ></v-divider>
              <form v-if="currentlyEditing !== selectedEvent.id" class="mt-3">
                {{ selectedEvent.details }}
              </form>
              <form v-else>
                <textarea-autosize
                  v-model="selectedEvent.details"
                  type="text"
                  style="width: 100%"
                  :min-height="100"
                  placeholder="Добавить заметку"
                  class="mt-3"
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
    <v-snackbar v-model="snackbar" timeout="4000">{{ snacktext }}
          <v-btn color="blue" text @click="snackbar = false">Закрыть</v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import { db } from '@/main';
import {eventBus} from "@/main.js";
import moment from 'moment';

export default {
    name: 'Calendar',
    data: () => ({
        today: new Date().toISOString().substring(0, 16),
        focus: new Date().toISOString().substring(0, 16),
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
        end:  null,
        color: '#1976D2',
        category: null,
        geo: null,
        duration: {
          name: '0 мин.',
          value: 0,
        },
        periods: [
          { name: '1 мин.', value: 1},
          { name: '5 мин.', value: 5},
          { name: '10 мин.', value: 10},
          { name: '15 мин.', value: 15},
          { name: '20 мин.', value: 20},
          { name: '30 мин.', value: 30},
          { name: '45 мин.', value: 45},
          { name: '1 ч.', value: 60},
          { name: '4 ч.', value: 240},
          { name: '8 ч.', value: 480},
          { name: '16 ч.', value: 960},
          { name: '1 д.', value: 1440},
        ],
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
        menu: false,
        modal: false,
        menu2: false,
        swipeDirection: 'None',
        snackbar: false,
        snackText: ''
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

      if (this.isUserAuthenticated === true) {
            this.$store.dispatch('setCategories', this.authUser.uid); 
      }
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
        let { start, end } = this
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

        // console.log(start, end);
        // this.end = this.start = new Date().toJSON().slice(0, 10).toString() + 'T12:00';
        // console.log(startMonth, endMonth, suffixMonth, startYear, endYear, startDay, endDay);

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
      swipe (direction) {
        this.snacktext = status;
        this.snackbar = true;
      },
      outputDuration() {
        console.log('Duration: ', this.duration);
      },
      outputDate() {
        this.start = moment(new Date(this.start)).format('YYYY-MM-DDTHH:mm');
        this.end = moment(new Date(this.end)).format('YYYY-MM-DDTHH:mm');
        console.log("Start: ", this.start, "End: ", this.end);
      },
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
        this.dialog = true;
        this.end = this.start = new Date();
      },
      async addEvent() {
        if(this.name && this.start && this.end) {
          await db.collection('calEvent').add({
            name: this.name,
            details: this.details,
            start: this.start,
            end: this.end,
            color: this.color,
            category: this.category,
            geo: this.geo,
            duration: parseInt(this.duration.value),
            ownerUid: this.authUser.uid
          })
          this.getEvents();
          this.name = '';
          this.details = '';
          this.end = '';
          this.start = '';
          this.category = '';
          this.geo = '';
          this.duration = this.periods;
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
    height: calc(100vh - 72px) !important;
  }

  .v-calendar-daily__day-interval:hover, .v-calendar-weekly__day:hover {
    background-color: #f5f5f5 !important;
  }
</style>
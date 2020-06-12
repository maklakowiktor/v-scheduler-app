<template>
<div>
  <!-- <v-row class="fill-height"> -->
    <v-col class="pa-0">
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
                :datePickerProps="{ scrollable: true }" 
                :timePickerProps="{ format: '24hr', scrollable: true }" 
                required>
              </v-datetime-picker>
              
              <v-select
                item-text="category"
                item-value="category"
                :items="categories"
                v-model="category"
                label="Категория *"
                @input="takeColor"
                required
              ></v-select>
              
              <v-text-field v-model="geo" type="text" label="Местоположение (каб., организация)" ></v-text-field>
              
              <v-select
                item-text="name"
                item-value="value"
                :items="periods"
                v-model="duration"
                label="Надпомнить через"
                required
              ></v-select>
              
              <v-btn 
                type="submit" 
                color="primary" 
                class="mr-4" 
                @click.stop="closeDialog"
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
          v-touch:swipe.left="swipeRightHandler"
          v-touch:swipe.right="swipeLeftHandler"
          v-touch:longtap="longtapHandler"
        ></v-calendar>
        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
          <v-card color="grey lighten-4" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn v-if="selectedEvent.ownerUid === authUser.uid" @click="deleteEvent(selectedEvent.id, selectedEvent.private)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-chip outlined>{{ selectedEvent.category }}</v-chip>
            </v-toolbar>
            <v-card-text>
                <span class="mr-2">
                  <v-icon>mdi-earth</v-icon>
                  {{ selectedEvent.geo }}
                </span>
                |
                <span class="ml-2">{{ selectedEvent.start | showFilteredTime }} - {{ selectedEvent.end | showFilteredTime }}</span>
                <v-divider class="mt-2"></v-divider>
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
              <v-btn text v-show="selectedEvent.ownerUid === authUser.uid" v-if="(currentlyEditing !== selectedEvent.id)" 
              @click.prevent="editEvent(selectedEvent)">Изменить</v-btn>
              <v-btn text v-else @click.prevent="updateEvent(selectedEvent, selectedEvent.private)">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>

      <v-btn fixed bottom right class="ma-5" fab dark color="indigo" @click="openDialog">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-col>
    <v-snackbar v-model="snackbar" :timeout="4000">{{ snacktext }}
          <v-btn color="blue" text @click="snackbar = false">Закрыть</v-btn>
    </v-snackbar>
  <!-- </v-row> -->
    <v-dialog v-model="dialogSelect" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialogSelect = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Инструменты</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="dialogSelect = false"><v-icon>mdi-content-save</v-icon></v-btn>
            </v-toolbar-items>
          </v-toolbar>
            <v-list three-line subheader>
              <v-subheader>Фильтр: {{ selectedFilter }}</v-subheader>
              <v-sheet elevation="0" class="pa-4" justify="center">
                    <v-chip-group column active-class="white--text">
                        <v-chip v-for="(tag, idx) in categories" :key="idx" :color="tag.color" @click="filterEvents(tag.category)">
                            {{ tag.category }}
                        </v-chip>
                    </v-chip-group>
                    <v-btn color="primary" dark height="30" outlined rounded @click="resetFilters" :disabled="filtered">
                        <v-icon>mdi-undo</v-icon>
                    </v-btn>
              </v-sheet>
            </v-list>
          <v-divider></v-divider>
            <v-subheader>Тип календаря: {{ typeToLabel[this.type] }}</v-subheader>
            <v-list>
              <v-list-item @click="type = 'day'">
                  <v-list-item-title>День
                  </v-list-item-title>
                  <v-icon v-if="type == 'day'" color="green">mdi-checkbox-marked-circle</v-icon>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                  <v-list-item-title>Неделя
                  </v-list-item-title>
                  <v-icon v-if="type == 'week'" color="green">mdi-checkbox-marked-circle</v-icon>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                  <v-list-item-title>Месяц
                  </v-list-item-title>
                  <v-icon v-if="type =='month'" color="green">mdi-checkbox-marked-circle</v-icon>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 дня
                  </v-list-item-title>
                  <v-icon v-if="type =='4day'" color="green">mdi-checkbox-marked-circle</v-icon>
              </v-list-item>
            </v-list>
        </v-card>
      </v-dialog>
</div>
</template>

<script>
import { db } from '@/main';
import {eventBus} from "@/main.js";

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
        details: '',
        start: null,
        end:  null,
        color: '#1976D2',
        geo: null,
        dbs: ['calEvent', 'publicEvents'],
        category: {
          category: 'Общие',
        },
        duration: {
          value: 0,
        },
        periods: [
          { name: 'Не надпоминать', value: 0},
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
        snacktext: '',
        dialogSelect: false,
        selectedFilter: null,
        filtered: true
    }),
    beforeDestroy() {
      eventBus.$off('eSetToday');
      eventBus.$off('ePrev');
      eventBus.$off('eNext');
      eventBus.$off('eType');
    },
    mounted() {
      db.collection('calEvent').where('ownerUid', '==', this.authUser.uid).onSnapshot(querySnapshot => {
        this.getEvents();
      });
      db.collection('publicEvents').onSnapshot(querySnapshot => {
        this.getEvents();
      });

      this.initData = [this.start, this.end];

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
      eventBus.$on('setFilter', (v) => {
        this.selectedFilter = v;
      })
      
      this.getEvents();

      this.$store.dispatch('setCategories', this.authUser.uid); 

    },
    computed: {
      categories() {
        let filterCats = []
        this.$store.getters.getCategories.map( cat => {
          filterCats.push({
            category: cat.category,
            color: cat.color
          });
        });
        filterCats.unshift({
          category: 'Общие',
          color: "#1976D2FF",
        })
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
        eventBus.$emit('eTitle', val);
      }
    },
    filters: {
      showFilteredTime: (val) => {
        if (!val) return '';
        const res = val.replace(/\T.*/, '');
        const nums = res.replace(/-/g, '.').split('.');
        const newDateString = `${nums[2]}.${nums[1]}.${nums[0]}`;

        return newDateString;
      }
    },
    methods: {
      takeColor() {
        let getColors = this.categories;
        let obj = getColors.filter( item => item.category === this.category);
        this.color = obj[0].color;
      },
      swipeRightHandler() {
        this.next();
      },
      swipeLeftHandler() {
        this.prev();
      },
      longtapHandler() {
        this.dialogSelect = true;
      },
      swipe (direction) {
        this.snacktext = status;
        this.snackbar = true;
      },
      alertErr() {
        this.errShow = true;
        setTimeout( () => {
          this.errShow = false;
        }, 3000)
      },
      getEvents () {
        this.$store.dispatch('setEvents', this.authUser.uid);
      },
      openDialog() {
        this.dialog = true;
        this.end = this.start = new Date();
      },
      closeDialog() {
        this.dialog = false;
      },
      filterEvents(category) {
        this.$store.dispatch('SORT_EVENTS', category);
        this.filtered = false;
        this.selectedFilter = category;
        eventBus.$emit('setFilter', category);
      },
      resetFilters() {
          this.$store.commit('RESET_EVENTS');
          this.filtered = true;
          this.selectedFilter = null;
          eventBus.$emit('setFilter', null);
      },
      resetForm() {
        this.name = '';
        this.details = '';
        this.end = '';
        this.start = '';
        this.category = {
          category: 'Общие',
        },
        this.geo = '';
        this.duration = {
          value: 0,
        },
        this.color = '#1976D2';
        this.getEvents();

      },
      addEvent() {
        if (this.name && this.start && this.end && this.category.category === 'Общие') {

          this.query('publicEvents');

        } else if (this.name && this.start && this.end && this.category.category !== 'Общие') {
          
          this.query('calEvent');

        } else {
          this.alertErr();
        }
      },
      validCategory(cat) {
        if (typeof cat === 'string') {
          return cat;
        } else if(cat.category === 'Общие') {
          return cat.category
        }
      },
      async query(param) {
        let privateEvent = null;

        param === 'publicEvents' ? privateEvent = false : privateEvent = true

        await db.collection(param).add({
          name: this.name,
          details: this.details,
          start: new Date(this.start).addHours(3).toISOString().substring(0, 16),
          end: new Date(this.end).addHours(3).toISOString().substring(0, 16),
          color: this.color,
          category: this.validCategory(this.category),
          geo: this.geo,
          duration: parseInt(this.duration),
          ownerUid: this.authUser.uid,
          private: privateEvent
        })
        this.resetForm();
        // this.$store.dispatch('uploadEvents');
      },
      async updateEvent(ev, privateEvent) {
        let dbname = null;
        if (privateEvent === true) {
          dbname = this.dbs[0];
        } else {
          dbname = this.dbs[1];
        }
        await db
          .collection(dbname)
          .doc(this.currentlyEditing)
          .update({
            details: ev.details
          });
          this.selectedOpen = false;
          this.currentlyEditing = null;
      },
      async deleteEvent(ev, privateEvent) {
        let dbname = null;
        if (privateEvent === true) {
          dbname = this.dbs[0];
        } else {
          dbname = this.dbs[1];
        }
        await db
          .collection(dbname)
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
      setToday() {
        this.focus = this.today;
      },
      prev() {
        this.$refs.calendar.prev()
      },
      next() {
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
    },
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
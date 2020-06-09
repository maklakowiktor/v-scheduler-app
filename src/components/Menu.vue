<template>
    <v-row fixed>
    <!-- Сайдбар -->
        <v-navigation-drawer v-model="drawer" app class="white pt-0" v-if="isUserAuthenticated">
        <v-list class="mt-0 pt-0">
            <v-list-item class="mb-0 pt-2" link to="/profile">
                <v-list-item-avatar class="mb-4">
                    <v-img :src="require('../assets/logo.png')"></v-img>
                </v-list-item-avatar>
                <v-list-item-content class="mb-2">
                    <v-list-item-title>{{ authUser.initials | filterInitials }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item >
            <v-divider></v-divider>
            <v-list-item v-for="(item, i) in items" :key="i" link :to="item.link" @click="selectedFilter = null; filtered = true; menu = false;">
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="pa-2 border" justify="center" align="center">
                <v-btn text @click.prevent="signOut" v-if="isUserAuthenticated" outlined>
                    <v-icon>exit_to_app</v-icon>
                    Выйти
                </v-btn>
            </div>
        </template>
        </v-navigation-drawer>
        <!-- Top menu -->
        <v-col class="mb-0 pt-0 pb-0">
            <v-sheet :elevation="elevation" height="72" v-if="isUserAuthenticated" tile>
                <!-- Today component menu -->
                <v-toolbar flat color="white" class="today-component pt-1" v-if="currentRoute == 'Today'">
                    <v-app-bar-nav-icon class="grey--text mr-1" @click="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-toolbar-title>Сегодня</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <!-- Calendar component menu -->
                <v-toolbar class="pt-1" flat color="white" v-else-if="currentRoute == 'Calendar'">
                    <!-- Sidebar btn -->
                    <v-app-bar-nav-icon class="grey--text mr-1" @click="drawer = !drawer"></v-app-bar-nav-icon>                    
                    <v-btn outlined class="mr-4" @click="setToday">Сегодня</v-btn>
                    <v-btn fab text small color="grey darken-2" @click="prev">
                        <v-icon small>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" class="mr-4" @click="next">
                        <v-icon small>mdi-chevron-right</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <div class="text-center mr-5">
                        <v-menu
                            v-model="menu"
                            :close-on-content-click="true"
                        >
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    outlined
                                    color="indigo"
                                    dark
                                    v-on="on"
                                >
                                    <v-icon>mdi-filter-outline</v-icon>
                                    {{ selectedFilter }}
                                </v-btn>
                            </template>

                            <v-card max-height="70vh" max-width="30vw">
                                    <v-sheet elevation="0" class="pa-4" justify="end">
                                        <h3 class="mb-1">Фильтрация по категории:</h3>
                                        <v-chip-group
                                            column
                                            active-class="white--text"
                                            justify="end"
                                        >
                                            <v-chip v-for="(tag, idx) in categories" :key="idx" :color="tag.color" @click="filterEvents(tag.category)">
                                                {{ tag.category }}
                                            </v-chip>
                                        </v-chip-group>
                                        <v-btn color="primary" dark height="30" outlined rounded @click="resetFilters" :disabled="filtered">
                                            <v-icon>mdi-undo</v-icon>
                                        </v-btn>
                                    </v-sheet>
                            </v-card>

                        </v-menu>
                    </div>
                    <v-menu bottom right nudge-right>
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
                            <v-list-item @click="mtype('day')">
                                <v-list-item-title>День</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="mtype('week')">
                                <v-list-item-title>Неделя</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="mtype('month')">
                                <v-list-item-title>Месяц</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="mtype('4day')">
                                <v-list-item-title>4 дня</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>

                <v-toolbar class="pt-1" flat color="white" v-else-if="currentRoute == 'Todo'">
                    <v-app-bar-nav-icon class="grey--text mr-1" @click="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-toolbar-title>Список задач</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-toolbar class="pt-1" flat color="white" v-else-if="currentRoute == 'Profile'">
                    <v-app-bar-nav-icon class="grey--text mr-1" @click="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-toolbar-title>Профиль</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

            </v-sheet>
        </v-col>

        <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ snacktext }}
            <v-btn color="blue" text @click="snackbar = false">Закрыть</v-btn>
        </v-snackbar>
    </v-row>
</template>

<script>
import Calendar from './Calendar';
import {eventBus} from "@/main.js";
import { db } from '@/main';

export default {
    name: 'Menu',
    data: () => ({
        drawer: false,
        title: '',
        items: [
            { text: "Сегодня", icon: "mdi-clipboard-outline", link: "/" },
            { text: "Календарь", icon: "mdi-calendar", link: "/calendar" },
            { text: "Список задач", icon: "mdi-check-circle-outline", link: "/todo" }
        ],
        elevation: 1,
        type: 'month',
        typeToLabel: {
            month: 'Месяц',
            week: 'Неделя',
            day: 'День',
            "4day": '4 дня'
        },
        fav: true,
        menu: false,
        message: false,
        hints: true,
        category: null,
        color: '#0e1cff',
        fieldRule: [
            (v) => !!v || 'Заполните поле'
        ],
        snackbar: false,
        snacktext: '',
        filtered: true,
        timeout: 4000,
        selectedFilter: null,
    }),
    beforeDestroy() {
      eventBus.$off('eTitle');
    },
    created() {
        eventBus.$on('eTitle', (val) => {
            return this.title = val;
        })

        if (!window.Notification) {
            this.snackerNotifications('Ваш браузер не поддерживает уведомления');
        } else if(Notification.permission === "default") {
            Notification.requestPermission((status) => {
                if (status === 'granted') {
                    this.snackerNotifications('Уведомления включены');
                } else if(status === 'denied') {
                    this.snackerNotifications('Уведомления отключены');
                }
                
            })
        } else if(Notification.permission === 'denied') {
           this.snackerNotifications('Уведомления отключены');
        } else {
            this.snackerNotifications('Уведомления включены');
        }
    },
    mounted() {
        eventBus.$on('openSidebar', (v) => {
            this.drawer = v;
        })
    },
    computed: {
        categories() {
            let filterCats = [];
            
            this.$store.getters.getCategories.map( cat => {
                filterCats.push(cat);
            });
            
            filterCats.unshift({
                category: 'Общие',
                color: "#1976D2FF",
                id: '0',
                ownerUid: '0'
            });
            
            return filterCats;
        },
        currentRoute() {
            return this.$route.name;
        },
        isUserAuthenticated() {
            return this.$store.getters.isUserAuthenticated;
        },
        authUser() {
            return this.$store.getters.authUser;
        },
    },
    methods: {
        snackerNotifications(status) {
            this.snacktext = status;
            this.snackbar = true;
        },
        setToday: function() {
        	eventBus.$emit('eSetToday');
        },
        prev: function() {
        	eventBus.$emit('ePrev');
        },
        next: function() {
        	eventBus.$emit('eNext');
        },
        mtype: function(v) {
            this.type = v;
            eventBus.$emit('eType', v);
        },
        signOut() {
            this.$store.dispatch('SIGNOUT'); 
        },
        filterEvents(category) {
            this.$store.dispatch('SORT_EVENTS', category);
            this.filtered = false;
            this.selectedFilter = category;
        },
        resetFilters() {
            this.$store.commit('RESET_EVENTS');
            this.filtered = true;
            this.selectedFilter = null;
        },
    },
    filters: {
        filterInitials: (ev) => {
            let length = ev.length;
            let pos = ev.indexOf('&');
            return ev.slice(0, pos);
        }
    }
}
</script>

<style scoped>
    .border {
        border: 1px solid lightgrey;
    }
</style>
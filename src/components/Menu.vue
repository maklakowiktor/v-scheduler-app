<template>
    <v-row fixed>
    <!-- Сайдбар -->
        <v-navigation-drawer v-model="drawer" app class="white" v-if="isUserAuthenticated">
        <v-list class="mt-0">
            <v-list-item class="mb-0">
            <v-list-item-avatar class="mb-4">
                <v-img src="../../public/logo.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{ email }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item >
            <v-divider class=""></v-divider>
            <v-list-item v-for="(item, i) in items" :key="i" link :to="item.link">
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <!-- <v-row justify="space-around">
            <v-col cols="12" sm="6" md="4" lg="10">
            <v-sheet elevation="0" class="pa-4">
                <v-chip-group
                column
                active-class="primary--text"
                >
                <v-chip v-for="tag in tags" :key="tag" :color="tag.color" :text-color="tag.textcolor">
                    {{ tag.name }}
                </v-chip>
                </v-chip-group>
            </v-sheet>
            </v-col>
        </v-row> -->
        <template v-slot:append>
            <div class="pa-2">
                <v-btn text @click.prevent="signOut" v-if="isUserAuthenticated">
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
                <v-toolbar flat color="white" class="today-component" v-if="currentRoute == 'Today'">
                    <v-app-bar-nav-icon class="grey--text mr-1" @click="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-toolbar-title>Сегодня</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <!-- Calendar component menu -->
                <v-toolbar flat color="white" v-else-if="currentRoute == 'Calendar'">
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
                            :close-on-content-click="false"
                            open-on-hover
                        >
                            <template v-slot:activator="{ on }">
                                <v-btn
                                outlined
                                color="indigo"
                                dark
                                v-on="on"
                                >
                                    <v-icon>mdi-filter-outline</v-icon>
                                </v-btn>
                            </template>

                            <v-card max-height="70vh">
                                <v-col cols="12" sm="6" md="4" lg="12">
                                    <v-sheet elevation="0" class="pa-4">
                                        <h3 class="mb-1">Фильтрация по категории:</h3>
                                        <v-chip-group
                                            column
                                            active-class="primary--text"
                                        >
                                            <v-chip v-for="(tag, idx) in categories" :key="idx" :color="tag.color">
                                                {{ tag.category }}
                                            </v-chip>
                                        </v-chip-group>
                                        <v-chip outlined color="primary">
                                                <v-icon>mdi-plus</v-icon>
                                        </v-chip>
                                    </v-sheet>
                                </v-col>
                            </v-card>

                        </v-menu>
                    </div>
                    <!-- <v-spacer></v-spacer> -->

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
                <!-- Todo list component -->
                <v-toolbar flat color="white" v-else-if="currentRoute == 'Todo'">
                    <v-app-bar-nav-icon class="grey--text mr-1" @click="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-toolbar-title>Список задач</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

            </v-sheet>
        </v-col>
        <!-- End top menu -->
    </v-row>
</template>

<script>
import Calendar from './Calendar';
import {eventBus} from "@/main.js";

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
        // email: null,
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
    }),
    created() {
        eventBus.$on('eTitle', (val) => {
            return this.title = val;
        })
    },
    mounted() {
        this.$store.dispatch('setCategories');
    },
    computed: {
        categories() {
            return this.$store.getters.getCategories;
        },
        currentRoute() {
            return this.$route.name;
        },
        isUserAuthenticated() {
            return this.$store.getters.isUserAuthenticated;
        },
        email() {
            return this.$store.getters.getEmail;
        },
        authUser() {
            return this.$store.getters.authUser;
        },
    },
    watch: {
        isUserAuthenticated(val) {
            if (val !== true)
                this.$router.push("/auth");
        },
    },
    methods: {
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
    }
}
</script>

<style scoped>
    
</style>
<template>
    <v-row class="fill-height">
        <!-- Сайдбар -->
        <v-navigation-drawer v-model="drawer" app class="white">
            <v-list
                nav
                dense
            >
                <v-list-item
                v-for="(item, i) in items"
                :key="i"
                link
                :to="item.link"
                >
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
            <v-sheet height="64">
                <v-toolbar flat color="white">
                <v-app-bar-nav-icon class="grey--text mr-1" @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-btn outlined class="mr-4" @click="setToday">Сегодня</v-btn>
                <v-btn fab text small color="grey darken-2" @click="prev">
                    <v-icon small>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" class="mr-4" @click="next">
                    <v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
                <v-toolbar-title>Title</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                    <template v-slot:activator="{ on }">
                    <v-btn
                        outlined
                        color="grey darken-2"
                        v-on="on"
                    >
                        <span>Span</span>
                        <v-icon right>mdi-menu-down</v-icon>
                    </v-btn>
                    </template>
                    <v-list v-for="todo in todos" :key="todo[key]">
                    <v-list-item>
                        <v-list-item-title>{{ todo }}</v-list-item-title>
                    </v-list-item>
                    </v-list>
                </v-menu>
                </v-toolbar>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import { db } from '@/main';

export default {
    data: () => ({
        events: [],
        item: 0,
        drawer: false,
        items: [
          { text: 'Сегодня', icon: 'mdi-home', link: '/' },
          { text: 'Календарь', icon: 'mdi-calendar', link: '/calendar' },
        ],
    }),
    mounted() {
        this.getEvents();
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
            // events.map(item => this.events.push(item));
            this.events = events;
        }
    }
}
</script>

<style>

</style>
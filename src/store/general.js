import { db } from '@/main';

export default {
    state: {
        events: [],
        todos: [],
        processing: false,
        error: null,
        numb: 1
    },
    mutations: {
        SET_PROCESSING(state, payload) {
            state.processing = payload;
        },
        SET_ERROR(state, payload) {
            state.error = payload;
        },
        CLEAR_ERROR(state) {
            state.error = null;
        },
        setEvents: (state, events) => {
            state.events = events;
        }
    },
    actions: {
        setEvents: async context => {
            let snapshot = await db.collection('calEvent').get();
            const events = [];
            snapshot.forEach(doc => {
                let appData = doc.data()
                appData.id = doc.id
                events.push(appData)
            });
            context.commit('setEvents', events);
        }
    },
    getters: {
        getProcessing: (state) => state.processing,
        getError: (state) => state.error,
        getEvents: state => state.events
    }
}
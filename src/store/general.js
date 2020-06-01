import { db } from '@/main';

export default {
    state: {
        events: [],
        todos: [],
        categories: [],
        processing: false,
        error: null,
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
        SET_EVENTS: (state, events) => {
            state.events = events;
        },
        SET_TODOS: (state, todos) => {
            state.todos = todos;
        },
        SET_CATEGORIES: (state, cats) => {
            state.categories = cats;
        },
    },
    actions: {
        setEvents: async context => {
            let snapshot = await db.collection('calEvent').get(); // .where('ownerUid', '==', '')
            const events = [];
            snapshot.forEach(doc => {
                let appData = doc.data()
                appData.id = doc.id
                events.push(appData)
            });
            context.commit('SET_EVENTS', events);
        },
        setTodos: async (context, uid) => {
            let snapshot = await db.collection('todos').where('ownerUid', '==', uid).get(); // .where('ownerUid', '==', '')
            const todos = [];
            snapshot.forEach(doc => {
                let appData = doc.data()
                appData.id = doc.id
                todos.push(appData)
            });
            context.commit('SET_TODOS', todos);
        },
        setCategories: async (context) => {
            let snapshot = await db.collection('categories').get();
            const categories = [];
            snapshot.forEach(doc => {
                let appData = doc.data()
                appData.id = doc.id
                categories.push(appData)
            });
            context.commit('SET_CATEGORIES', categories);
        }
    },
    getters: {
        getProcessing: state => state.processing,
        getError: state => state.error,
        getEvents: state => state.events,
        getCategories: state => state.categories,
        getFormatedEvents: (state) => {
            const regExp = /(\d{4}-\d{2}-\d{2})/g;
            const currentDate = new Date().toJSON().slice(0,10).toString();
            let events = state.events;

            events.map((event) => {
                for ( let key in event ) {
                    let fieldStart = event[key];

                    if ( key === 'start' ) {
                        let arrField = fieldStart.match(regExp);
                        event[key] = arrField[0];
                    }
                }
            })

            events = events.filter( item => item.start === currentDate );

            return events
        },
        getTodos: state => state.todos,
        doneTodos: state => {
            return state.todos.filter(todo => todo.done);
        }
    }
}
import { db } from '@/main';

export default {
    state: {
        events: [],
        initEvents: [],
        todos: [],
        categories: [],
        processing: false,
        error: null,
        key: null
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
            state.initEvents = events;
        },
        SET_TODOS: (state, todos) => {
            state.todos = todos;
        },
        SET_CATEGORIES: (state, cats) => {
            state.categories = cats;
        },
        FILTER_EVENTS: (state, events) => {
            state.events = events;
        },
        RESET_EVENTS: (state) => {
            state.events = state.initEvents; 
        },
        SET_SECRET_KEY: (state, key) => {
            state.key = key;
        }
    },
    actions: {
        setEvents: async ({commit}, uid) => {
            let privateEvents = await db.collection('calEvent').where('ownerUid', '==', uid).where('private', '==', true).get();
            let publicEvents = await db.collection('publicEvents').get();
            const events = [];

            commitEvents(privateEvents);
            commitEvents(publicEvents);
            
            commit('SET_EVENTS', events);

            function commitEvents(arr) {
                let evs = arr;

                evs.forEach(doc => {
                    let appData = doc.data();
                    appData.id = doc.id;
                    events.push(appData);
                });
            }
        },
        setTodos: async ({ commit }, uid) => {
            let snapshot = await db.collection('todos').where('ownerUid', '==', uid).get(); // .where('ownerUid', '==', '')
            const todos = [];
            snapshot.forEach(doc => {
                let appData = doc.data()
                appData.id = doc.id
                todos.push(appData)
            });
            commit('SET_TODOS', todos);
        },
        setCategories: async ({ commit }, uid) => {
            let snapshot = await db.collection('categories').where('ownerUid', '==', uid).get();
            const categories = [];
            snapshot.forEach(doc => {
                let appData = doc.data()
                appData.id = doc.id
                categories.push(appData)
            });
            commit('SET_CATEGORIES', categories);
        },
        SORT_EVENTS: ({state, commit}, category) => {
            commit('RESET_EVENTS');
            
            const initEvents = state.initEvents;
            const filteredEvents = initEvents.filter(event => event.category === category);
            
            commit('FILTER_EVENTS', filteredEvents);
        },
        FETCH_SECRET_KEY: ({commit}) => {
            const docRef = db.collection("secretKey").doc("secretKey");

            docRef.get().then(function(doc) {
                if (doc.exists) {
                    commit('SET_SECRET_KEY', doc.data().key);
                } else {
                    console.log("Ошибка БД. Отсутствует секретный ключ!");
                }
            }).catch(function(error) {
                console.log("Ошибка при получении ключа: ", error);
            });
        }
    },
    getters: {
        getSecretKey: state => state.key, 
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
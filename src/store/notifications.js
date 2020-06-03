import { db } from "@/main";
import Push from 'push.js';

export default {
    state: {
        planning: [],
    },
    mutations: {
        SET_PLANNING: (state, planning) => {
            state.planning = planning;
        }
    },
    actions: {
        uploadEvents: ({commit, dispatch}) => {
            let notifs = [];

            db.collection('calEvent').where('duration', '>', 0).onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        console.log('New event - ', change.doc.data());
                        notifs.push(change.doc.data());
                        commit('SET_PLANNING', notifs); 
                        dispatch('eventIterator');
                        notifs = [];
                    }
                    if (change.type === 'modified') {
                        console.log('Modified event: ', change.doc.data());
                    }
                    if (change.type === 'removed') {
                        console.log('Removed event: ', change.doc.data());
                    }
                });
            });
        },
        eventIterator: ({state, dispatch}) => {
            if (state.planning.length === 0) return;
            
            state.planning.forEach(event => {
              dispatch('createEvent', event);
            });
        },
        createEvent: ({}, ev) => {
            setTimeout((ev) => {
                Push.create(ev.name, {
                    body: ev.details,
                    icon: require('../assets/calendar.png'),
                    onClick: function () {
                        window.focus();
                        this.close();
                    }
                });
            }, ev.duration * 1000 * 60, ev );
        },
    }
}
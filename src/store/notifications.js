import { db } from "@/main";
import Push from 'push.js';

export default {
    state: {
        planning: [],
        reminds: []
    },
    mutations: {
        SET_PLANNING: (state, planning) => {
            state.planning = planning;
        },
        SET_REMINDS: (state, reminds) => {
            state.reminds = reminds;
        }
    },
    actions: {
        uploadEvents: ({commit, dispatch}, uid) => {
            let notifs = [];
            let reminds= [];

            db.collection('calEvent').where('ownerUid', '==', uid).onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        notifs.push(change.doc.data());
                        commit('SET_PLANNING', notifs); 
                        dispatch('eventIterator');
                        notifs = [];
                    }
                });
            });
            db.collection('publicEvents').onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        notifs.push(change.doc.data());
                        commit('SET_PLANNING', notifs); 
                        dispatch('eventIterator');
                        notifs = [];
                    }
                });
            });
            db.collection('calEvent').where('ownerUid', '==', uid).where('duration', '>', 0).onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        reminds.push(change.doc.data());
                        commit('SET_REMINDS', reminds); 
                        dispatch('remindIterator');
                        reminds = [];
                    }
                });
            });
            db.collection('publicEvents').where('duration', '>', 0).onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        reminds.push(change.doc.data());
                        commit('SET_REMINDS', reminds); 
                        dispatch('remindIterator');
                        reminds = [];
                    }
                });
            });
            
        },
        eventIterator: ({state, dispatch}) => {
            if (state.planning.length === 0) return;
            
            state.planning.forEach(event => {
                const end = new Date(event.end);
                const now = new Date();
                const diff = (end - now);
                
                console.log("Event iterator: ", end, now, diff);
                if ( diff >= 0 ) {
                    dispatch('createEvent', [event, diff]);
                } else {
                    return;
                }
            });
        },
        createEvent: ({}, arr) => {
            let ev = arr[0];
            let ms = arr[1];
            
            setTimeout((ev) => {
                Push.create(ev.name, {
                    body: ev.details,
                    icon: require('../assets/bell.png'),
                    onClick: function () {
                        window.focus();
                        this.close();
                    }
                });
            }, ms, ev ); // ev.duration * 1000 * 60
        },
        remindIterator: ({state, dispatch}) => {
            if (state.reminds.length === 0) return;
            
            state.reminds.forEach(event => {
                const end = new Date(event.end);
                const now = new Date();
                const diff = (end - now);

                console.log(end, now, diff);
                
                if ( diff >= 0 ) {
                    dispatch('createRemind', event);
                } else {
                    return;
                }
            });
        },
        createRemind: ({}, ev) => {
            
            setTimeout((ev) => {
                Push.create(ev.name, {
                    body: "Напоминание: " + ev.details,
                    icon: require('../assets/bell.png'),
                    onClick: function () {
                        window.focus();
                        this.close();
                    }
                });
            }, ev.duration * 1000 * 60, ev ); // ev.duration * 1000 * 60
        },
    }
}

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + ( h * 60 * 60 * 1000));
    return this;
}
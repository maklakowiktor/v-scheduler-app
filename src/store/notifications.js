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
        uploadEvents: ({commit, dispatch}, uid) => {
            let notifs = [];
            
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
        },
        eventIterator: ({state, dispatch}) => {
            if (state.planning.length === 0) return;
            
            state.planning.forEach(event => {
                console.log(event.end);
                const end = new Date(event.end).addHours(3);
                const now = new Date();
                const diff = (end - now);
                console.log(end.toISOString(), now.toISOString(), diff);
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
            console.log(ev, ms);
            
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
    }
}

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + ( h * 60 * 60 * 1000));
    return this;
}
import firebase from 'firebase';
import { eventBus } from "@/main.js";

export default {
    state: {
        user: {
            isAuthenticated: false,
            uid: null,
            email: null,
            initials: null,
        },
    },
    mutations: {
        SET_USER(state, payload) {
            state.user.isAuthenticated = true;
            state.user.uid = payload.uid;
            state.user.email = payload.email;
            state.user.initials = payload.displayName;
        },
        UNSET_USER(state) {
            state.user = {
                isAuthenticated: false,
                uid: null,
                email: null,
                initials: null,
            }
        },
        SET_USER_NAME(state, payload) {
            state.user.initials = payload;
        }
    },
    actions: {
        SIGNUP({commit}, payload) {
            let inits = null;
            commit('SET_PROCESSING', true);
            commit('CLEAR_ERROR', false);
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    inits = payload.surname.charAt(0).toUpperCase() + payload.surname.slice(1) + " " + payload.name[0].toUpperCase() + "." + payload.patronymic[0].toUpperCase() + "." + " &" + payload.position;
                    firebase.auth().currentUser.updateProfile({
                        displayName: inits,
                    })
                    .then(() => commit('SET_USER_NAME', inits))
                    commit('SET_PROCESSING', false);
                })
                .catch(error => {
                    commit('SET_ERROR', error.message);
                })
                .finally(() => {
                    commit('SET_PROCESSING', false);
                })
        },
        SIGNIN({commit}, payload) {
            commit('SET_PROCESSING', true);
            commit('CLEAR_ERROR', false);
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
                commit('SET_PROCESSING', false);
            })
            .catch(error => {
                commit('SET_ERROR', error.message);
            })
            .finally(() => {
                commit('SET_PROCESSING', false);
            })
        },
        SIGNOUT() {
            firebase.auth().signOut();
        },
        STATE_CHANGED({commit}, payload) {
            if(payload) {
                commit('SET_USER', payload);
                commit('SET_USER_NAME', payload.displayName);
            } else {
                commit('UNSET_USER');
            }
        },
        CHANGE_USER_PASSWORD({state, commit}, payload) {
            let user = firebase.auth().currentUser;
            let credential = firebase.auth.EmailAuthProvider.credential(
                state.user.email,
                payload.password,
            )
            commit('SET_PROCESSING', true);
            commit('CLEAR_ERROR');
            
            user.reauthenticateWithCredential(credential).then(function() {
                let currentUser = firebase.auth().currentUser;

                currentUser.updatePassword(payload.newPassword)
                .then(() => {
                    commit('SET_PROCESSING', false);
                    eventBus.$emit('clearFormPassword');
                })
                .catch(error => {
                    commit('SET_PROCESSING', false);
                    commit('SET_ERROR', error.message);
                })
            }).catch(function(error) {
                commit('SET_PROCESSING', false);
                commit('SET_ERROR', error.message);
            });
        }
    },
    getters: {
        isUserAuthenticated: (state) => state.user.isAuthenticated,
        getEmail: (state) => state.user.email,
        authUser: state => state.user,
    }
}

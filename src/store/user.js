import firebase from 'firebase';

export default {
    state: {
        user: {
            isAuthenticated: false,
            uid: null,
            email: 'e-mail'
        },
    },
    mutations: {
        SET_USER(state, payload) {
            state.user.isAuthenticated = true;
            state.user.uid = payload.uid;
            state.user.email = payload.email;
        },
        UNSET_USER(state) {
            state.user = {
                isAuthenticated: false,
                uid: null,
                email: 'e-mail'
            }
        }
    },
    actions: {
        SIGNUP({commit}, payload) {
            commit('SET_PROCESSING', true);
            commit('CLEAR_ERROR', false);
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
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
            } else {
                commit('UNSET_USER');
            }
        }
    },
    getters: {
        isUserAuthenticated: (state) => state.user.isAuthenticated,
        getEmail: (state) => state.user.email
    }
}
import firebase from 'firebase';

export default {
    state: {
        user: {
            isAuthenticated: false,
            uid: null
        },
    },
    mutations: {
        SET_USER(state, payload) {
            state.user.isAuthenticated = true;
            state.user.uid = payload;
        }
    },
    actions: {
        SIGNUP({commit}, payload) {
            commit('SET_PROCESSING', true);
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit('SET_USER', user.uid);
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
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit('SET_USER', user.uid);
            })
            .catch(error => {
                commit('SET_ERROR', error.message);
            })
            .finally(() => {
                commit('SET_PROCESSING', false);
            })
        }
    },
    getters: {
        isUserAuthenticated: (state) => state.user.isAuthenticated
    }
}
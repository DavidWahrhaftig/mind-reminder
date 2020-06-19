import axios from 'axios';
import router from '../../router';


const state = {
    // if the user is logged in then the token will be available
    token: localStorage.getItem('token') || '', // sets token from browser's locaclStorage
    user: {},
    status: '',
    error:  null
};

const getters = {
    isLoggedIn: state => {
        return state.token !== ''
    },
    authState: state => {
        return state.status
    },
    user: state => {
        return state.user;
    },
    error: state => {
        return state.error;
    }
};

const mutations = {
    auth_request(state) {
        state.status = 'loading';
        state.error = null;
    },
    auth_success(state, {token, user}) {   
        state.token = token;
        state.user = user;
        // console.log(user);
        state.status = 'success';
        state.error = null;
    },
    auth_error(state, err) {
        state.error = err.response.data.msg;
    },
    register_request(state) {
        state.status = 'loading';
        state.error = null;
    },
    register_success(state) {
        state.status = 'success';
        state.error = null;
    },
    register_error(state, err) {
        state.error = err.response.data.msg;
    },
    logout(state) {
        state.status = '';
        state.token = '';
        state.user = {};
        state.error = null;
    },
    profile_request(state) {
        state.status = 'loading';
    },
    user_profile(state, user) {
        state.status = 'success';
        state.user = user;
    }

};

const actions = {
    // Login Action
    async login( { commit }, user) {
        commit('auth_request'); // call the mutation auth_request with the given arguments
        try {
            let res = await axios.post('/api/users/login', user);
            if (res.data.success) {
                const token = res.data.token;
                const userRecieved = res.data.user;
                console.log(res);
                console.log(userRecieved);
                // Store the token into the localStorage
                localStorage.setItem('token', token);
                // Set the axios defaults
                console.log("before axios.defaults.headers....");
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', {token, user: userRecieved}); // call the mutation auth_success with the given arguments
            }
            return res;
        } catch(err) {
            commit('auth_error', err);
        }
    },
    async register( { commit }, userData) {
        commit('register_request');
        try {
            let res = await axios.post('/api/users/register', userData);
            if(res.data.success !== undefined) {
                commit('register_success');
            }
            return res;
        } catch(err) {
            commit('register_error', err);
        }
    },
    async getProfile({ commit }) {
        // try {
        commit('profile_request');
        let res = await axios.get('/api/users/profile');
        commit('user_profile', res.data.user);
        return res;
        // } catch(err) {
        //     commit('profile_error', err);
        // }
    },
    // Logout user
    async logout({ commit }) {
        await localStorage.removeItem('token');
        commit('logout');
        // delete axios token
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return;
    }

};

export default {
    state,
    getters,
    mutations,
    actions
}
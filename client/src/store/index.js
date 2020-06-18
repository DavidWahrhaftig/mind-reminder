import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './Warehouse/Auth';
import Profile from './Warehouse/Profile';

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        Auth,
        Profile
    }
})
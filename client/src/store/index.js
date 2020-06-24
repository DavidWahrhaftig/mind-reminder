import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './Warehouse/Auth';
import Profile from './Warehouse/Profile';
import Reviews from './Warehouse/Reviews';

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        Auth,
        Profile,
        Reviews
    }
})
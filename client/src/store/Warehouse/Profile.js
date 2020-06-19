import axios from 'axios';
// import { remove } from '../../../../server/model/User';
// import Vue from 'vue';

const state = {
    status: '',
    error: '',
    timers: [],
    newIDs: []
};

const getters = {
    timers: state => {
        return state.timers;
    },
    // getDailyTimerByIndex: (state) => (index) => {
    //     return state.dailyTimers[index];
    // }
    isNew: state => {
        // timer is new if its id is not in the timers id
        return id => {
            const index = state.newIDs.indexOf(id);
            return (index >= 0); // index not negative hence its in the newID array
        }
    }
};

const mutations = {
    // updateTimer(state, payload) {
    //     Vue.set(state.dailyTimers[payload.index], 'startTime', payload.timer.startTime);
    //     Vue.set(state.dailyTimers[payload.index], 'endTime', payload.timer.endTime);
    //     Vue.set(state.dailyTimers[payload.index], 'period', payload.timer.period);
    //     Vue.set(state.dailyTimers[payload.index], 'name', payload.timer.name);
    //     //Vue.set(state.dailyTimers[payload.index], 'enabled', payload.timer.enabled);
        
    // },
    // removeTimer(state, index) {
    //     console.log('Removing index: ' + index);
    //     console.log(state.dailyTimers[index]);
    //     state.dailyTimers.splice(index, 1);
    // }
    get_timers_request(state){
        state.status = 'loading';
        state.error = null;
    },
    get_timers_success(state, timers){
        state.status = 'success';
        state.timers = timers;
        // state.timers = timers.map(timer => {
        //     const index = state.newIDs.indexOf(timer._id);
        //     console.log("index of newID: "+ index);
        //     const isNew = (index < 0);
        //     if (isNew) state.newIDs.splice(index, 1);
        //     return {...timer, isNew: false}
        // });
        state.error = null;
    },
    get_timers_error(state, err){
        state.error = err.response.data.msg;
    }, 
    new_timer_request(state){
        state.status = 'loading';
        state.error = null;
    },
    new_timer_success(state, timer){
        state.status = 'success';
        state.newIDs.push(timer._id);
        state.error = null;
    },
    new_timer_error(state, err){
        state.error = err.response.msg;
    },
    update_timer_request(state) {
        state.status = 'loading';
        state.error = null;

    },
    update_timer_success(state, timer) {
        state.status = 'success';
        const index = state.newIDs.indexOf(timer._id);
        if (index >= 0) state.newIDs.splice(index, 1);
        state.error = null;
    },
    update_timer_error(state, err) {
        state.status = 'failed';
        state.status = err.response.msg;
    },
    remove_timer_request(state) {
        state.status = 'loading';
        state.error = null;
    },
    remove_timer_success(state, id) {
        state.status = 'success';
        const index = state.newIDs.indexOf(id);
        if (index >= 0) state.newIDs.splice(index, 1);
        state.error = null;
    },
    remove_timer_error(state, err) {
        state.status = 'failed';
        state.status = err.response.msg;
    }
};

const actions = {
    async getTimers({commit}) {
        commit("get_timers_request");
        try {
            let res = await axios.get('/api/timers');
            if (res.data.success) {
                const timers = res.data.timers;
                commit('get_timers_success', timers);
            }
            return res;
        } catch(err) {
            commit('get_timers_error', err);
        }
    },
    async create({commit}, currentTime) {
        commit("new_timer_request");
        try {
            // const date = new Date();
            // const hour = ('0' + date.getHours() % 24).slice(-2);
            // const minutes = ('0' + date.getMinutes() % 60).slice(-2);
            const newTimer = {
                start: currentTime,
                end: currentTime
            }
            let res = await axios.post('/api/timers', newTimer);
            if (res.data.success) {
                // const timers = res.data.timer;
                console.log("new timer to new_timer_success");
                console.log(res.data.timer);
                commit('new_timer_success', res.data.timer);
            }
            return res;

        } catch(err) {
            console.log("commit new_timer_error");
            console.log(err);
            
            commit('new_timer_error', err);
            
        }
    },
    async update({commit}, payload) {
        commit('update_timer_request');
        let res = await axios.put('/api/timers', payload);
        try { 
            if (res.data.success) {
                console.log(res.data.timer);
                commit('update_timer_success', res.data.timer);
            }
            return res;

        } catch(err) {            
            commit('update_timer_error', err);
        }
    },
    async remove({commit}, id) {
        commit('remove_timer_request');
        console.log(id);
        let res = await axios.delete('/api/timers', { data: { id } });
        try { 
            if (res.data.success) {
                // console.log(res.data.timer);
                commit('remove_timer_success', id);
            }
            return res;

        } catch(err) {            
            commit('remove_timer_error', err);
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}
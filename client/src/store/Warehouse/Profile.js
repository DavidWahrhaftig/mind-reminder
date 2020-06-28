import axios from 'axios';
// import reminderTypes from '../../../../server/optionTypes';
// import { remove } from '../../../../server/model/User';
// import Vue from 'vue';

const state = {
    status: '',
    error: '',
    reminders: [],
    reminderTypes: {},
    newIDs: []
};

const getters = {
    reminders: state => {
        return state.reminders;
    },
    // getDailyreminderByIndex: (state) => (index) => {
    //     return state.dailyreminders[index];
    // }
    isNew: state => {
        // reminder is new if its id is not in the reminders id
        return id => {
            const index = state.newIDs.indexOf(id);
            return (index >= 0); // index not negative hence its in the newID array
        }
    },
    reminderTypes: state => {
        return state.reminderTypes;
    }
};

const mutations = {
    get_reminders_request(state){
        state.status = 'loading';
        state.error = null;
    },
    get_reminders_success(state, {reminders, types}){
        state.status = 'success';
        state.reminders = reminders;
        state.reminderTypes = types;
        // state.reminders = reminders.map(reminder => {
        //     const index = state.newIDs.indexOf(reminder._id);
        //     console.log("index of newID: "+ index);
        //     const isNew = (index < 0);
        //     if (isNew) state.newIDs.splice(index, 1);
        //     return {...reminder, isNew: false}
        // });
        state.error = null;
    },
    get_reminders_error(state, err){
        state.error = err.response.data.msg;
    }, 
    new_reminder_request(state){
        state.status = 'loading';
        state.error = null;
    },
    new_reminder_success(state, reminder){
        state.status = 'success';
        state.newIDs.push(reminder._id);
        state.error = null;
    },
    new_reminder_error(state, err){
        state.error = err.response.msg;
    },
    update_reminder_request(state) {
        state.status = 'loading';
        state.error = null;

    },
    update_reminder_success(state, reminder) {
        state.status = 'success';
        const index = state.newIDs.indexOf(reminder._id);
        if (index >= 0) state.newIDs.splice(index, 1);
        state.error = null;
    },
    update_reminder_error(state, err) {
        state.status = 'failed';
        state.status = err.response.msg;
    },
    remove_reminder_request(state) {
        state.status = 'loading';
        state.error = null;
    },
    remove_reminder_success(state, id) {
        state.status = 'success';
        const index = state.newIDs.indexOf(id);
        if (index >= 0) state.newIDs.splice(index, 1);
        state.error = null;
    },
    remove_reminder_error(state, err) {
        state.status = 'failed';
        state.status = err.response.msg;
    }
};

const actions = {
    async getReminders({commit}) {
        commit("get_reminders_request");
        try {
            let res = await axios.get('/api/reminders');
            if (res.data.success) {
                const reminders = res.data.reminders;
                const types = res.data.reminderTypes;
                commit('get_reminders_success', {reminders, types});
            }
            return res;
        } catch(err) {
            commit('get_reminders_error', err);
        }
    },
    async create({commit}, currentTime) {
        commit("new_reminder_request");
        try {
            // const date = new Date();
            // const hour = ('0' + date.getHours() % 24).slice(-2);
            // const minutes = ('0' + date.getMinutes() % 60).slice(-2);
            const newReminder = {
                start: currentTime,
                end: currentTime
            }
            let res = await axios.post('/api/reminders', newReminder);
            if (res.data.success) {
                // const reminders = res.data.reminder;
                console.log("new reminder to new_reminder_success");
                console.log(res.data.reminder);
                commit('new_reminder_success', res.data.reminder);
            }
            return res;

        } catch(err) {
            console.log("commit new_reminder_error");
            console.log(err);
            
            commit('new_reminder_error', err);
            
        }
    },
    async update({commit}, payload) {
        commit('update_reminder_request');
        let res = await axios.put('/api/reminders', payload);
        try { 
            if (res.data.success) {
                console.log(res.data.reminder);
                commit('update_reminder_success', res.data.reminder);
            }
            return res;

        } catch(err) {            
            commit('update_reminder_error', err);
        }
    },
    async remove({commit}, id) {
        commit('remove_reminder_request');
        console.log(id);
        let res = await axios.delete('/api/reminders', { data: { id } });
        try { 
            if (res.data.success) {
                // console.log(res.data.reminder);
                commit('remove_reminder_success', id);
            }
            return res;

        } catch(err) {            
            commit('remove_reminder_error', err);
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    dailyTimers: []
  },
  getters: {
    getDailyTimers: (state) => {
        return state.dailyTimers;
    },
    getDailyTimerByIndex: (state) => (index) => {
        return state.dailyTimers[index];
    }
  },
  mutations: {
    addDailyTimer(state, date) {
        let hour = ('0' + date.getHours() % 24).slice(-2);
        let minutes = ('0' + date.getMinutes() % 60).slice(-2);
        // initial values
        const newTimer = {
            startTime: `${hour}:${minutes}`,
            endTime: `${hour}:${minutes}`,
            period: 1,
            name: '',
            enabled: true,
            key: Math.random()
        }
        state.dailyTimers.push(newTimer);
    },
    updateTimer(state, payload) {
        Vue.set(state.dailyTimers[payload.index], 'startTime', payload.timer.startTime);
        Vue.set(state.dailyTimers[payload.index], 'endTime', payload.timer.endTime);
        Vue.set(state.dailyTimers[payload.index], 'period', payload.timer.period);
        Vue.set(state.dailyTimers[payload.index], 'name', payload.timer.name);
        //Vue.set(state.dailyTimers[payload.index], 'enabled', payload.timer.enabled);
        
    },
    removeTimer(state, index) {
        console.log('Removing index: ' + index);
        console.log(state.dailyTimers[index]);
        state.dailyTimers.splice(index, 1);
    }
  }
})
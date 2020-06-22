<template>
    <div id="app">
        <h1 class="row display-5 text-info text-center">
            Good to see you {{ user.username }} 
        </h1>
        <h1 class="row display-5 text-info text-center">
            Current time {{ presentTime }} 
        </h1>
        <hr >
        <button class="btn btn-info btn-lg" @click="createTimer">Create Daily Timer <i class="fas fa-stopwatch"></i></button>
        <timer-grid v-if="timers" :timers="timers"/>
    </div>
</template>

<script>
import TimerGrid from '../components/TimerGrid.vue';
import { mapActions, mapGetters } from 'vuex'; 

export default {
    name: 'App',
    components: {
        TimerGrid
    },
    data() {
        return {
            now: '',
        }
    },
    methods: {
        ...mapActions([
            'getProfile',
            'getTimers',
            'create'

        ]),
        setPresentTime(){
            this.now = new Date();
            setInterval(() => {
                this.now = new Date();               
            }, 1000);
        },
        async createTimer() {
            // make api call to create timer
            const time = `${this.nowHours}:${this.nowMinutes}`;
            await this.create(time);
            // if (res.data.success) {
                // reload the timers
            await this.getTimers();
            // }            
        }
    },
    computed: {
        ...mapGetters([
            'user',
            'timers'
        ]),
        nowHours() {
            return ('0' + this.now.getHours() % 60).slice(-2);
        },
        nowMinutes() {
            return ('0' + this.now.getMinutes() % 60).slice(-2);
        },
        nowSeconds() {
            return ('0' + this.now.getSeconds() % 60).slice(-2);
        },
        presentTime(){
            return `${this.nowHours} : ${this.nowMinutes} : ${this.nowSeconds}`;
        }
    },
    async created() {
        this.setPresentTime();
        // get user info

        await this.getProfile();
        // get timers from database
        await this.getTimers();
        // if (res.success) {

        // }
    }
}
</script>

<template>
  <div id="app">
    <div class="container">
        <div class="row justify-content-center">
            <img alt="Vue logo" src="./assets/logo.png">
            <h2 class="col-12 text-center">Welcome to Remindy: Organize your timers and get tasks done!</h2>
            <h1 class="col-12 display-5 text-info text-center">Current time {{ presentTime }}</h1> 
            <!-- <app-timer/> -->
        </div>
        <hr>
        <button class="btn btn-info btn-lg" @click="addDailyTimer(now)">Create Daily Timer</button>
        <app-timer-grid />
        <!-- <div ref="dailyTimerContainer" class="row justify-content-around">
        </div> -->
    </div>
  </div>
</template>

<script>
import TimerGrid from './components/TimerGrid.vue';
import { mapMutations } from 'vuex'; 

export default {
    name: 'App',
    components: {
        appTimerGrid: TimerGrid
    },
    data() {
        return {
            now: '',
        }
    },
    methods: {
        ...mapMutations([
            'addDailyTimer'
        ]),
        setPresentTime(){
            this.now = new Date();
            setInterval(() => {
                // let currentTime = new Date()
                // let hours = ('0' + currentTime.getHours()).slice(-2);
                // let minutes = ('0' + currentTime.getMinutes()).slice(-2);
                // let seconds = ('0' + currentTime.getSeconds()).slice(-2);
                
                // this.now = `${hours} : ${minutes} : ${seconds}`;   
                this.now = new Date();               
            }, 1000);
        }
    },
    computed: {
        nowHours() {
            return ('0' + this.now.getHours() % 60).slice(-2);
        },
        nowMinutes() {
            return ('0' + this.now.getMinutes() % 60).slice(-2);
        },nowSeconds() {
            return ('0' + this.now.getSeconds() % 60).slice(-2);
        },
        presentTime(){
            return `${this.nowHours} : ${this.nowMinutes} : ${this.nowSeconds}`;
        }
    },
    created() {
        //this.now = new Date();
        this.setPresentTime();
    }
}
</script>

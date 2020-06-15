<template>
  <div id="app">
    <div class="container">
        <div class="row justify-content-center">
            <img alt="Vue logo" src="./assets/logo.png">
            <h2 class="col-12 text-center">Welcome to Remindy: Organize your timers and get tasks done!</h2>
            <h1 class="col-12 display-5 text-info text-center">Current time {{ now }}</h1> 
            <app-timer/>
        </div>
        <hr>
        <button class="btn btn-info btn-lg" @click="generateTimer()">Create Daily Timer</button>
        <div ref="dailyTimerContainer" class="row justify-content-around">
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Timer from './components/Timer.vue';
export default {
    name: 'App',
    components: {
        appTimer: Timer
    },
    data() {
        return {
            now: ''
        }
    },
    methods: {
        displayCurrentTime(){
            setInterval(() => {
                let currentTime = new Date()
                let hours = ('0' + currentTime.getHours()).slice(-2);
                let minutes = ('0' + currentTime.getMinutes()).slice(-2);
                let seconds = ('0' + currentTime.getSeconds()).slice(-2);
                
                this.now = `${hours} : ${minutes} : ${seconds}`;                  
            }, 1000);
            
        },
        generateTimer() {
            let ComponentClass = Vue.extend(Timer);
            let instance = new ComponentClass({
                propsData: {isNew: true}
            });
            //instance.$slots.default = [];
            instance.$mount();
            this.$refs.dailyTimerContainer.appendChild(instance.$el);
        }
    },
    created() {
        //this.now = new Date();
        this.displayCurrentTime();
    }
}
</script>

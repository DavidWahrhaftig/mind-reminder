<template>
    <transition-group tag="div" class="row"
        enter-active-class="animate__animated animate__jackInTheBox"
        leave-active-class="animate__animated animate__bounceOut"
        >
    
    
        <app-timer class="col-xs-12 col-md-6 col-lg-4" 
                v-for="timer in timers" :key="timer._id"
                :timer="timer"
                />
    </transition-group>
</template>

<script>
import Timer from './DailyTimer/Timer.vue';
// import { mapGetters } from 'vuex';
export default {
    props: ['timers'],
    components: {
        appTimer: Timer
    },
    // computed: {
    //     ...mapGetters([
    //         'getDailyTimers'
    //     ]),
    // }
}
</script>
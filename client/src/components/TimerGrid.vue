<template>
    <div class="row">
        <app-timer class="col-xs-12 col-md-6 col-lg-4" 
                   v-for="(timer, i) in timers" :key="timer._id"
                   :timer="timer"
                   :index="i"
                   />
    </div>
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
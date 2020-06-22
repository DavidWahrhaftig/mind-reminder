<template>
    <transition-group tag="div" class="row"
        enter-active-class="animate__animated animate__jackInTheBox"
        leave-active-class="animate__animated animate__bounceOut">
        <timer 
            class="col-12 col-md-6 col-lg-4 p-0" 
            v-for="timer in timers" :key="timer._id"
            :timer="timer"/>
    </transition-group>
</template>

<script>
import Timer from './DailyTimer/Timer.vue';
// import { mapGetters } from 'vuex';
export default {
    props: ['timers'],
    components: {
        Timer
    }
}
</script>

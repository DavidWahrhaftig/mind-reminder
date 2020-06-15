<template>
    <div class="row">
        <app-timer class="col-xs-12 col-md-6 col-lg-4" 
                   v-for="(timer, i) in getDailyTimers" :key="timer.key"
                   :timer="timer"
                   :index="i"
                   />
    </div>
</template>

<script>
import Timer from './Timer.vue';
import { mapGetters } from 'vuex';
export default {
    components: {
        appTimer: Timer
    },
    computed: {
        ...mapGetters([
            'getDailyTimers'
        ]),
    }
}
</script>
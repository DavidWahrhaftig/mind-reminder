<template>
    <transition-group tag="div" class="row"
        enter-active-class="animate__animated animate__jackInTheBox"
        leave-active-class="animate__animated animate__bounceOut">
        <reminder 
            class="col-12 col-md-6 col-lg-4 p-0" 
            v-for="reminder in reminders" :key="reminder._id"
            :reminder="reminder"/>
    </transition-group>
</template>

<script>
import Reminder from './reminder/Reminder.vue';
// import { mapGetters } from 'vuex';
export default {
    props: ['reminders'],
    components: {
        Reminder
    }
}
</script>

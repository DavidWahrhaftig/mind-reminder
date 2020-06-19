<template>
  <div id="app">
    <Navbar/>
    <br>
    <br>
    <div class="container">
        <Errors v-if="error" :msg="error" /> 
        <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Errors from './components/Errors.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        Navbar,
        Errors
    },
    computed: {
        ...mapGetters([
            'error'
        ])
    }
}
</script>
<template>
    <div class="home row justify-content-center">
        <!-- <h1>Home Page</h1> -->
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <div class="jumbotron jumbotron-fluid">
            <div class="container  text-center">
                <h1 class="display-4">Welcome to Mind Reminder <i class="fas fa-hourglass-start"></i></h1>
                <p class="lead">Organize your timers and get reminded!</p>
                <div class="div" v-if="!isLoggedIn">
                    <router-link tag="button" to="/login" class="btn btn-primary navbar-bg mx-3">
                        Login
                    </router-link>
                    <router-link tag="button" to="/register" class="btn btn-primary navbar-bg">
                        Register
                    </router-link>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {  
  },
  computed: {
      ...mapGetters([
          'isLoggedIn'
      ])
  }
}
</script>
<style scoped>
.btn {
   border: none; 
}
.btn:hover {
    background: rgb(177, 0, 177);
}
    
</style>
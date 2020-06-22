<template>
    <nav class="navbar navbar-expand-lg navbar-dark navbar-bg">
        <div class="container">
            <router-link class="navbar-brand" to="/">MindReminder</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
                        <router-link to="/" class="nav-link">
                        Home
                        </router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link to="/about" class="nav-link">
                        About
                        </router-link>
                    </li> -->
                    <li class="nav-item" v-if="!isLoggedIn">
                        <router-link to="/login" class="nav-link">
                        Login
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="!isLoggedIn">
                        <router-link to="/register" class="nav-link">
                        Register
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="isLoggedIn">
                        <router-link to="/profile" class="nav-link">
                        Profile
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="isLoggedIn">
                        <a style="cursor:pointer;" to="/logout" class="nav-link" @click.prevent="logoutUser">
                        Logout
                        </a>
                    </li>
                    <li class="nav-item navbar navbar-dark text-light" v-if="isLoggedIn">
                        <span class="font-italic">{{user.username}}</span>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'isLoggedIn',
            'user'
        ])
    },
    methods: {
        ...mapActions([
            'logout'
        ]),
        async logoutUser(){
            await this.logout();
        }
    }
}
</script>

<style>
    .navbar-bg { 
        background: #64366e;
    }
</style>
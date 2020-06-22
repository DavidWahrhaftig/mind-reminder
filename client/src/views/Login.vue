<template>
    <div>
        <div class="row mt-1">
            <div class="card mx-auto">
                <div class="card-header text-white bg-primary">
                    <h4>Login</h4>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input 
                                    class="form-control"
                                    type="text" 
                                    id="username"
                                    placeholder="Username" 
                                    name="username"
                                    v-model="username"/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input 
                                    class="form-control"
                                    type="password" 
                                    id="password"
                                    placeholder="Password" 
                                    name="password"
                                    v-model="password"/>
                        </div>
                        <button @click.prevent="loginUser" class="btn btn-primary">Login</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <router-link to="/register" class="card-link">Need an account?</router-link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        ...mapActions([
            'login'
        ]),
        async loginUser() {
            console.log(this.username, this.password)
            let user = {
                username: this.username,
                password: this.password
            };
            
            await this.login(user);
            if (this.authState == 'success') {
                this.$router.push('/profile');
            }
            // this.login(user).then(() => {
            //     if (this.authState == 'success') {
            //         this.$router.push('/profile');
            //     }
            // }).catch( err => {
            //     console.log(err);
            // });

        }
    },
    computed:{ 
        ...mapGetters([
            'authState'
        ])
    }

}
</script>

<style scoped>
    .card {
        width: 60%;
        /* border-radius: 0; */
    }
    .btn {
        /* border-radius: 0; */
    }
    .form-control {
        /* border-radius: 0; */
    }
</style>
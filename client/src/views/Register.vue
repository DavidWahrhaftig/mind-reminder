<template>
  <div>
      <div class="row mt-4">
          <div class="card mx-auto">
              <div class="card-header text-white bg-primary">
                  <h4>Register</h4>
              </div>
              <div class="card-body">
                  <form>
                        <!-- username -->
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
                        <!-- name -->
                        <div class="form-group">
                          <label for="username">Name</label>
                          <input 
                                class="form-control"
                                type="text" 
                                id="name"
                                placeholder="Name" 
                                name="name"
                                v-model="name"/>
                        </div>
                        <!-- email -->
                        <div class="form-group">
                            <label for="username">Email</label>
                            <input 
                                    class="form-control"
                                    type="email" 
                                    id="email"
                                    placeholder="Email" 
                                    name="email"
                                    v-model="email"/>
                        </div>
                        <!-- password -->
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
                        <!-- confirm password -->
                        <div class="form-group">
                            <label for="confirm_password">Confirm Password</label>
                            <input 
                                    class="form-control"
                                    type="password" 
                                    id="confirm_password"
                                    placeholder="Confirm Password" 
                                    name="confirm_password"
                                    v-model="confirm_password"/>
                        </div>
                        <button @click.prevent="registerUser" class="btn btn-primary">Register</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <router-link to="/login" class="card-link">Already have an account?</router-link>
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
            name: '',
            email: '',
            username: '',
            password: '',
            confirm_password: ''
        }
    },
    methods: {
        ...mapActions([
            'register'
        ]),
        async registerUser() {
            let user = {
                username: this.username,
                password: this.password,
                confirm_password: this.confirm_password,
                email: this.email,
                name: this.name
            };

            let res = await this.register(user);
            if (res.data.success) {
                this.$router.push('/login');
            }
        }
    },
    computed: {
        ...mapGetters([
            'authState'
        ])
    }
}
</script>

<style>

</style>
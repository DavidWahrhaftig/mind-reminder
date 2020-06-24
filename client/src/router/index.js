import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { store } from '../store';

Vue.use(VueRouter)

    const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: () => import( '../views/About.vue')
    },
    {
        path: '/login',
        name: 'login',
        // lazy component loading
        component: () => import( '../views/Login.vue'),
        meta: {
            // protect from logged in user
            requiresGuest: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue'),
        meta: {
            // protect from logged in user
            requiresGuest: true
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Profile.vue'),
        // afterEnter: async() => {
        //     await store.actions.getProfile();
        // },
        meta: {
            // protect from not logged in user
            requiresAuth: true
        }
    },
    {
        path: '/reviews',
        name: 'reviews',
        component: () => import('../views/Reviews.vue'),
        // afterEnter: async() => {
        //     await store.actions.getProfile();
        // },
        meta: {
            // protect from not logged in user
            requiresAuth: true
        }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if(!store.getters.isLoggedIn){
            // Redirect to the login page
            next('/login');
        } else { 
            // user has token 
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if(store.getters.isLoggedIn){
            // user cannot login or register again
            // Redirect to the login page
            next('/profile');
        } else { 
            next();
        }
    } else { // anyone
        next();
    }
});

export default router;

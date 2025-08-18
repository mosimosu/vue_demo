import {createWebHistory, createRouter} from 'vue-router'
import Signup from '../pages/SignUp/index.vue'
import Login from '../pages/Login/index.vue'
import Home from '../pages/Home/index.vue'

const routes = [
    {path: '/signup', component: Signup},
    {path: '/', component: Login},
    {path: '/home', component: Home},
]

/**
 * router instance
 * @type {Router}
 */
const router = createRouter({
    history: createWebHistory(),
    routes  // short for `routes: routes`
})

const isAuthenticated = () => {
    return !!sessionStorage.getItem('token');
}

router.beforeEach((to, from, next) => {
    if (to.path === '/home' && !isAuthenticated()) {
        next('/')
    } else {
        next()
    }
})

export default router
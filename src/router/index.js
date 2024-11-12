import { createWebHistory, createRouter } from 'vue-router'
import SignUp from '../pages/SignUp.vue'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'

const routes = [
    { path: '/', component: SignUp },
    { path: '/login', component: Login },
    { path: '/home', component: Home },
]

/**
 * router instance
 * @type {Router}
 */
 const router = createRouter({
    history: createWebHistory(),
    routes  // short for `routes: routes`
})

export default router
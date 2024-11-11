import { createWebHistory, createRouter } from 'vue-router'
import SignUp from '../pages/SignUp.vue'
import Login from '../pages/Login.vue'
const routes = [
    { path: '/', component: SignUp },
    { path: '/login', component: Login },]

 const router = createRouter({
    history: createWebHistory(),
    routes  // short for `routes: routes`
})

export default router
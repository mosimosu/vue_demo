import {createApp} from 'vue'

// Vuetify
import vuetify from './plugins/vuetify'

// TanStack Query
import {VueQueryPlugin} from "@tanstack/vue-query";
import {queryClient} from './api/queryClient.js'

// Pinia
import {createPinia} from "pinia";

import App from './App.vue'
import router from './router'

const pinia = createPinia()


createApp(App).use(router).use(vuetify).use(VueQueryPlugin, {queryClient}).use(pinia).mount('#app')

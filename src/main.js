import {createApp} from 'vue'

// Vuetify
import vuetify from './plugins/vuetify'

// TanStack Query
import {VueQueryPlugin} from "@tanstack/vue-query";
import {queryClient} from './api/queryClient.js'

import App from './App.vue'
import router from './router'


createApp(App).use(router).use(vuetify).use(VueQueryPlugin, {queryClient}).mount('#app')

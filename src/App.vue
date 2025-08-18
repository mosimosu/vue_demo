<script setup>
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const nickname = ref(sessionStorage.getItem('user') || '')
const isAuthenticated = computed(() => !!nickname.value)

const logout = () => {
  sessionStorage.clear()
  router.push('/')
}
</script>

<template>
  <v-app>
    <v-app-bar v-if="isAuthenticated" dark>
      <v-toolbar-title>{{ nickname }}'s Todo List</v-toolbar-title>
      <v-spacer/>
      <v-btn color="error" @click="logout" size="small">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
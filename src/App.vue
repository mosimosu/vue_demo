<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const router = useRouter()
const userStore = useUserStore()
const isAuthenticated = computed(() => !!userStore.nickname)

const logout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<template>
  <v-app>
    <v-app-bar v-if="isAuthenticated" dark>
      <v-toolbar-title>{{ userStore.nickname }}'s Todo List</v-toolbar-title>
      <v-spacer />
      <v-btn color="error" size="small" @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    nickname: sessionStorage.getItem('user') || '',
  }),
  actions: {
    setNickname(name) {
      this.nickname = name
      sessionStorage.setItem('user', name)
    },
    logout() {
      this.nickname = ''
      sessionStorage.clear()
    },
  },
})

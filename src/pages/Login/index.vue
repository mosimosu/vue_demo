<script setup>
defineOptions({ name: 'LoginPage' })
/**
 * import function
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLogin } from '@/api/queries'
import { useUserStore } from '../../stores'

// 定義 router
const router = useRouter()
// 帳號
const email = ref('')
// 密碼
const password = ref('')
// 登入失敗 flag
const loginFail = ref(false)
// 定義 passwordInput
const passwordInput = ref(null)
// 定義 passwordInput focus
const focusPassword = () => {
  passwordInput.value.focus()
}
const userStore = useUserStore()

const { mutate: loginMutate } = useLogin({
  onSuccess: (res) => {
    const token = res.headers.authorization
    sessionStorage.setItem('token', token)
    const data = res.data
    if (data.message === '登入成功') {
      userStore.setNickname(data.nickname)
      router.push('/home')
    } else if (data.message === '登入失敗') {
      loginFail.value = true
      setTimeout(() => {
        loginFail.value = false
      }, 3000)
    }
  },
  onError: () => {
    loginFail.value = true
    setTimeout(() => {
      loginFail.value = false
    }, 3000)
  },
})

const login = () => {
  loginMutate({
    user: {
      email: email.value,
      password: password.value,
    },
  })
}

const goSignup = () => {
  router.push('/signup')
}
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="8" lg="8" xl="8">
        <v-card>
          <v-card-title>
            <span class="text-h5">Login</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                id="email"
                v-model="email"
                label="Email"
                type="text"
                name="email"
                @keyup.enter="focusPassword"
              />
              <v-text-field
                id="password"
                ref="passwordInput"
                v-model="password"
                label="Password"
                type="password"
                name="password"
                @keyup.enter="login"
              />
              <v-spacer />
              <v-row align="center" justify="center">
                <v-col cols="auto">
                  <v-btn color="primary" type="submit">Login</v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn color="secondary" type="button" @click="goSignup"
                    >Sign Up</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
            <v-alert v-show="loginFail" type="error" dismissible class="mt-3">
              登入失敗，請重新登入
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>

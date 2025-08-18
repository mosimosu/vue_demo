import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLogin } from '@/api/queries'
import { useUserStore } from '@/stores'

export function useLoginForm() {
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const loginFail = ref(false)
  const passwordInput = ref(null)
  const userStore = useUserStore()

  const focusPassword = () => {
    passwordInput.value?.focus()
  }

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

  return {
    email,
    password,
    loginFail,
    passwordInput,
    focusPassword,
    login,
    goSignup,
  }
}

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSignUp } from '@/api/queries'

export function useSignUpForm() {
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const passwordCheck = ref('')
  const nickname = ref('')
  const signUpFlag = ref(null)
  const passwordMismatch = ref(false)

  const { mutate: signUpMutate } = useSignUp({
    onSuccess: (res) => {
      const data = res.data
      if (data.message === '註冊成功') {
        signUpFlag.value = 1
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } else if (data.error?.[0] === '電子信箱 已被使用') {
        signUpFlag.value = 2
      }
    },
    onError: () => {
      signUpFlag.value = 2
    },
  })

  const signUp = () => {
    if (password.value !== passwordCheck.value) {
      passwordMismatch.value = true
      return
    }
    passwordMismatch.value = false
    signUpMutate({
      user: {
        nickname: nickname.value,
        email: email.value,
        password: password.value,
      },
    })
  }

  const goLogin = () => {
    router.push('/')
  }

  return {
    email,
    password,
    passwordCheck,
    nickname,
    signUpFlag,
    passwordMismatch,
    signUp,
    goLogin,
  }
}

<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="=12" md="8" lg="8" xl="8">
        <v-card>
          <v-card-title>
            <span class="text-h5">Sign Up</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signUp">
              <v-text-field
                  label="Nickname"
                  v-model="nickname"
                  name="nickname"
                  id="nickname"
                  outlined
                  class="mb-3"
              />
              <v-text-field
                  label="Email"
                  v-model="email"
                  name="email"
                  id="email"
                  type="email"
                  outlined
                  class="mb-3"
              />
              <v-text-field
                  label="Password"
                  v-model="password"
                  name="password"
                  id="password"
                  type="password"
                  outlined
                  class="mb-3"
              />
              <v-text-field
                  label="Password Check"
                  v-model="passwordCheck"
                  name="passwordCheck"
                  id="passwordCheck"
                  type="password"
                  outlined
                  class="mb-3"
                  @keyup.enter="signUp"
              />
              <v-btn color="primary" type="submit" block>Sign Up</v-btn>
            </v-form>
            <v-alert
                v-show="signUpFlag === 2"
                type="error"
                dismissible
                class="mt-3"
            >
              Your email is already registered. Please try again.
            </v-alert>
            <v-alert
                v-show="signUpFlag === 1"
                type="success"
                dismissible
                class="mt-3"
            >
              Registration successful. Redirecting to user page...
            </v-alert>
            <v-alert
                v-show="passwordMismatch"
                type="error"
                dismissible
                class="mt-3"
            >
              Your passwords do not match. Please try again.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
/**
 * import function
 */
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useSignUp} from '../../api/queries/login.js';

/**
 * 定義變數
 */
// 路由
const router = useRouter();
// 使用者信箱
const email = ref('');
// 使用者密碼
const password = ref('');
// 使用者密碼確認
const passwordCheck = ref('');
// 使用者暱稱
const nickname = ref('');
// 註冊狀態
const signUpFlag = ref(null);
// 密碼不一致
const passwordMismatch = ref(false);

const {mutate: signUpMutate} = useSignUp({
  onSuccess: (res) => {
    const data = res.data;
    if (data.message === '註冊成功') {
      signUpFlag.value = 1;
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else if (data.error?.[0] === '電子信箱 已被使用') {
      signUpFlag.value = 2;
    }
  },
  onError: () => {
    signUpFlag.value = 2;
  }
});

const signUp = () => {
  if (password.value !== passwordCheck.value) {
    passwordMismatch.value = true;
    return;
  }
  passwordMismatch.value = false;
  signUpMutate({
    user: {
      nickname: nickname.value,
      email: email.value,
      password: password.value,
    }
  });
};

</script>


<style scoped>

</style>
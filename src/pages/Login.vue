<template>
<div>
  <h1>Login</h1>
  <label for="email">
    Email
    <input type="text" name="email" id="email" v-model="email" :keydown.enter="login">
  </label>
  <label for="password">
    Password
    <input type="password" name="password" id="password" v-model="password" :keydown.enter="login">
  </label>
  <button @click="login">Login</button>
  <p v-show="loginFail">登入失敗，請重新登入</p>
</div>
</template>

<script setup>
/**
 * import function
 */
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {apiBatch, postToAPI} from '../api/apiV1.js';

// 定義 router
const router = useRouter();
// 帳號
const email = ref('');
// 密碼
const password = ref('');
// 登入失敗 flag
const loginFail = ref(false);
/**
 * login
 * @return {Promise<void>}
 */
const login = async () => {
  const res = await postToAPI(apiBatch.login,null, {
    user:{
      email: email.value,
      password: password.value
    }
  });
  // 取得 token
  const token = res.headers.get('Authorization')
  // 將 token 存到 sessionStorage
  sessionStorage.setItem('token', token);
  // 取得登入成功後的資料
  const data = await res.json();
  // 判斷登入成功後的資料
  if (data.message === '登入成功') {
    sessionStorage.setItem('user', JSON.stringify(data.nickname));
    // 登入成功後，跳轉到首頁
    await router.push('/home')
  }else if(data.message === '登入失敗'){
    loginFail.value = true;
    setTimeout(() => {
      loginFail.value = false;
    }, 3000);
  }
}

</script>

<style scoped>

</style>
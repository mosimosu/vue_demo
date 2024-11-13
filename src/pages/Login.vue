<template>
<div>
  <h1>Login</h1>
  <label for="email">
    Email
    <input
        type="text"
        name="email"
        id="email"
        v-model="email"
        @keyup.enter="focusPassword" />
  </label>
  <label for="password">
    Password
    <input
        type="password"
        name="password"
        id="password"
        v-model="password"
        @keyup.enter="login"
        ref="passwordInput" />
  </label>
  <button @click="login">Login</button>
  <p v-show="loginFail">登入失敗，請重新登入</p>
</div>
</template>

<script setup>
/**
 * import function
 */
import {onMounted, ref} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {apiBatch, getToAPI, postToAPI} from '../api/apiV1.js';

// 定義 router
const router = useRouter();
// 定義 route
const route = useRoute();
// 帳號
const email = ref('');
// 密碼
const password = ref('');
// 定義 nickname
const nickname = ref( '');
// 登入失敗 flag
const loginFail = ref(false);
// 定義 passwordInput
const passwordInput = ref(null);
// 定義 passwordInput focus
const focusPassword = () => {
  passwordInput.value.focus();
}


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
/**
 * 確認是否登入
 * @type {function}
 * @return {void}
 */
onMounted(async () => {
  // 利用 route 判斷是否從 signUp 頁面來的
  if(route.from?.path === '/') {
    return
  }
  // 取得 token
  const token = sessionStorage.getItem('token');
  // 取得 nickname
  nickname.value = sessionStorage.getItem('user');

  // 判斷是否授權
  try {
    if(token){
      // 判斷是否授權 API
      const res = await getToAPI(apiBatch.check, token)

      // 取得回傳資料
      const checkRes = await res.json();

      // 如果未授權，跳轉至登入畫面
      if (checkRes.message === '未授權') {
        alert('未授權，請重新登入');
        // 3秒後跳轉至登入畫面
        setTimeout(() => {
          router.push('/login')
        }, 3000);
      }
      // 如果授權，跳轉至使用者畫面
      if (checkRes.message === 'OK!') {
        // 跳轉至使用者畫面
        await router.push('/home')
      }}
  }catch (error) {
    // 將錯誤回傳
    return error;
  }

})

</script>

<style scoped>

</style>

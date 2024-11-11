<template>
  <h1>Sign Up</h1>
  <label for="">
    Nickname
    <input type="text" name="nickname" id="nickname" v-model="nickname">
  </label>
  <label for="email">
    Email
    <input type="text" name="email" id="email" v-model="email">
  </label>
  <label for="password">
    Password
    <input type="password" name="password" id="password" v-model="password">
  </label>
  <button @click="signUp">Sign up</button>

<!--  v-show 是用來控制畫面顯示與否（css 的 display 來控制），v-if 是用來控制畫面是否存在（是否 render 結點來控制）-->
  <div v-show="signUpFlag !== null">
    <h2 v-if="signUpFlag === 2">您的電子信箱已經註冊，將自動跳轉至登入畫面</h2>
    <h2 v-if="signUpFlag === 1">註冊完成，將自動跳轉至使用者畫面</h2>
  </div>
</template>

<script setup>
/**
 * import function
 */
import { ref } from 'vue';
import {apiBatch, postToAPI} from '../api/apiV1.js';
import { useRouter } from 'vue-router';

/**
 * 定義變數
 */
// 路由
const router = useRouter();
// 使用者信箱
const email = ref('');
// 使用者密碼
const password = ref('');
// 使用者暱稱
const nickname = ref('');
// 註冊狀態
const signUpFlag = ref(null);

/**
 * 註冊功能
 * @return {Promise<void>}
 */
const signUp = async () => {
  const res = await postToAPI(apiBatch.signUp, {
    user:{
      nickname: nickname.value,
      email: email.value,
      password: password.value,}

  });
  // 根據訊息判斷是否註冊成功
  if(res.message === '註冊成功') {
    // 註冊成功
    signUpFlag.value = 1;
    // 3秒後跳轉至使用者畫面
    setTimeout(() => {
        router.push('/login');}, 3000);
  }else if(res.error[0] === '電子信箱 已被使用') {
    // 電子信箱已被使用
    signUpFlag.value = 2;
    // 3秒後跳轉至登入畫面
    setTimeout(() => {
        router.push('/login');}, 3000);
  }
}
</script>


<style scoped>

</style>
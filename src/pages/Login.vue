<template>
<div>
  <h1>Login</h1>
  <label for="email">
    Email
    <input type="text" name="email" id="email" v-model="email">
  </label>
  <label for="password">
    Password
    <input type="password" name="password" id="password" v-model="password">
  </label>
  <button @click="login">Login</button>
</div>
</template>

<script setup>
import { ref } from 'vue';
import {apiBatch, postToAPI} from '../api/apiV1.js';

const email = ref('');
const password = ref('');
const login = async () => {
  const res = await postToAPI(apiBatch.login, {
    user:{
      email: email.value,
      password: password.value
    }
  });
  console.log(res.message);
}

</script>



<style scoped>

</style>
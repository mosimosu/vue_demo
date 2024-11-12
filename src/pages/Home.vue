<template>
<div class="container">

  <h1>{{nickname}}'s Todo List</h1>
  <div class="todo-list" v-for="(todo,index) in todos" :key="todo.id">
    <div class="todo-item">
      <p>item <span style="color: red; font-weight: bold">{{index + 1 }}</span></p>
      <p>{{todo.id}}</p>
      <p>{{todo.content}}</p>
    </div>
  </div>

</div>

</template>

<script setup>
/**
 * import function
 */
import {reactive, ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {apiBatch, getToAPI} from "../api/apiV1.js";

// 定義 router
const router = useRouter();
// 定義 nickname
const nickname = ref('');
// 定義 todos
const todos = reactive([]);

/**
 * 取得內容
 * @return {Promise<void>}
 */
const getContent = async () => {
  // 取得 token
  const token = sessionStorage.getItem('token');
  // 傳送 get 請求
  const res = await getToAPI(apiBatch.getTodos,token);
  // 取得回傳資料
  const data = await res.json();
  // 判斷是否授權
  if (data.message === '未授權') {
    alert('未授權，請重新登入');
    setTimeout(() => {
      router.push('/login')
    }, 3000);
  }

  // 取得 nickname
  nickname.value = sessionStorage.getItem('user').split('"')[1];
  // 取得 todos
  todos.push(...data.todos)
}

/**
 * onMounted
 * @type {function}
 * @return {void}
 * @description 取得內容
 */
onMounted(() => {
  getContent()
})


</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.todo-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.todo-item {
  width: fit-content;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;
  border: 1px solid #000;
  gap: 1rem;
  padding: 1rem;
}
</style>
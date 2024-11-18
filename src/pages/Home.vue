<template>
<div class="container">
<div class="header">
  <h1>{{nickname}}'s Todo List</h1> <button type="button" @click="logout">Logout</button>
</div>
<div class="add-todo">
  <label for="todo">Input</label>
  <input id="todo" type="text"
         @input="adjustWidth"
         @keyup.enter="handleSubmit"
         v-model="todo"
  />
  <button type="button" @click="handleSubmit">Submit</button>

</div>
  <div class="todo-list" v-for="(todo, index) in todos" :key="todo.id">
    <div class="todo-item">
      <p>item <span style="color: red; font-weight: bold">{{index + 1 }}</span></p>
      <p>{{todo.id}}</p>
      <p v-if="todo.editFlag === false">{{todo.content}}</p>
      <input v-if="todo.editFlag === true" type="text" v-model="todo.content" @keyup.enter="()=>editTodo(todo)" @keyup.esc="todo.editFlag = false" />
      <button type="button" @click="() => deleteTodo(todo)">Delete</button>
      <button v-if="todo.editFlag === false" type="button" @click="todo.editFlag = true">Edit</button>
      <button v-if="todo.editFlag === true" type="button" @click="()=> editTodo(todo)">Save</button>
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
import {apiBatch, getToAPI, postToAPI} from "../api/apiV1.js";

// 定義 router
const router = useRouter();
// 定義 nickname
const nickname = ref('');
// 定義 todos
const todos = reactive([]);
// 定義 todo
const todo = ref('');

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
  // 為 todos 加上 editFlag
  const todosWithEdit = data.todos.map(todo=>({...todo, editFlag: false}));

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
  todos.push(...todosWithEdit.reverse());
}

/**
 * 登出
 * @return {void}
 */
const logout = () => {
  // 清除 sessionStorage
  sessionStorage.clear();
  // 導向登入頁
  router.push('/login');
}

/**
 * 新增 todo
 * @returns {Promise<void>}
 */
const addTodo = async () => {
  // 取得 token
  const token = sessionStorage.getItem('token');
  // 傳送 post 請求
  const res = await postToAPI({url:apiBatch.postTodos, token:token, data:
  {
    todo:{
      content: todo.value
    }
  }
  });
  // 取得回傳資料
  const data = await res.json();
  // 判斷是否授權
  if (data.message === '未授權') {
    alert('未授權，請重新登入');
    setTimeout(() => {
      router.push('/login')
    }, 3000);
  }
  // 取得 todos
  todo.value = '';
  // 清空 todos
  todos.length = 0;
}

/**
 * 刪除 todo
 * @param todo {Object}
 * @returns {Promise<void>}
 */
const deleteTodo = async (todo) => {
  // 取得 token
  const token = sessionStorage.getItem('token');
  // 傳送 post 請求
  const res = await postToAPI({url:apiBatch.deleteTodos, method:'delete', token:token, data:{id:todo.id}});
  // 取得回傳資料
  const data = await res.json();
  // 判斷是否授權
  if (data.message === '未授權') {
    alert('未授權，請重新登入');
    setTimeout(() => {
      router.push('/login')
    }, 3000);
  }
  // 取得 todos
  todo.value = '';
  // 清空 todos
  todos.length = 0;
  // 重新取得內容
  getContent();
}

/**
 * 編輯 todo
 * @param todo {Object}
 * @returns {Promise<void>}
 */
const editTodo = async (todo) => {
  // 取得 token
  const token = sessionStorage.getItem('token');
  // 傳送 post 請求
  const res = await postToAPI({url:apiBatch.postTodos, method:'put', token:token, data:{id:todo.id, todo:{content:todo.content}}});
  // 取得回傳資料
  const data = await res.json();
  // 判斷是否授權
  if (data.message === '未授權') {
    alert('未授權，請重新登入');
    setTimeout(() => {
      router.push('/login')
    }, 3000);
  }
  // 取得 todos
  todo.value = '';
  // 清空 todos
  todos.length = 0;
  // 重新取得內容
  await getContent();
}

/**
 * 新增 todo 並取得內容
 * @return {Promise<void>}
 */
const handleSubmit = async (todo) => {
  await addTodo();
  await getContent();
}

/**
 * 調整輸入框寬度
 * @param e {Event}
 * @return {void}
 */
const adjustWidth = (e) => {
  const input = e.target;
  const span = document.createElement('span');
  span.style.visibility = 'hidden';
  span.style.position = 'absolute';
  span.style.whiteSpace = 'pre';
  span.style.font = window.getComputedStyle(input).font;
  span.textContent = input.value;
  document.body.appendChild(span);

  // 移除之前額外加入的 4px
  input.style.width = `${span.offsetWidth}px`;
  document.body.removeChild(span);
}

/**
 * 取得並渲染內容
 * @type {function}
 * @return {void}
 */
onMounted(() => {
  getContent()
})

/**
 * 確認登入
 * @type {function}
 * @return {Promise<void>}
 */
onMounted(async () => {
  // 取得 token
  const token = sessionStorage.getItem('token');
  try {
    if(token){
      // 判斷是否授權
      const res = await getToAPI(apiBatch.check, token)

      // 取得回傳資料
      const checkRes = await res.json();

      // 判斷是否授權
      if (checkRes.message === '未授權') {
        alert('未授權，請重新登入');
        setTimeout(() => {
          router.push('/login')
        }, 3000);
      }
      if (checkRes.message === 'OK!') {
        // 取得 nickname
        nickname.value = sessionStorage.getItem('user').split('"')[1];
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
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  border: 1px solid #000;
  gap: 1rem;
  padding: 1rem;
}

.add-todo {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  gap: 1rem;
  padding: 1rem;
  & > label {
    font-size: 1.5rem;
  }
  & > input {
    min-width: 300px;
    resize: horizontal;
    border: 1px solid #000;
    padding: 0.5rem;
  }
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
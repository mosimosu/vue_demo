<template>
  <v-container class="py-8">
    <v-row justify="center" class="w-100">
      <v-col cols="12" md="12" lg="12" xl="12">
        <v-card class="mb-6">
          <v-card-title>
            <v-row align="center" justify="space-between" class="w-100 pa-4">
              <span class="text-h5">{{ nickname }}'s Todo List</span>
              <v-btn color="error" @click="logout" size="small">Logout</v-btn>
            </v-row>
          </v-card-title>
        </v-card>
        <v-card class="mb-6">
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <v-row align="center">
                <v-col>
                  <v-text-field
                      label="Add a new todo"
                      v-model="todo"
                      @input="adjustWidth"
                      outlined
                  />
                </v-col>
                <v-col cols="auto">
                  <v-btn color="primary" type="submit">Add</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
        <v-row>
          <v-col
              v-for="(todo, index) in todos"
              :key="todo.id"
              cols="12"
              sm="6"
              md="6"
              lg="4"
          >
            <v-card>
              <v-card-title class="pa-6">
                <v-row align="center">
                  <span>Item <span style="color: red; font-weight: bold">{{ index + 1 }}</span></span>
                  <v-spacer/>
                  <v-btn icon color="success" @click="() => finished(todo)" size="small" class="mr-1">
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                  <v-btn icon color="error" @click="() => deleteTodo(todo)" size="small">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-row>
              </v-card-title>
              <v-card-text>
                <div v-if="!todo.editFlag">{{ todo.content }}</div>
                <v-text-field
                    v-if="todo.editFlag"
                    v-model="todo.content"
                    @keyup.enter="() => editTodo(todo)"
                    @keyup.esc="todo.editFlag = false"
                    outlined
                    dense
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                    v-if="!todo.editFlag"
                    color="info"
                    @click="todo.editFlag = true"
                    size="small"
                >Edit
                </v-btn>
                <v-btn
                    v-if="todo.editFlag"
                    color="primary"
                    @click="() => editTodo(todo)"
                    size="small"
                >Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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
  const res = await getToAPI(apiBatch.getTodos, token);
  // 取得回傳資料
  const data = await res.json();
  // 為 todos 加上 editFlag
  const todosWithEdit = data.todos.map(todo => ({...todo, editFlag: false}));

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
  const res = await postToAPI({
    url: apiBatch.postTodos, token: token, data:
        {
          todo: {
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
  const res = await postToAPI({url: apiBatch.deleteTodos, method: 'delete', token: token, data: {id: todo.id}});
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
 * 編輯 todo
 * @param todo {Object}
 * @returns {Promise<void>}
 */
const editTodo = async (todo) => {
  // 取得 token
  const token = sessionStorage.getItem('token');
  // 傳送 post 請求
  const res = await postToAPI({
    url: apiBatch.postTodos,
    method: 'put',
    token: token,
    data: {id: todo.id, todo: {content: todo.content}}
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
  // 重新取得內容
  await getContent();
}

/**
 * 完成 todo
 * @param todo {Object}
 * @returns {Promise<void>}
 */
const finished = async (todo) => {
  console.log(todo)
  // 取得 token
  const token = sessionStorage.getItem('token');
  // 傳送 post 請求
  const res = await postToAPI({url: apiBatch.postTodos, method: 'patch', token: token, data: {id: todo.id}});
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
const handleSubmit = async () => {
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
    if (token) {
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
      }
    }
  } catch (error) {
    // 將錯誤回傳
    return error;
  }

})


</script>

<style scoped>

</style>
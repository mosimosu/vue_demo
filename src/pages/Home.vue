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
              v-for="(item, index) in todosWithEdit"
              :key="item.id"
              cols="12"
              sm="6"
              md="6"
              lg="4"
          >
            <v-card>
              <v-card-title class="pa-6">
                <v-row align="center">
                  <span>Item <span style="color: red; font-weight: bold">{{ index + 1 }}</span></span>
                  <span v-if="item.completed_at" class="ml-2">
  <v-chip color="success" size="small" label>Finished</v-chip>
</span>
                  <v-spacer/>
                  <v-btn icon color="success" @click="() => finished(item)" size="small" class="mr-1">
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                  <v-btn icon color="error" @click="() => deleteTodo(item)" size="small">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-row>
              </v-card-title>
              <v-card-text>
                <div v-if="!item.editFlag" :style="item.completed_at ? 'text-decoration: line-through; color: #888;' : ''">{{ item.content }}</div>
                <v-text-field
                    v-if="item.editFlag"
                    v-model="item.content"
                    @keyup.enter="() => editTodo(item)"
                    @keyup.esc="setEditFlag(item.id, false)"
                    outlined
                    dense
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                    v-if="!item.editFlag"
                    color="info"
                    @click="() => setEditFlag(item.id, true)"
                    size="small"
                >Edit
                </v-btn>
                <v-btn
                    v-if="item.editFlag"
                    color="primary"
                    @click="() => editTodo(item)"
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
import {ref, onMounted, computed} from "vue";
import {useRouter} from "vue-router";
import {useTodos, useAddTodo, useEditTodo, useDeleteTodo, useToggleTodo} from "../api/queries/todos";

// 定義 router
const router = useRouter();
// 定義 nickname
const nickname = ref('');
// 定義 todoList
const todo = ref('');
// 依 id 記錄 editFlag
const editFlags = ref({});

// API hooks
const {data: todosData, refetch: refetchTodos} = useTodos();
const {mutate: addTodoMutate} = useAddTodo();
const {mutate: editTodoMutate} = useEditTodo();
const {mutate: deleteTodoMutate} = useDeleteTodo();
const {mutate: toggleTodoMutate} = useToggleTodo();

// Local editFlag state
const todosWithEdit = computed(() => {
  if (!todosData.value) return [];
  return todosData.value.todos
      .map(t => ({
        ...t,
        editFlag: !!editFlags.value[t.id]
      }))
      .reverse();
});

const setEditFlag = (id, value) => {
  editFlags.value[id] = value;
};

// Sync nickname from sessionStorage
onMounted(() => {
  const user = sessionStorage.getItem('user');
  nickname.value = user ? JSON.parse(user) : '';
});

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

// Delete
const deleteTodo = (item) => {
  deleteTodoMutate(
      item,
      {
        onSuccess: () => {
          refetchTodos();
        },
        onError: () => {
          alert('Unauthorized, please login again');
          setTimeout(() => router.push('/login'), 3000);
        }
      }
  );
};

// Edit
const editTodo = (item) => {
  editTodoMutate(
      item,
      {
        onSuccess: () => {
          setEditFlag(item.id, false);
          refetchTodos();
        },
        onError: () => {
          alert('Unauthorized, please login again');
          setTimeout(() => router.push('/login'), 3000);
        }
      }
  );
};

// Finish
const finished = (item) => {
  toggleTodoMutate(
      item,
      {
        onSuccess: () => {
          refetchTodos();
        },
        onError: () => {
          alert('Unauthorized, please login again');
          setTimeout(() => router.push('/login'), 3000);
        }
      }
  );
};

// Add
const handleSubmit = () => {
  addTodoMutate(
      {content: todo.value},
      {
        onSuccess: () => {
          todo.value = '';
          refetchTodos();
        },
        onError: (err) => {
          alert('Unauthorized, please login again');
          setTimeout(() => router.push('/login'), 3000);
        }
      }
  );
};


</script>

<style scoped>

</style>
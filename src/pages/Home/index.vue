<script setup>
/**
 * import function
 */
import {ref, onMounted, computed} from "vue";
import {useRouter} from "vue-router";
import {useTodos, useAddTodo, useEditTodo, useDeleteTodo, useToggleTodo} from "@/api/queries";
import TodoList from './components/TodoList.vue';
import AddTodoForm from './components/AddTodoForm.vue';

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
  nickname.value = user ? user : '';
});

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
          setTimeout(() => router.push('/'), 3000);
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
          setTimeout(() => router.push('/'), 3000);
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
          setTimeout(() => router.push('/'), 3000);
        }
      }
  );
};

// Add
const handleSubmit = (content) => {
  addTodoMutate({ content }, {
    onSuccess: () => refetchTodos(),
    onError: () => {
      alert('Unauthorized, please login again');
      setTimeout(() => router.push('/'), 3000);
    }
  });
};


</script>
<template>
  <v-container class="py-8">
    <v-row justify="center" class="w-100">
      <v-col cols="12" md="12" lg="12" xl="12">
        <v-card class="mb-6">
          <v-card-text>
            <AddTodoForm @add="handleSubmit"/>
          </v-card-text>
        </v-card>
        <TodoList
            :todos="todosWithEdit"
            @edit="editTodo"
            @delete="deleteTodo"
            @finish="finished"
            @setEditFlag="setEditFlag"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
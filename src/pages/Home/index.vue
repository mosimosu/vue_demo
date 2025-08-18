<script setup>
defineOptions({ name: 'HomePage' })
/**
 * import function
 */
import { useTodosComposable } from './composables/useTodos'
import TodoList from './components/TodoList.vue'
import AddTodoForm from './components/AddTodoForm.vue'
const {
  todosWithEdit,
  setEditFlag,
  deleteTodo,
  editTodo,
  finished,
  handleSubmit,
} = useTodosComposable()
</script>
<template>
  <v-container class="py-8">
    <v-row justify="center" class="w-100">
      <v-col cols="12" md="12" lg="12" xl="12">
        <v-card class="mb-6">
          <v-card-text>
            <AddTodoForm @add="handleSubmit" />
          </v-card-text>
        </v-card>
        <TodoList
          :todos="todosWithEdit"
          @edit="editTodo"
          @delete="deleteTodo"
          @finish="finished"
          @set-edit-flag="setEditFlag"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>

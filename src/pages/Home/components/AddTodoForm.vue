<script setup>
import { ref } from 'vue'

const todo = ref('')
const emit = defineEmits(['add'])

const submit = () => {
  if (todo?.value?.trim()) {
    emit('add', todo.value)
    todo.value = ''
  }
}
</script>

<template>
  <v-form @submit.prevent="submit">
    <v-row align="center">
      <v-col>
        <v-text-field label="Add a new todo" v-model="todo" outlined />
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" type="submit">Add</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

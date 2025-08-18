<script setup>
defineProps({
  todos: {
    type: Array,
    required: true,
  },
})
defineEmits(['edit', 'delete', 'finish', 'setEditFlag'])
</script>

<template>
  <v-row>
    <v-col
      v-for="(item, index) in todos"
      :key="item.id"
      cols="12"
      sm="6"
      md="6"
      lg="4"
    >
      <v-card>
        <v-card-title class="pa-6">
          <v-row align="center">
            <span
              >Item
              <span style="color: red; font-weight: bold">{{
                index + 1
              }}</span></span
            >
            <span v-if="item.completed_at" class="ml-2">
              <v-chip color="success" size="small" label>Finished</v-chip>
            </span>
            <v-spacer />
            <v-btn
              icon
              color="success"
              size="small"
              class="mr-1"
              @click="$emit('finish', item)"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn
              icon
              color="error"
              size="small"
              @click="$emit('delete', item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <div
            v-if="!item.editFlag"
            :style="
              item.completed_at
                ? 'text-decoration: line-through; color: #888;'
                : ''
            "
          >
            {{ item.content }}
          </div>
          <v-text-field
            v-if="item.editFlag"
            v-model="item.content"
            outlined
            dense
            @keyup.enter="$emit('edit', item)"
            @keyup.esc="$emit('setEditFlag', item.id, false)"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-if="!item.editFlag"
            color="info"
            size="small"
            @click="$emit('setEditFlag', item.id, true)"
            >Edit</v-btn
          >
          <v-btn
            v-if="item.editFlag"
            color="primary"
            size="small"
            @click="$emit('edit', item)"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

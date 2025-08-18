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
              @click="$emit('finish', item)"
              size="small"
              class="mr-1"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn
              icon
              color="error"
              @click="$emit('delete', item)"
              size="small"
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
            @keyup.enter="$emit('edit', item)"
            @keyup.esc="$emit('setEditFlag', item.id, false)"
            outlined
            dense
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-if="!item.editFlag"
            color="info"
            @click="$emit('setEditFlag', item.id, true)"
            size="small"
            >Edit</v-btn
          >
          <v-btn
            v-if="item.editFlag"
            color="primary"
            @click="$emit('edit', item)"
            size="small"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

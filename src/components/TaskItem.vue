<script setup>
defineProps({
  task: {
    type: Object,
    required: true,
  },
})

defineEmits(['toggle', 'remove'])
</script>

<template>
  <div class="task-item">
    <button type="button" class="check-button" @click="$emit('toggle', task.id)">
      {{ task.done ? '✓' : '' }}
    </button>
    <span :class="{ done: task.done }">{{ task.title }}</span>
    <button type="button" class="ghost-button" @click="$emit('remove', task.id)">删除</button>
  </div>
</template>

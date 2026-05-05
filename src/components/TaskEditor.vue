<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'submit'])
</script>

<template>
  <form class="task-editor" @submit.prevent="emit('submit')">
    <input
      :value="modelValue"
      placeholder="输入练习任务"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <button type="submit">添加</button>
  </form>
</template>

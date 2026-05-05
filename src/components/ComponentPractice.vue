<script setup>
import { inject, ref } from 'vue'
import TaskEditor from './TaskEditor.vue'
import TaskItem from './TaskItem.vue'

const labTheme = inject('labTheme')
const tasks = ref([
  { id: 1, title: '练习 props 传值', done: true },
  { id: 2, title: '用 emit 通知父组件', done: false },
  { id: 3, title: '理解组件上的 v-model', done: false },
])
const draft = ref('写一个新的练习任务')

function addTask() {
  const title = draft.value.trim()
  if (!title) return
  tasks.value.push({ id: Date.now(), title, done: false })
  draft.value = ''
}

function toggleTask(id) {
  const task = tasks.value.find((item) => item.id === id)
  if (task) task.done = !task.done
}

function removeTask(id) {
  tasks.value = tasks.value.filter((item) => item.id !== id)
}
</script>

<template>
  <div class="stack">
    <article v-focus-card class="practice-card">
      <h3>父子组件通信</h3>
      <p class="muted">
        父组件把 task 作为 props 传下去，子组件用 emit 把 toggle/remove 事件传回来。
      </p>
      <div class="task-list">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @toggle="toggleTask"
          @remove="removeTask"
        />
      </div>
    </article>

    <article v-focus-card class="practice-card">
      <h3>组件 v-model</h3>
      <TaskEditor v-model="draft" @submit="addTask" />
      <p class="muted">当前 provide 主题：{{ labTheme }}</p>
    </article>
  </div>
</template>

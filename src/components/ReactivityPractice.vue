<script setup>
import { computed, reactive, ref, watch } from 'vue'

const count = ref(1)
const user = reactive({
  name: 'Ada',
  goal: '掌握 Vue 响应式',
  minutes: 25,
})
const logs = ref([])

const planLabel = computed(() => {
  if (user.minutes < 15) return '热身练习'
  if (user.minutes < 45) return '专注练习'
  return '深度练习'
})

const progress = computed(() => Math.min(count.value * 20, 100))

watch(
  () => user.minutes,
  (newValue, oldValue) => {
    logs.value.unshift(`练习时长从 ${oldValue} 分钟变成 ${newValue} 分钟`)
    logs.value = logs.value.slice(0, 4)
  },
)
</script>

<template>
  <div class="practice-grid">
    <article v-focus-card class="practice-card">
      <h3>ref：单个响应式值</h3>
      <p class="muted">按钮会修改 count，模板会自动刷新。</p>
      <div class="counter-row">
        <button type="button" @click="count--">-</button>
        <strong>{{ count }}</strong>
        <button type="button" @click="count++">+</button>
      </div>
      <div class="meter" aria-label="progress">
        <span :style="{ width: `${progress}%` }"></span>
      </div>
    </article>

    <article v-focus-card class="practice-card">
      <h3>reactive：对象状态</h3>
      <label>
        学习者
        <input v-model.trim="user.name" />
      </label>
      <label>
        目标
        <input v-model.trim="user.goal" />
      </label>
      <label>
        分钟
        <input v-model.number="user.minutes" type="number" min="5" step="5" />
      </label>
      <p class="result">{{ user.name }} 正在进行「{{ planLabel }}」：{{ user.goal }}</p>
    </article>

    <article v-focus-card class="practice-card wide">
      <h3>computed 与 watch</h3>
      <p class="muted">computed 适合派生显示，watch 适合响应变化并执行动作。</p>
      <ul class="log-list">
        <li v-for="log in logs" :key="log">{{ log }}</li>
        <li v-if="logs.length === 0">修改分钟数后，这里会出现 watch 日志。</li>
      </ul>
    </article>
  </div>
</template>

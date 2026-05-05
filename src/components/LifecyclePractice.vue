<script setup>
import { nextTick, onMounted, onUnmounted, onUpdated, ref } from 'vue'

const visible = ref(true)
const ticks = ref(0)
const events = ref([])
let timerId

function record(message) {
  events.value.unshift(`${new Date().toLocaleTimeString()} ${message}`)
  events.value = events.value.slice(0, 6)
}

onMounted(() => {
  record('组件 mounted：启动计时器')
  timerId = setInterval(() => {
    ticks.value++
  }, 1000)
})

onUpdated(() => {
  record('组件 updated：响应式数据更新后触发')
})

onUnmounted(() => {
  clearInterval(timerId)
})

async function changeAfterDom() {
  ticks.value += 5
  await nextTick()
  record('nextTick：DOM 已经完成本轮更新')
}
</script>

<template>
  <div class="practice-grid">
    <article v-focus-card class="practice-card">
      <h3>生命周期钩子</h3>
      <p class="muted">观察 mounted、updated 以及 nextTick 的触发时机。</p>
      <div class="counter-row">
        <strong>{{ ticks }}</strong>
        <button type="button" @click="ticks++">手动 +1</button>
        <button type="button" @click="changeAfterDom">+5 后等 DOM</button>
      </div>
    </article>

    <article v-focus-card class="practice-card">
      <h3>Transition</h3>
      <button type="button" @click="visible = !visible">切换提示</button>
      <Transition name="fade">
        <p v-if="visible" class="notice">我会在进入和离开时使用 Vue 过渡类名。</p>
      </Transition>
    </article>

    <article v-focus-card class="practice-card wide">
      <h3>事件记录</h3>
      <ul class="log-list">
        <li v-for="event in events" :key="event">{{ event }}</li>
      </ul>
    </article>
  </div>
</template>

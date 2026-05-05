<script setup>
import { computed } from 'vue'
import { useLocalCounter } from '../composables/useLocalCounter'

const studyCounter = useLocalCounter('vue-study-counter', 0)
const reviewCounter = useLocalCounter('vue-review-counter', 3)

const total = computed(() => studyCounter.count.value + reviewCounter.count.value)
</script>

<template>
  <div class="practice-grid">
    <article v-focus-card class="practice-card">
      <h3>组合式函数</h3>
      <p class="muted">useLocalCounter 把状态、方法和本地存储同步封装到一起。</p>
      <div class="counter-row">
        <button type="button" @click="studyCounter.decrement">-</button>
        <strong>{{ studyCounter.count }}</strong>
        <button type="button" @click="studyCounter.increment">+</button>
      </div>
      <button type="button" class="ghost-button" @click="studyCounter.reset">重置学习次数</button>
    </article>

    <article v-focus-card class="practice-card">
      <h3>复用同一个逻辑</h3>
      <div class="counter-row">
        <button type="button" @click="reviewCounter.decrement">-</button>
        <strong>{{ reviewCounter.count }}</strong>
        <button type="button" @click="reviewCounter.increment">+</button>
      </div>
      <p class="result">总练习次数：{{ total }}</p>
    </article>

    <article v-focus-card class="practice-card wide">
      <h3>继续练什么</h3>
      <ol class="learning-list">
        <li>把其中一个练习改成自己的业务例子。</li>
        <li>尝试把 tasks 存进 localStorage。</li>
        <li>下一步学习 Vue Router，把每个模块变成独立页面。</li>
        <li>再学习 Pinia，用全局 store 管理跨页面状态。</li>
      </ol>
    </article>
  </div>
</template>

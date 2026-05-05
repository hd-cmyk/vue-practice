<script setup>
import { computed, provide, ref } from "vue";
import ReactivityPractice from "./components/ReactivityPractice.vue";
import ComponentPractice from "./components/ComponentPractice.vue";
import LifecyclePractice from "./components/LifecyclePractice.vue";
import ComposablePractice from "./components/ComposablePractice.vue";
const A = 1;
const lessons = [
  {
    id: "reactivity",
    title: "响应式基础",
    subtitle: "ref / reactive / computed / watch",
    component: ReactivityPractice,
  },
  {
    id: "components",
    title: "组件通信",
    subtitle: "props / emit / v-model / provide",
    component: ComponentPractice,
  },
  {
    id: "lifecycle",
    title: "生命周期",
    subtitle: "mounted / updated / unmounted",
    component: LifecyclePractice,
  },
  {
    id: "composables",
    title: "组合式函数",
    subtitle: "抽取可复用状态逻辑",
    component: ComposablePractice,
  },
];

const activeId = ref(lessons[0].id);
const theme = ref("day");

const activeLesson = computed(() =>
  lessons.find((lesson) => lesson.id === activeId.value),
);

provide("labTheme", theme);
</script>

<template>
  <main :class="['app-shell', `theme-${theme}`]">
    <aside class="sidebar">
      <div>
        <p class="eyebrow">Vue 3 Practice</p>
        <h1>Vue 学习实验室</h1>
        <p class="intro">
          你已经学过模板语法和 slot，这个小项目会继续带你练 Vue 的核心能力。
        </p>
      </div>

      <nav class="lesson-nav" aria-label="Vue lessons">
        <button
          v-for="lesson in lessons"
          :key="lesson.id"
          :class="{ active: lesson.id === activeId }"
          type="button"
          @click="activeId = lesson.id"
        >
          <span>{{ lesson.title }}</span>
          <small>{{ lesson.subtitle }}</small>
        </button>
      </nav>

      <label class="theme-switch">
        <span>练习主题</span>
        <select v-model="theme">
          <option value="day">白天模式</option>
          <option value="night">夜间模式</option>
        </select>
      </label>
    </aside>

    <section class="lesson-panel">
      <header class="lesson-header">
        <p class="eyebrow">当前模块</p>
        <h2>{{ activeLesson.title }}</h2>
        <p>{{ activeLesson.subtitle }}</p>
      </header>

      <Transition name="lesson" mode="out-in">
        <component :is="activeLesson.component" :key="activeLesson.id" />
      </Transition>
    </section>
  </main>
</template>

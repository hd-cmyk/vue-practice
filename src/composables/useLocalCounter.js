import { ref, watch } from 'vue'

export function useLocalCounter(storageKey, initialValue = 0) {
  const savedValue = Number(localStorage.getItem(storageKey))
  const count = ref(Number.isFinite(savedValue) ? savedValue : initialValue)

  watch(count, (value) => {
    localStorage.setItem(storageKey, String(value))
  })

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = initialValue
  }

  return {
    count,
    increment,
    decrement,
    reset,
  }
}

import { createApp } from 'vue'
import App from './App.vue'
import './styles.css'

const app = createApp(App)

app.directive('focus-card', {
  mounted(el) {
    el.setAttribute('tabindex', '0')
    el.addEventListener('mouseenter', () => el.focus())
  },
})

app.mount('#app')

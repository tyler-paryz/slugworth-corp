import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Make sure pendo is available before initializing
if (window.pendo) {
  // Initialize Pendo
  window.pendo.initialize({
    visitor: {
      id: 'VISITOR-UNIQUE-ID-' + Math.floor(Math.random() * 1000000) // Generate a random visitor ID for testing
    },
    account: {
      id: 'SLUGWORTH-CORP-ACCOUNT',
      name: 'Slugworth Corporation'
    }
  });
} else {
  console.warn('Pendo not loaded yet, skipping initialization');
}

const app = createApp(App)
app.use(router)
app.mount('#app') 
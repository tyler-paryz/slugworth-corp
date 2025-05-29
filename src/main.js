import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Make sure pendo is available before initializing
if (window.pendo) {
  // Initialize Pendo without providing a visitor ID to allow for anonymous tracking
  window.pendo.initialize({
    visitor: {
      // Let Pendo generate the anonymous visitor ID
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
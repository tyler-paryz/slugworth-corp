<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <h1>Welcome to Slugworth Corporation</h1>
        <p class="hero-subtitle">Your source for the finest candies and confections in the world</p>
        <div class="hero-buttons">
          <button @click="trackButtonClick('Shop Products')" class="btn">Shop Products</button>
          <button @click="trackButtonClick('Learn More')" class="btn btn-secondary">Learn More</button>
        </div>
      </div>
    </section>

    <section class="container section">
      <h2 class="section-title">Featured Products</h2>
      <div class="product-grid">
        <div v-for="(product, index) in featuredProducts" :key="index" class="product-card">
          <div class="product-image" :style="{ backgroundColor: product.color }">
            <span class="product-icon">🍬</span>
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <button @click="trackProductView(product)" class="btn">View Details</button>
          </div>
        </div>
      </div>
    </section>

    <section class="newsletter section">
      <div class="container">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Stay updated with our latest confectionery innovations</p>
        <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
          <div class="form-group">
            <input v-model="email" type="email" placeholder="Enter your email" required>
          </div>
          <button type="submit" class="btn">Subscribe</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');

const featuredProducts = [
  {
    name: 'Everlasting Gobstopper',
    description: 'A candy that changes colors and flavors and never gets smaller.',
    color: '#ff5e5e'
  },
  {
    name: 'Secret Recipe Chocolate',
    description: 'Discover our famous chocolate recipe that rivals the competition.',
    color: '#8a5a44'
  },
  {
    name: 'Fizzy Lifting Drinks',
    description: 'The revolutionary soda that makes you float on air.',
    color: '#68a0ff'
  },
  {
    name: 'Wonka Bar Imitation',
    description: 'Our premium chocolate bar with a similar taste to the famous competitor.',
    color: '#ebc334'
  }
];

const trackButtonClick = (buttonName) => {
  window.pendo.track('Button Click', { button: buttonName });
  
  if (buttonName === 'Shop Products') {
    router.push('/products');
  } else if (buttonName === 'Learn More') {
    router.push('/about');
  }
};

const trackProductView = (product) => {
  window.pendo.track('Product View', {
    productName: product.name,
    productPage: 'Home Featured Products'
  });
};

const subscribeNewsletter = () => {
  window.pendo.track('Newsletter Signup', { email: email.value });
  alert(`Thank you for subscribing with ${email.value}!`);
  email.value = '';
};
</script>

<style scoped>
.hero {
  background-color: var(--secondary-color);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--accent-color);
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn-secondary {
  background-color: transparent;
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
}

.btn-secondary:hover {
  background-color: var(--accent-color);
  color: white;
}

.section-title {
  text-align: center;
  margin-bottom: 30px;
  color: var(--primary-color);
}

.product-image {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-icon {
  font-size: 50px;
}

.product-info {
  padding: 20px;
}

.product-info h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.newsletter {
  background-color: var(--primary-color);
  color: white;
  text-align: center;
  padding: 50px 0;
}

.newsletter-form {
  max-width: 500px;
  margin: 0 auto;
}

.newsletter input {
  border: none;
  font-size: 16px;
}
</style> 
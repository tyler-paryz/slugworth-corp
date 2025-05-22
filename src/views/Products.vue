<template>
  <div class="products container">
    <h1 class="page-title">Our Products</h1>
    
    <div class="filters">
      <div class="search-bar">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search products..." 
          @input="trackSearch"
        >
      </div>
      
      <div class="category-filters">
        <button 
          @click="filterCategory('all')" 
          :class="{ active: selectedCategory === 'all' }"
          class="category-btn"
        >
          All
        </button>
        <button 
          v-for="category in categories" 
          :key="category"
          @click="filterCategory(category)"
          :class="{ active: selectedCategory === category }"
          class="category-btn"
        >
          {{ category }}
        </button>
      </div>
    </div>
    
    <div class="product-grid">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id"
        class="product-card"
        @click="viewProductDetails(product)"
      >
        <div class="product-image" :style="{ backgroundColor: product.color }">
          <span class="product-icon">{{ product.icon }}</span>
        </div>
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="product-category">{{ product.category }}</p>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-price">${{ product.price.toFixed(2) }}</div>
          <button @click.stop="addToCart(product)" class="btn">Add to Cart</button>
        </div>
      </div>
    </div>
    
    <div v-if="filteredProducts.length === 0" class="no-results">
      <h3>No products found matching your criteria</h3>
      <button @click="resetFilters" class="btn">Reset Filters</button>
    </div>
    
    <div v-if="productDetail" class="product-modal">
      <div class="modal-content">
        <span class="close-btn" @click="closeProductDetail">&times;</span>
        <div class="modal-product-info">
          <div class="product-image large" :style="{ backgroundColor: productDetail.color }">
            <span class="product-icon large">{{ productDetail.icon }}</span>
          </div>
          <div>
            <h2>{{ productDetail.name }}</h2>
            <p class="product-category">{{ productDetail.category }}</p>
            <p class="modal-description">{{ productDetail.description }}</p>
            <p class="modal-description">{{ productDetail.longDescription }}</p>
            <div class="product-price large">${{ productDetail.price.toFixed(2) }}</div>
            
            <div class="quantity-selector">
              <button @click="decrementQuantity" class="qty-btn">-</button>
              <span class="quantity">{{ quantity }}</span>
              <button @click="incrementQuantity" class="qty-btn">+</button>
            </div>
            
            <button @click="addToCartWithQuantity(productDetail)" class="btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Product data
const products = [
  {
    id: 1,
    name: 'Everlasting Gobstopper',
    category: 'Hard Candy',
    description: 'A candy that never gets smaller no matter how long you suck it.',
    longDescription: 'Our signature product, the Everlasting Gobstopper changes colors and flavors as you enjoy it. Perfect for the economically-minded candy lover who wants a treat that lasts for days, not minutes.',
    price: 3.99,
    color: '#ff5e5e',
    icon: '🍬'
  },
  {
    id: 2,
    name: 'Secret Recipe Chocolate',
    category: 'Chocolate',
    description: 'Our famous chocolate recipe that rivals the competition.',
    longDescription: 'Made with our secret formula that we\'ve spent decades perfecting. Our chocolate has the perfect snap when you break it and melts at just the right temperature in your mouth.',
    price: 4.50,
    color: '#8a5a44',
    icon: '🍫'
  },
  {
    id: 3,
    name: 'Fizzy Lifting Drinks',
    category: 'Beverages',
    description: 'The revolutionary soda that makes you feel lighter than air.',
    longDescription: 'Our Fizzy Lifting Drinks create a unique sensation of lightness. Please consume responsibly and avoid ceiling fans. Best enjoyed in open spaces with tall ceilings.',
    price: 5.99,
    color: '#68a0ff',
    icon: '🥤'
  },
  {
    id: 4,
    name: 'Wonka Bar Imitation',
    category: 'Chocolate',
    description: 'Our premium chocolate bar similar to the famous competitor.',
    longDescription: 'While we can\'t claim to have golden tickets, our chocolate bars are just as delicious as that other brand. Made with premium cocoa beans and the finest milk.',
    price: 2.99,
    color: '#ebc334',
    icon: '🍫'
  },
  {
    id: 5,
    name: 'Slugworth Sour Balls',
    category: 'Hard Candy',
    description: 'Intensely sour candies that pack a punch.',
    longDescription: 'These sour balls start extremely tart then gradually sweeten as you eat them. A rollercoaster for your taste buds that challenges even the bravest candy enthusiasts.',
    price: 1.99,
    color: '#baff29',
    icon: '🍬'
  },
  {
    id: 6,
    name: 'Chocolate-Covered Secrets',
    category: 'Chocolate',
    description: 'Each chocolate contains a different surprise filling.',
    longDescription: 'Our mystery chocolates feature different fillings in each bite. Caramel, nougat, fruit jellies, and other surprises await the adventurous candy lover.',
    price: 7.99,
    color: '#a0522d',
    icon: '🍬'
  },
  {
    id: 7,
    name: 'Liquorice Laces',
    category: 'Chewy Candy',
    description: 'Extra long liquorice strings in various flavors.',
    longDescription: 'Our liquorice laces come in strawberry, cherry, apple and original black liquorice flavors. Perfect for sharing or for those who like to play with their food.',
    price: 2.49,
    color: '#800080',
    icon: '🧶'
  },
  {
    id: 8,
    name: 'Bubbling Chocolate Bar',
    category: 'Chocolate',
    description: 'Chocolate with popping candy that fizzes in your mouth.',
    longDescription: 'A unique experience combining smooth chocolate with popping candy that creates a fun fizzing sensation. It\'s like a party in your mouth!',
    price: 3.49,
    color: '#4b3621',
    icon: '✨'
  }
];

// Reactive state
const searchQuery = ref('');
const selectedCategory = ref('all');
const productDetail = ref(null);
const quantity = ref(1);

// Computed values
const categories = computed(() => {
  return [...new Set(products.map(product => product.category))];
});

const filteredProducts = computed(() => {
  let result = products;
  
  // Filter by category
  if (selectedCategory.value !== 'all') {
    result = result.filter(product => product.category === selectedCategory.value);
  }
  
  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    );
  }
  
  return result;
});

// Methods
const filterCategory = (category) => {
  selectedCategory.value = category;
  window.pendo.track('Filter Products', { 
    category: category,
    searchQuery: searchQuery.value
  });
};

const trackSearch = () => {
  if (searchQuery.value.length > 2) {
    window.pendo.track('Product Search', { 
      searchQuery: searchQuery.value,
      resultsCount: filteredProducts.value.length
    });
  }
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'all';
  window.pendo.track('Reset Filters');
};

const viewProductDetails = (product) => {
  productDetail.value = product;
  quantity.value = 1;
  window.pendo.track('View Product Details', { 
    productId: product.id,
    productName: product.name,
    productCategory: product.category
  });
};

const closeProductDetail = () => {
  productDetail.value = null;
};

const incrementQuantity = () => {
  quantity.value++;
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = (product) => {
  window.pendo.track('Add to Cart', { 
    productId: product.id,
    productName: product.name,
    quantity: 1,
    price: product.price
  });
  alert(`Added ${product.name} to cart!`);
};

const addToCartWithQuantity = (product) => {
  window.pendo.track('Add to Cart', { 
    productId: product.id,
    productName: product.name,
    quantity: quantity.value,
    price: product.price,
    totalValue: quantity.value * product.price
  });
  alert(`Added ${quantity.value} ${product.name}(s) to cart!`);
  closeProductDetail();
};
</script>

<style scoped>
.filters {
  margin-bottom: 30px;
}

.search-bar {
  margin-bottom: 15px;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.category-btn {
  background-color: var(--light-color);
  color: var(--dark-color);
  border: 1px solid var(--secondary-color);
}

.category-btn.active {
  background-color: var(--primary-color);
  color: white;
}

.product-card {
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-image {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-icon {
  font-size: 60px;
}

.product-category {
  color: var(--secondary-color);
  font-size: 0.9em;
  margin-bottom: 10px;
}

.product-description {
  margin-bottom: 15px;
}

.product-price {
  font-size: 1.4em;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 15px;
}

.no-results {
  text-align: center;
  padding: 40px 0;
}

/* Modal styles */
.product-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: var(--dark-color);
}

.modal-product-info {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.product-image.large {
  height: 250px;
  border-radius: 8px;
}

.product-icon.large {
  font-size: 100px;
}

.product-price.large {
  font-size: 1.8em;
  margin: 20px 0;
}

.modal-description {
  margin-bottom: 15px;
  line-height: 1.6;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.qty-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-color);
  border: 1px solid var(--secondary-color);
  cursor: pointer;
}

.quantity {
  padding: 0 15px;
  font-size: 1.2em;
}

@media (max-width: 768px) {
  .modal-product-info {
    grid-template-columns: 1fr;
  }
}
</style> 
<template>
  <div class="app">
    <header>
      <nav class="navbar">
        <div class="container nav-container">
          <div class="logo">
            <router-link to="/">
              <h1>Slugworth Corp</h1>
            </router-link>
          </div>
          <ul class="nav-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/products">Products</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
            <li><router-link to="/ecosystem">Ecosystem</router-link></li>
          </ul>
        </div>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} Slugworth Corporation - All Rights Reserved</p>
        <p>A testing application for Pendo analytics</p>
        
        <div class="ecosystem-links">
          <h3>Slugworth Ecosystem</h3>
          <div class="ecosystem-buttons">
            <a href="https://slugworth-corp.vercel.app/" class="ecosystem-btn current" @click="trackEcosystemLink('Slugworth Corp')">
              Slugworth Corp
            </a>
            <a href="https://oompa-social.vercel.app/login" class="ecosystem-btn" @click="trackEcosystemLink('Oompa Social')">
              Oompa Social
            </a>
            <a href="https://golden-ticket-booking.vercel.app/" class="ecosystem-btn" @click="trackEcosystemLink('Golden Ticket Booking')">
              Golden Ticket Booking
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Track ecosystem link clicks
const trackEcosystemLink = (appName) => {
  if (window.pendo && window.pendo.track) {
    window.pendo.track('Ecosystem Navigation', {
      fromApp: 'Slugworth Corp',
      toApp: appName,
      timestamp: new Date().toISOString()
    });
  }
};
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background-color: var(--primary-color);
  color: white;
  padding: 15px 0;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 1.8rem;
  color: var(--accent-color);
  margin: 0;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 20px;
}

.nav-links a {
  color: white;
  font-weight: bold;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--accent-color);
}

main {
  flex: 1;
  padding: 20px 0;
}

footer {
  background-color: var(--dark-color);
  color: white;
  padding: 20px 0;
  text-align: center;
}

.ecosystem-links {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.ecosystem-links h3 {
  color: var(--accent-color);
  margin-bottom: 15px;
}

.ecosystem-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.ecosystem-btn {
  padding: 8px 16px;
  background-color: var(--secondary-color);
  color: white;
  border-radius: 4px;
  transition: all 0.3s;
  text-decoration: none;
}

.ecosystem-btn:hover {
  background-color: var(--accent-color);
  color: var(--dark-color);
  transform: translateY(-3px);
}

.ecosystem-btn.current {
  background-color: var(--primary-color);
  position: relative;
}

.ecosystem-btn.current::after {
  content: '•';
  position: absolute;
  top: -8px;
  right: -3px;
  color: var(--accent-color);
  font-size: 1.5rem;
}

@media (max-width: 600px) {
  .ecosystem-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .ecosystem-btn {
    width: 80%;
  }
}
</style> 
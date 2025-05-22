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
      </div>
    </footer>
  </div>
</template>

<script setup>
// No additional setup required for this component
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
</style> 
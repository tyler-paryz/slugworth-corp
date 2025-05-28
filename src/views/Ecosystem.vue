<template>
  <div class="ecosystem container">
    <h1 class="page-title">Slugworth Ecosystem</h1>
    
    <div class="intro-card card">
      <h2>Our Connected Applications</h2>
      <p>Explore the full suite of Slugworth Corporation applications. Each app provides unique functionality while maintaining a consistent experience across our ecosystem.</p>
    </div>
    
    <div class="app-cards">
      <div class="app-card card">
        <div class="app-header" style="background-color: var(--primary-color);">
          <h2>Slugworth Corp</h2>
          <span class="app-badge">Current App</span>
        </div>
        <div class="app-content">
          <p>Our flagship application showcasing Slugworth's premium confectionery products and company information.</p>
          <h3>Key Features:</h3>
          <ul>
            <li>Product catalog with search and filtering</li>
            <li>Company information and history</li>
            <li>Contact forms and support options</li>
          </ul>
          <div class="app-actions">
            <a 
              href="https://slugworth-corp.vercel.app/" 
              class="btn" 
              @click="trackAppLaunch('Slugworth Corp', 'Main App')"
            >
              Open App
            </a>
            <button 
              class="btn btn-secondary"
              @click="trackFeatureInterest('Slugworth Corp', 'Products')"
            >
              Explore Products
            </button>
          </div>
        </div>
      </div>
      
      <div class="app-card card">
        <div class="app-header" style="background-color: #5e35b1;">
          <h2>Oompa Social</h2>
          <span class="app-badge">Social Network</span>
        </div>
        <div class="app-content">
          <p>Connect with fellow candy enthusiasts and Oompa Loompas in our vibrant social community.</p>
          <h3>Key Features:</h3>
          <ul>
            <li>Profile creation and customization</li>
            <li>News feed with candy-related updates</li>
            <li>Direct messaging and group chats</li>
          </ul>
          <div class="app-actions">
            <a 
              href="https://oompa-social.vercel.app/login" 
              class="btn" 
              @click="trackAppLaunch('Oompa Social', 'Social Platform')"
            >
              Open App
            </a>
            <button 
              class="btn btn-secondary"
              @click="showFeatureDetails('oompa')"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      <div class="app-card card">
        <div class="app-header" style="background-color: #f9a825;">
          <h2>Golden Ticket Booking</h2>
          <span class="app-badge">Reservations</span>
        </div>
        <div class="app-content">
          <p>Book factory tours, special events, and candy-making classes through our reservation system.</p>
          <h3>Key Features:</h3>
          <ul>
            <li>Event calendar and availability</li>
            <li>Ticket purchasing and management</li>
            <li>Special tour package options</li>
          </ul>
          <div class="app-actions">
            <a 
              href="https://golden-ticket-booking.vercel.app/" 
              class="btn" 
              @click="trackAppLaunch('Golden Ticket Booking', 'Reservation System')"
            >
              Open App
            </a>
            <button 
              class="btn btn-secondary"
              @click="showFeatureDetails('golden')"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="selectedApp" class="feature-modal">
      <div class="modal-content card">
        <span class="close-btn" @click="selectedApp = null">&times;</span>
        
        <div v-if="selectedApp === 'oompa'">
          <h2>Oompa Social Features</h2>
          <div class="feature-grid">
            <div class="feature-item" @click="trackFeatureInterest('Oompa Social', 'Profiles')">
              <h3>Customizable Profiles</h3>
              <p>Create your unique candy persona with custom avatars and bio information.</p>
            </div>
            <div class="feature-item" @click="trackFeatureInterest('Oompa Social', 'Feed')">
              <h3>Activity Feed</h3>
              <p>Stay updated with the latest candy trends and community discussions.</p>
            </div>
            <div class="feature-item" @click="trackFeatureInterest('Oompa Social', 'Messaging')">
              <h3>Direct Messaging</h3>
              <p>Connect privately with other candy enthusiasts and share recipes.</p>
            </div>
            <div class="feature-item" @click="trackFeatureInterest('Oompa Social', 'Groups')">
              <h3>Candy Groups</h3>
              <p>Join specialized groups focused on specific candy types and techniques.</p>
            </div>
          </div>
          <div class="action-row">
            <a 
              href="https://oompa-social.vercel.app/login" 
              class="btn"
              @click="trackAppLaunch('Oompa Social', 'From Feature Modal')"
            >
              Launch Oompa Social
            </a>
          </div>
        </div>
        
        <div v-if="selectedApp === 'golden'">
          <h2>Golden Ticket Booking Features</h2>
          <div class="feature-grid">
            <div class="feature-item" @click="trackFeatureInterest('Golden Ticket', 'Calendar')">
              <h3>Event Calendar</h3>
              <p>Browse upcoming factory tours and special candy events.</p>
            </div>
            <div class="feature-item" @click="trackFeatureInterest('Golden Ticket', 'Booking')">
              <h3>Ticket Booking</h3>
              <p>Reserve your spot for exclusive factory access and demonstrations.</p>
            </div>
            <div class="feature-item" @click="trackFeatureInterest('Golden Ticket', 'Packages')">
              <h3>Special Packages</h3>
              <p>Choose from VIP experiences and group tour options.</p>
            </div>
            <div class="feature-item" @click="trackFeatureInterest('Golden Ticket', 'Management')">
              <h3>Reservation Management</h3>
              <p>View, modify or cancel your existing bookings and tickets.</p>
            </div>
          </div>
          <div class="action-row">
            <a 
              href="https://golden-ticket-booking.vercel.app/" 
              class="btn"
              @click="trackAppLaunch('Golden Ticket Booking', 'From Feature Modal')"
            >
              Launch Golden Ticket Booking
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedApp = ref(null);

const showFeatureDetails = (appKey) => {
  selectedApp.value = appKey;
  if (window.pendo && window.pendo.track) {
    window.pendo.track('Feature Details View', {
      app: appKey === 'oompa' ? 'Oompa Social' : 'Golden Ticket Booking',
      viewedFrom: 'Ecosystem Page'
    });
  }
};

const trackAppLaunch = (appName, context) => {
  if (window.pendo && window.pendo.track) {
    window.pendo.track('App Launch', {
      fromApp: 'Slugworth Corp',
      toApp: appName,
      context: context,
      timestamp: new Date().toISOString()
    });
  }
};

const trackFeatureInterest = (appName, feature) => {
  if (window.pendo && window.pendo.track) {
    window.pendo.track('Feature Interest', {
      app: appName,
      feature: feature,
      viewedFrom: 'Ecosystem Page',
      timestamp: new Date().toISOString()
    });
  }
};
</script>

<style scoped>
.intro-card {
  margin-bottom: 30px;
  text-align: center;
  background-color: #f8f9fa;
  border-left: 5px solid var(--primary-color);
}

.app-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.app-card {
  display: flex;
  flex-direction: column;
  border: none;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.app-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.app-header {
  padding: 20px;
  color: white;
  position: relative;
}

.app-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.app-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
}

.app-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.app-content ul {
  margin-bottom: 20px;
  padding-left: 20px;
}

.app-content li {
  margin-bottom: 5px;
}

.app-actions {
  margin-top: auto;
  display: flex;
  gap: 10px;
}

.btn-secondary {
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-secondary:hover {
  background-color: var(--primary-color);
  color: white;
}

.feature-modal {
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

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.feature-item {
  padding: 15px;
  border-radius: 8px;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s;
}

.feature-item:hover {
  background-color: #e9ecef;
  transform: translateY(-3px);
}

.feature-item h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.action-row {
  margin-top: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .app-cards {
    grid-template-columns: 1fr;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style> 
<template>
  <div class="contact container">
    <h1 class="page-title">Contact Us</h1>
    
    <div class="contact-grid">
      <div class="contact-form-container">
        <div class="card">
          <h2>Send Us a Message</h2>
          <p>Have questions or feedback? Fill out the form below and we'll get back to you as soon as possible.</p>
          
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                placeholder="Your name" 
                required
                @focus="trackFieldFocus('name')"
              >
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                placeholder="Your email address" 
                required
                @focus="trackFieldFocus('email')"
              >
            </div>
            
            <div class="form-group">
              <label for="subject">Subject</label>
              <select 
                id="subject" 
                v-model="formData.subject"
                @change="trackSelectChange"
                required
              >
                <option value="" disabled selected>Select a subject</option>
                <option value="customerService">Customer Service</option>
                <option value="productInquiry">Product Inquiry</option>
                <option value="partnership">Business Partnership</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                placeholder="Your message" 
                rows="5" 
                required
                @focus="trackFieldFocus('message')"
              ></textarea>
            </div>
            
            <div class="form-group checkbox-group">
              <input 
                type="checkbox" 
                id="newsletter" 
                v-model="formData.newsletter"
                @change="trackCheckboxChange"
              >
              <label for="newsletter">Subscribe to our newsletter</label>
            </div>
            
            <button type="submit" class="btn">Send Message</button>
          </form>
        </div>
      </div>
      
      <div class="contact-info-container">
        <div class="card info-card">
          <h2>Contact Information</h2>
          <div class="contact-info">
            <div class="info-item" @click="trackInfoClick('address')">
              <div class="info-icon">📍</div>
              <div>
                <h3>Address</h3>
                <p>123 Candy Lane</p>
                <p>Sweet City, SC 12345</p>
              </div>
            </div>
            
            <div class="info-item" @click="trackInfoClick('phone')">
              <div class="info-icon">📞</div>
              <div>
                <h3>Phone</h3>
                <p>(555) 123-4567</p>
              </div>
            </div>
            
            <div class="info-item" @click="trackInfoClick('email')">
              <div class="info-icon">✉️</div>
              <div>
                <h3>Email</h3>
                <p>info@slugworthcorp.com</p>
              </div>
            </div>
            
            <div class="info-item" @click="trackInfoClick('hours')">
              <div class="info-icon">🕒</div>
              <div>
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9AM - 5PM</p>
                <p>Saturday: 10AM - 2PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card">
          <h2>Connect With Us</h2>
          <div class="social-links">
            <button @click="trackSocialClick('twitter')" class="social-btn">Twitter</button>
            <button @click="trackSocialClick('facebook')" class="social-btn">Facebook</button>
            <button @click="trackSocialClick('instagram')" class="social-btn">Instagram</button>
            <button @click="trackSocialClick('linkedin')" class="social-btn">LinkedIn</button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="formSubmitted" class="success-message card">
      <h2>Thank You for Your Message!</h2>
      <p>We've received your inquiry and will get back to you as soon as possible.</p>
      <button @click="resetForm" class="btn">Send Another Message</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  newsletter: false
});

const formSubmitted = ref(false);

const trackFieldFocus = (fieldName) => {
  window.pendo.track('Form Field Focus', {
    fieldName: fieldName,
    page: 'Contact'
  });
};

const trackSelectChange = () => {
  window.pendo.track('Subject Selected', {
    subject: formData.subject,
    page: 'Contact'
  });
};

const trackCheckboxChange = () => {
  window.pendo.track('Newsletter Checkbox', {
    checked: formData.newsletter,
    page: 'Contact'
  });
};

const submitForm = () => {
  window.pendo.track('Contact Form Submitted', {
    formData: { 
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      newsletterSignup: formData.newsletter
    }
  });
  
  formSubmitted.value = true;
};

const resetForm = () => {
  formData.name = '';
  formData.email = '';
  formData.subject = '';
  formData.message = '';
  formData.newsletter = false;
  formSubmitted.value = false;
  
  window.pendo.track('Contact Form Reset');
};

const trackInfoClick = (infoType) => {
  window.pendo.track('Contact Info Click', {
    infoType: infoType,
    page: 'Contact'
  });
};

const trackSocialClick = (platform) => {
  window.pendo.track('Social Media Click', {
    platform: platform,
    page: 'Contact'
  });
};
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.contact-form-container,
.contact-info-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.contact-form {
  margin-top: 20px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-group input {
  width: auto;
  margin-bottom: 0;
}

.checkbox-group label {
  margin-bottom: 0;
}

.info-card {
  height: 100%;
}

.contact-info {
  margin-top: 20px;
}

.info-item {
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.info-item:hover {
  background-color: var(--light-color);
}

.info-icon {
  font-size: 24px;
  margin-right: 15px;
  color: var(--primary-color);
}

.info-item h3 {
  color: var(--primary-color);
  margin-bottom: 5px;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.social-btn {
  flex: 1 0 calc(50% - 10px);
  min-width: 100px;
}

.success-message {
  margin-top: 30px;
  text-align: center;
  padding: 30px;
  background-color: #e8f5e9;
  border-left: 5px solid #4caf50;
}

.success-message h2 {
  color: #2e7d32;
  margin-bottom: 15px;
}

.success-message button {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style> 
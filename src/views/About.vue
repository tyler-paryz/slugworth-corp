<template>
  <div class="about container">
    <h1 class="page-title">About Slugworth Corporation</h1>
    
    <div class="card">
      <h2>Our Humble Beginnings</h2>
      <p>Slugworth Corporation was founded in 1920 by Arthur Slugworth, a passionate confectioner with a vision to create the world's most innovative candy. For over a century, we've been crafting delightful treats that have brought joy to millions around the globe.</p>
      <p>While we've always been seen as competitors to Wonka Industries, we prefer to think of ourselves as friendly rivals driving innovation in the confectionery industry.</p>
    </div>
    
    <div class="card">
      <h2>Our Mission</h2>
      <p>At Slugworth Corp, our mission is simple: to create delicious confections that bring joy to people of all ages. We believe in:</p>
      <ul class="mission-list">
        <li>
          <strong>Quality Ingredients</strong>
          <p>We source only the finest ingredients from around the world.</p>
        </li>
        <li>
          <strong>Innovation</strong>
          <p>We're constantly developing new candy technologies and flavors.</p>
        </li>
        <li>
          <strong>Tradition</strong>
          <p>While we embrace innovation, we also honor traditional candy-making techniques.</p>
        </li>
        <li>
          <strong>Fun</strong>
          <p>We believe candy should be a delightful experience that brings out the child in everyone.</p>
        </li>
      </ul>
    </div>
    
    <div class="company-stats">
      <div class="stat-card" @click="trackStatClick('Years in Business')">
        <h3>100+</h3>
        <p>Years in Business</p>
      </div>
      <div class="stat-card" @click="trackStatClick('Countries')">
        <h3>42</h3>
        <p>Countries</p>
      </div>
      <div class="stat-card" @click="trackStatClick('Candy Varieties')">
        <h3>217</h3>
        <p>Candy Varieties</p>
      </div>
      <div class="stat-card" @click="trackStatClick('Happy Customers')">
        <h3>Millions</h3>
        <p>Happy Customers</p>
      </div>
    </div>
    
    <div class="team-section">
      <h2>Meet Our Leadership</h2>
      <div class="team-grid">
        <div class="team-member" v-for="(member, index) in teamMembers" :key="index" @click="trackTeamMemberClick(member)">
          <div class="member-avatar" :style="{ backgroundColor: member.color }">
            {{ member.initial }}
          </div>
          <h3>{{ member.name }}</h3>
          <p>{{ member.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const teamMembers = [
  { name: 'Arthur Slugworth Jr.', title: 'CEO', initial: 'A', color: '#5c0d34' },
  { name: 'Victoria Caramel', title: 'Head of Innovation', initial: 'V', color: '#856046' },
  { name: 'Marcus Truffle', title: 'Master Chocolatier', initial: 'M', color: '#d4af37' },
  { name: 'Samantha Sweet', title: 'Marketing Director', initial: 'S', color: '#2c2418' }
];

const trackStatClick = (statName) => {
  window.pendo.track('Stat Click', { stat: statName, page: 'About' });
};

const trackTeamMemberClick = (member) => {
  window.pendo.track('Team Member Click', { 
    memberName: member.name,
    memberTitle: member.title,
    page: 'About'
  });
};
</script>

<style scoped>
.about {
  padding: 40px 0;
}

.card {
  margin-bottom: 30px;
}

.card h2 {
  color: var(--primary-color);
  margin-bottom: 15px;
}

.mission-list {
  list-style: none;
  padding: 0;
}

.mission-list li {
  margin-bottom: 20px;
}

.mission-list strong {
  color: var(--primary-color);
  font-size: 1.1em;
  display: block;
  margin-bottom: 5px;
}

.company-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 40px 0;
  gap: 20px;
}

.stat-card {
  background-color: var(--accent-color);
  color: var(--dark-color);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
  min-width: 200px;
  cursor: pointer;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card h3 {
  font-size: 2em;
  margin-bottom: 5px;
}

.team-section {
  margin-top: 40px;
}

.team-section h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 30px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
}

.team-member {
  text-align: center;
  cursor: pointer;
}

.member-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
  color: white;
  margin: 0 auto 15px;
}

.team-member h3 {
  color: var(--primary-color);
  margin-bottom: 5px;
}

.team-member p {
  color: var(--secondary-color);
}
</style> 
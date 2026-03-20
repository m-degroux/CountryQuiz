<script setup>
import { useRouter } from 'vue-router'
import useVisited from './composable/useVisited.js'

const router = useRouter()
const { count } = useVisited()
</script>

<template>
  <div id="app">
    <header class="app-header">
      <h1>Explorateur de Pays</h1>
      <nav class="nav-links">
        <router-link to="/">Accueil</router-link>
        <router-link to="/flag-quiz"> Quiz Drapeaux</router-link>
        <router-link to="/capital-quiz"> Quiz Capitales</router-link>
        <router-link to="/visited" class="visited-link">
          Mes pays visités <span class="badge">{{ count }}</span>
        </router-link>
      </nav>
    </header>
    
    <main class="app-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header h1 {
  margin: 0 0 20px 0;
  font-size: 32px;
  text-align: center;
}

.nav-links {
  color: rgb(34, 118, 244);
  display: flex;
  justify-content: center;
  gap: 30px;
}

.nav-links a {
  color: rgb(34, 118, 244);
  text-decoration: none;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 6px;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-links a.router-link-active {
  background: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}

.visited-link {
  position: relative;
}

.badge {
  display: inline-block;
  min-width: 24px;
  height: 24px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
  margin-left: 8px;
  font-weight: bold;
  font-size: 12px;
}

.app-content {
  flex: 1;
  padding: 20px;
}
</style>

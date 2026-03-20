<script setup>
import CountryCard from '../components/CountryCard.vue'
import useVisited from '../composable/useVisited.js'

const { visitedCountries, clearAll } = useVisited()
</script>

<template>
  <div class="visited-page">
    <h1>Mes pays visités</h1>
    
    <div v-if="visitedCountries.length === 0" class="no-countries">
      <p>Vous n'avez visité aucun pays pour le moment.</p>
      <router-link to="/">Explorez les pays →</router-link>
    </div>
    
    <div v-else>
      <div class="header">
        <p>Total: <strong>{{ visitedCountries.length }}</strong> pays visité(s)</p>
        <button @click="clearAll" class="clear-btn">Tout supprimer</button>
      </div>
      
      <div class="countries-container">
        <CountryCard
          v-for="country in visitedCountries"
          :key="country.name.common"
          :country="country"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.visited-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.no-countries {
  text-align: center;
  padding: 60px 20px;
  color: #555;
}

.no-countries p {
  font-size: 18px;
  margin-bottom: 20px;
}

.no-countries a {
  display: inline-block;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s;
}

.no-countries a:hover {
  background: #2980b9;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.header p {
  font-size: 16px;
  color: #555;
}

.clear-btn {
  padding: 10px 20px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.clear-btn:hover {
  background: #c0392b;
}

.countries-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>

<script setup>
  import CountryDetails from '../components/CountryDetails.vue'
  import useFetch from '../composable/userFetch.js'
  import useVisited from '../composable/useVisited.js'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const countryCode = route.params.code.toUpperCase()
  const url = `https://restcountries.com/v3.1/alpha/${countryCode}`
  const { data: country, loading, error } = useFetch(url)
  const { addCountry, removeCountry, isVisited } = useVisited()

  const toggleVisited = () => {
    if (country.value && country.value.length > 0) {
      const countryData = country.value[0]
      if (isVisited(countryData.cca2)) {
        removeCountry(countryData.cca2)
      } else {
        addCountry(countryData)
      }
    }
  }
</script>

<template>
  <div class="country-page">
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="error" class="error">Erreur lors du chargement du pays</div>
    <div v-else-if="country && country.length > 0">
      <CountryDetails :country="country[0]" />
      <button 
        @click="toggleVisited" 
        :class="['visit-btn', { visited: isVisited(country[0].cca2) }]"
      >
        {{ isVisited(country[0].cca3) ? 'Retirer de mes visites' : 'Ajouter à mes visites' }}
      </button>
    </div>
    <div v-else class="not-found">Pays non trouvé</div>
  </div>
</template>

<style scoped>
.country-page {
  padding: 20px;
}

.loading,
.error,
.not-found {
  text-align: center;
  padding: 40px 20px;
  font-size: 18px;
  color: #555;
}

.error {
  color: #e74c3c;
}

.visit-btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background: #3498db;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.visit-btn:hover {
  background: #2980b9;
}

.visit-btn.visited {
  background: #e74c3c;
}

.visit-btn.visited:hover {
  background: #c0392b;
}
</style>

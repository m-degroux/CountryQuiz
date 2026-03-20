<script setup>
import CountryCard from '@/components/CountryCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import RegionFilter from '@/components/RegionFilter.vue'
import useFetch from '@/composable/userFetch'
import { ref, computed } from 'vue'

const filterName = ref('')
const filterRegion = ref('')

const { data: countries } = useFetch(
  'https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,languages,borders,cca3',
)

function searchCountries(name) {
  filterName.value = name
}

function searchRegion(region) {
  filterRegion.value = region
}

function resetFilters() {
  filterName.value = ''
  filterRegion.value = ''
}

const filteredCountries = computed(() => {
  if (!countries.value) return []

  return countries.value.filter((country) => {
    const matchesName = country.name.common.toLowerCase().includes(filterName.value.toLowerCase())

    const matchesRegion = filterRegion.value === '' || country.region === filterRegion.value

    return matchesName && matchesRegion
  })
})
</script>

<template>
  <div class="country-explorer">
    <h1>Explorateur de pays du monde</h1>
    <p>Nb total de pays = {{ countries?.length || 0 }}</p>
    <SearchBar @search="searchCountries" />
    <RegionFilter @search="searchRegion" />
    <button @click="resetFilters">Réinitialiser les filtres</button>
    <br /><br />
    <div class="countries-container">
      <CountryCard
        v-for="country in filteredCountries"
        :key="country.name.common"
        :country="country"
      />
    </div>
  </div>
</template>

<style scoped>
.countries-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.country-explorer {
  text-align: center;
  padding: 20px;
}
</style>

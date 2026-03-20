import { ref, computed } from 'vue'

const visitedCountries = ref(JSON.parse(localStorage.getItem('visitedCountries') || '[]'))

function addCountry(country) {
  const code = country.cca3
  if (!visitedCountries.value.find(c => c.cca3 === code)) {
    visitedCountries.value.push(country)
    saveToLocalStorage()
  }
}

function removeCountry(code) {
  visitedCountries.value = visitedCountries.value.filter(c => c.cca3 !== code)
  saveToLocalStorage()
}

function isVisited(code) {
  return visitedCountries.value.some(c => c.cca3 === code)
}

function clearAll() {
  visitedCountries.value = []
  saveToLocalStorage()
}

function saveToLocalStorage() {
  localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries.value))
}

const count = computed(() => visitedCountries.value.length)

export default function useVisited() {
  return {
    visitedCountries,
    addCountry,
    removeCountry,
    isVisited,
    clearAll,
    count
  }
}
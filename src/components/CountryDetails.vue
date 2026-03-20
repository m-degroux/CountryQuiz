<script>
export default {
  props: {
    country: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {};
  },
  methods: {
    getLanguages() {
      return this.country.languages ? Object.values(this.country.languages).join(', ') : 'N/A';
    },
    getCurrencies() {
      if (!this.country.currencies) return 'N/A';
      return Object.values(this.country.currencies)
        .map(c => `${c.name} (${c.symbol})`)
        .join(', ');
    },
    getBorders() {
      return this.country.borders ? this.country.borders.join(', ') : 'Aucun';
    }
  }
}
</script>

<template>
  <div class="country-details">
    <router-link :to="`/`">
        <button>Fermer</button>
    </router-link>

    <img class="country-flag" :src="country.flags.png" :alt="country.flags.alt" />

    <h2>{{ country.name.official }}</h2>

    <p><strong>Capitale:</strong> {{ country.capital ? country.capital.join(', ') : 'N/A' }}</p>
    <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
    <p><strong>Région:</strong> {{ country.region }}</p>
    <p><strong>Langues:</strong> {{ getLanguages() }}</p>
    <p><strong>Devises:</strong> {{ getCurrencies() }}</p>
    <p><strong>Pays frontaliers:</strong> {{ getBorders() }}</p>
  </div>
</template>

<style scoped>
.country-details {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  text-align: center;
}

.country-flag {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

h2 {
  margin: 10px 0;
}

p {
  margin: 5px 0;
  color: #555;
}

.close-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 15px;
  transition: background 0.2s;
}

.close-btn:hover {
  background: #c0392b;
}
</style>

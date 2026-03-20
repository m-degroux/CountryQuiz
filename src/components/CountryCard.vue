<script>
export default {
  props: {
    country: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <div class="country-card">
    <img
      class="country-flag"
      :src="country.flags?.png"
      :alt="country.flags?.alt || country.name.common"
    />

    <div class="country-content">
      <h3 class="country-name">{{ country.name.common }}</h3>

      <p><strong>Region:</strong> {{ country.region }}</p>

      <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
      <router-link :to="`/country/${country.cca3}`">
        <button>Voir les détails</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.country-card {
  width: 250px;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  font-family: Arial, sans-serif;
}

.country-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.country-flag {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.country-content {
  padding: 15px;
}

.country-name {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.country-content p {
  margin: 5px 0;
  color: #555;
}
</style>

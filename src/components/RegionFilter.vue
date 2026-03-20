<script>
  export default {
    data() {
      return {
        input: ""
      }
    }
  }
</script>
<template>
  <select @change="$emit('search', $event.target.value)">
    <option value="">
      Toutes les régions
    </option>
    <option value="Africa">
        Africa
    </option>ul
    <option value="Americas">
      Americas
    </option>
    <option value="Asia">
      Asia
    </option>
    <option value="Europe">
      Europe
    </option>
    <option value="Oceania">
      Oceania
    </option>
  </select>
</template>
<style></style>

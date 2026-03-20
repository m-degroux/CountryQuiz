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
  <input type="text" @input="$emit('search', input)" v-model="input">
</template>
<style scoped></style>

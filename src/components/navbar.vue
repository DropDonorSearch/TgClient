<template>
  <div class="navbar">
    <Button class="hamburger-button" icon="pi pi-bars" @click="toggleMenu" text />
    <h3>Donor Search</h3>
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  components: {
    Button
  },
  methods: {
    toggleMenu() {
      this.$emit('toggle-menu');
    }
  }
}
</script>

<style scoped>
.hamburger-button {
  margin-left: 10px;
}

.navbar {
  height: 50px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
</style>
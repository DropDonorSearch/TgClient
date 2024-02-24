<template>
  <div class="navbar">
    <Button class="hamburger-button" icon="pi pi-bars" @click="toggleMenu" text />
    <span class="city-info">
      <i class="pi pi-map-marker"></i>
      {{ applicationStore.cityTitle }}
    </span>
  </div>
</template>

<script>
import Button from "primevue/button";
import {mapStores} from "pinia";
import {useApplicationStore} from "@/store/application-store.js";

export default {
  components: {
    Button
  },
  computed: {
    ...mapStores(useApplicationStore)
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
.city-info {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin-right: 10px;
}
.city-info:hover {
  cursor: pointer;
}

.navbar {
  height: 50px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
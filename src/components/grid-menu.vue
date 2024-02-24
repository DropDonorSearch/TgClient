<template>
  <div class="grid">
    <div class="col-6" v-for="item in menuItems" :key="item.label" @click="navigateTo(item.to)">
      <div class="flex justify-content-center align-items-center flex-column p-3 cursor-pointer shadow-2 border-round">
        <i :class="['pi', item.icon, 'text-4xl']"></i>
        <span class="mt-3 font-medium">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {homeNavigationItems} from "@/helpers/home-navigation.js";

export default {
  data() {
    return {
      menuItems: homeNavigationItems
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.cursor-pointer:hover {
  transform: scale(1.05);
  box-shadow: var(--custom-shadow-deep);
}

.shadow-2 {
  box-shadow: var(--custom-shadow-light);
}

.border-round {
  border-radius: var(--border-radius);
}
</style>

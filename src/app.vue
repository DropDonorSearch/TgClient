<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/app-layout.vue";

export default {
  components: { AppLayout }
}
</script>
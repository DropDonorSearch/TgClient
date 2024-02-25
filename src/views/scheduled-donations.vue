<template>
  <div>
    <div class="mb-3">
      <Button label="Запланировать" @click="openScheduleDonation" />
    </div>
    <div class="flex flex-column gap-3">
      <span>Донаций не обнаружено. Самое время их запланировать!</span>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  components: {
    Button
  },
  data() {
    return {
      scheduledDonationsInfo: []
    }
  },
  methods: {
    openScheduleDonation() {
      this.$router.push('/schedule-donation')
    }
  }
}
</script>
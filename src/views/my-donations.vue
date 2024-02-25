<template>
  <div>
    <div class="mb-3">
      <Button label="Добавить" @click="openAddDonation" />
    </div>
    <div class="flex flex-column gap-3">
      <span>Донаций не обнаружено. Самое время их добавить!</span>
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
      donationsInfo: []
    }
  },
  methods: {
    openAddDonation() {
      this.$router.push('/add-donation')
    }
  }
}
</script>
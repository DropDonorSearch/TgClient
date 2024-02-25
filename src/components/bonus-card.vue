<template>
  <div class="border-1 surface-border border-round p-3 event-card">
    <div
        class="flex flex-column gap-2"
    >
      <div class="flex flex-row gap-3 my-2">
        <avatar
            :image="cardData.image_url"
            class="mr-2 custom-avatar"
            size="large"
            shape="circle"
        />
        <span class="font-bold">{{ cardData.title }}</span>
      </div>
      <div
          v-if="!isTaken"
      >
        <h3 class="font-bold">{{ cardData.description }}</h3>
      </div>
      <div
          v-else
      >
        <h3 class="font-bold">Вот ваш промокод:
          <b @click.stop="copyText(cardData.promo)">{{ cardData.promo }}</b>
        </h3>
      </div>
      <Button @click="takeBonus" v-show="!isTaken" label="Взять бонус" icon="pi pi-check"/>
    </div>
  </div>
</template>

<script>

import Divider from "primevue/divider";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import apiClient from "@/api/api-client.js";

export default {
  components: {
    Divider,
    Button,
    Avatar,
  },
  props: ['cardData'],
  data() {
    return {
      isTaken: false
    }
  },
  methods: {
    takeBonus() {
      this.isTaken = !this.isTaken;
      apiClient.delete('bonuses', {
        params: {
          userId: this.applicationStore.userId,
          bonusId: this.cardData.bonus_id
        }
      })

    },
    async copyText(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch ($e) {
      }
    }
  },
}
</script>

<style>
</style>
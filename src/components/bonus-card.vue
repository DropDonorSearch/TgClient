<template>
  <div class="border-1 surface-border border-round p-3 event-card">
    <div class="flex flex-column gap-2">
      <Divider/>
      <div class="flex flex-row gap-3 my-2">
        <Avatar
            :image="cardData.partnerLogo"
            class="mr-2 custom-avatar"
            size="large"
            shape="circle"
        />
        <span class="font-bold">{{ cardData.name }}</span>
      </div>
      <div>
        <h3 class="font-bold">{{ cardData.description }}</h3>
      </div>
    </div>
  </div>
</template>

<script>

import Divider from "primevue/divider";
import Button from "primevue/button";
import Avatar from "primevue/avatar";

export default {
  components: {
    Divider,
    Button,
    Avatar,
  },
  props: ['cardData'],
}
</script>
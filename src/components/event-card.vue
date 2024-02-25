<template>
  <div class="border-1 surface-border border-round p-3">
    <div class="flex flex-column gap-2">
      <div class="flex flex-row justify-content-between">
        <div class="font-bold">{{ formatDate(cardData.start_date) }}</div>
        <div class="time">{{ formatTime(cardData.start_date) }} - {{
            formatTime(cardData.end_date)
          }}
        </div>
      </div>
      <Divider/>
      <div class="flex flex-row gap-3 my-2">
        <Avatar
            v-if="cardData.author.image"
            :image="cardData.author.image"
            class="mr-2 custom-avatar"
            size="large"
            shape="circle"
        />
        <span class="font-bold">{{ cardData.author.name }}</span>
      </div>
      <div>
        <h3 class="font-bold">{{ cardData.name }}</h3>
      </div>
      <div>
        <h4>{{ formatCity(cardData) }}</h4>
        <h4 v-if="cardData.address">{{ cardData.address }}</h4>
      </div>
      <div class="mt-1">
        <Button class="w-full" size="large" label="Записаться" @click="signUp(cardData)"/>
      </div>
    </div>
  </div>
</template>

<script>

import timeHelper from "@/helpers/time-helper.js";

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
  mixins: [timeHelper],
  methods: {
    formatDate(dateStr) {
      return this.getFormattedDateFromISOString(dateStr);
    },
    formatTime(dateStr) {
      return this.getFormattedTimeFromISOString(dateStr);
    },

    formatCity(eventData) {
      const city = eventData.city;

      if (city?.title && city?.region?.title) {
        return city.region.title + ', ' + city.title;
      }

      return null;
    },

    signUp(eventData) {
      this.$emit('event-sign-up', eventData);
    },
  }
}
</script>
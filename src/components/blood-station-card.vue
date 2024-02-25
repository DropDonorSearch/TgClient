<template>
  <div class="border-1 surface-border border-round p-3">
    <div class="flex flex-column gap-2">
      <div class="flex flex-column">
        <div class="font-bold">{{ cardData.title }}</div>
        <div class="flex flex-column gap-1">
          <a
              href="#"
              @click="openYandexMaps"
          >{{ cardData.city.title + ', ' + cardData.address }}</a>
        </div>
      </div>
      <Divider />
      <div class="flex flex-row justify-content-between">
        <div class="flex flex-row gap-2">
          <div class="flex flex-column gap-1">
            <Tag :severity="getTagSeverity(cardData.o_plus)" value="O+" />
            <Tag :severity="getTagSeverity(cardData.o_minus)" value="O-" />
          </div>
          <div class="flex flex-column gap-1">
            <Tag :severity="getTagSeverity(cardData.a_plus)" value="A+" />
            <Tag :severity="getTagSeverity(cardData.a_minus)" value="A-" />
          </div>
          <div class="flex flex-column gap-1">
            <Tag :severity="getTagSeverity(cardData.b_plus)" value="B+" />
            <Tag :severity="getTagSeverity(cardData.b_minus)" value="B-" />
          </div>
          <div class="flex flex-column gap-1">
            <Tag :severity="getTagSeverity(cardData.ab_plus)" value="AB+" />
            <Tag :severity="getTagSeverity(cardData.ab_minus)" value="AB-" />
          </div>
        </div>
        <Button label="Запись" @click="scheduleDonation(cardData.id)"/>
      </div>
    </div>
  </div>
</template>
<script>
import {mapStores} from "pinia";
import {useApplicationStore} from "@/store/application-store.js";

import Divider from "primevue/divider";
import Tag from "primevue/tag";
import Button from "primevue/button";

export default {
  components: {
    Divider,
    Tag,
    Button
  },
  props: ['cardData'],
  computed: {
    ...mapStores(useApplicationStore),
  },
  methods: {
    getTagSeverity(bloodTypeNecessity) {
      return bloodTypeNecessity == 'accept' ? 'success' : 'danger';
    },
    scheduleDonation(bloodStationId) {
      this.$emit('schedule-donation', bloodStationId);
    },

    constructYandexLink() {
      const address = this.cardData.address.replace(/ /g, '+');

      return 'https://yandex.ru/maps/?text=' + this.cardData.city.title + ',' + address;
    },

    openYandexMaps() {
      window.open(this.constructYandexLink(), '_blank', 'location=yes')
    }
  }
}
</script>
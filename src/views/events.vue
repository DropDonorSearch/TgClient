<template>
  <div>
    <div
        class="flex flex-column gap-2"
        ref="scrollComponent"
    >
      <EventCard v-for="infoItem in eventsInfo" key="infoItem.id" :card-data="infoItem"/>
    </div>
    <div v-if="!loading && !eventsInfoAvailable">
      <h3>В вашем городе пока не запланировано мероприятий, но они обязательно скоро появятся :)</h3>
    </div>
    <Spinner v-if="loading"/>
  </div>
</template>

<script>
import {mapStores} from "pinia";
import {useApplicationStore} from "@/store/application-store.js";

import timeHelper from "@/helpers/time-helper.js";
import apiClient from "@/api/api-client.js";
import Spinner from "@/components/spinner.vue";
import EventCard from "@/components/event-card.vue";

const PAGE_SIZE = 10;

export default {
  components: {
    EventCard,
    Spinner
  },
  data() {
    return {
      loading: false,
      eventsInfo: [],

      nextPath: undefined
    }
  },
  mixins: [timeHelper],
  computed: {
    ...mapStores(useApplicationStore),
    eventsInfoAvailable() {
      return this.eventsInfo && this.eventsInfo.length > 0;
    }
  },
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
      // TODO: implement
    },

    async loadNextData() {
      if (!this.nextPath || this.loading) {
        return;
      }

      this.loading = true;

      await apiClient.get(this.nextPath)
          .then((response) => {
            const data = response.data;

            if (data?.results) {
              this.eventsInfo.push(...response.data?.results);
            }

            this.nextPath = data?.next ?? undefined;
          })
          .finally(() => this.loading = false);
    },
    initialLoadData() {
      this.loading = true;

      apiClient.get('/events', {
        params: {
          page_size: PAGE_SIZE,
          page: 1
        }
      })
          .then((response) => {
            const data = response.data;

            if (data?.results) {
              this.eventsInfo = response.data?.results;
            }

            this.nextPath = data?.next ?? undefined;
          })
          .finally(() => this.loading = false);
    },

    handleScroll() {
      if (!this.$refs.scrollComponent) return;

      let element = this.$refs.scrollComponent;
      if (element.getBoundingClientRect().bottom < window.innerHeight && !this.loading) {
        this.loadNextData();
      }
    }
  },
  async mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.initialLoadData();
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}
</script>

<style>
.custom-avatar img {
  object-fit: cover;
  width: 3rem;
  height: 3rem;
}
</style>

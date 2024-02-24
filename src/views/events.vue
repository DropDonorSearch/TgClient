<template>
  <div>
    <div class="flex flex-column gap-2" v-if="eventsInfoAvailable">
      <h3>Скоро пройдет {{ eventsCount }} мероприятий</h3>
      <Carousel :value="eventsInfo" :responsive-options="carousel.responsiveOptions">
        <template #item="slotProps">
          <div class="border-1 surface-border border-round m-2 p-3 event-card">
            <div class="flex flex-column gap-2">
              <div class="flex flex-row justify-content-between">
                <div class="font-bold">{{ formatDate(slotProps.data.start_date) }}</div>
                <div class="time">{{ formatTime(slotProps.data.start_date) }} - {{
                    formatTime(slotProps.data.end_date)
                  }}
                </div>
              </div>
              <Divider/>
              <div class="flex flex-row gap-3 my-2">
                <Avatar
                    v-if="slotProps.data.author.image"
                    :image="slotProps.data.author.image"
                    class="mr-2 custom-avatar"
                    size="large"
                    shape="circle"
                />
                <span class="font-bold">{{ slotProps.data.author.name }}</span>
              </div>
              <div>
                <h3 class="font-bold">{{ slotProps.data.name }}</h3>
              </div>
              <div>
                <h4>{{ formatCity(slotProps.data) }}</h4>
                <h4 v-if="slotProps.data.address">{{ slotProps.data.address }}</h4>
              </div>
              <div class="mt-1">
                <Button class="w-full" size="large" label="Записаться" @click="signUp(slotProps.data)"/>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
    <div v-else-if="!loading && !eventsInfoAvailable">
      <h3>В вашем городе пока не запланировано мероприятий, но они обязательно скоро появятся :)</h3>
    </div>
    <Spinner v-else/>
  </div>
</template>

<script>
import {mapStores} from "pinia";
import {useApplicationStore} from "@/store/application-store.js";
import {mockEventsInfo} from "@/helpers/mock-events-info.js";
import Carousel from "primevue/carousel";
import Divider from "primevue/divider";
import Button from "primevue/button";
import Avatar from "primevue/avatar";

import timeHelper from "@/helpers/time-helper.js";
import apiClient from "@/api/apiClient.js";
import Spinner from "@/components/spinner.vue";

export default {
  components: {
    Carousel,
    Divider,
    Button,
    Avatar,
    Spinner
  },
  data() {
    return {
      loading: false,
      eventsInfo: [],
      carousel: {
        responsiveOptions: [
          {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
          },
          {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
          },
          {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
          }
        ]
      }
    }
  },
  mixins: [timeHelper],
  computed: {
    ...mapStores(useApplicationStore),
    eventsInfoAvailable() {
      return this.eventsInfo && this.eventsInfo.length > 0;
    },
    eventsCount() {
      if (!this.eventsInfo) {
        return 0;
      }

      return this.eventsInfo.length;
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

    loadData() {
      this.loading = true;

      apiClient.get('/events', {params: {
          page_size: 10,
          page: 1
        }})
          .then((response) => {
            if (response.data?.results) {
              this.eventsInfo = response.data?.results;
            }
          })
          .finally(() => this.loading = false);
    }
  },
  async mounted() {
    this.loadData();
  }
}
</script>

<style>
.event-card {
  max-width: 360px;
  margin: 1rem;
}

.event-logo {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

.volunteers {
  text-align: center;
  margin-top: 1rem;
}

.custom-avatar img {
  object-fit: cover;
  width: 3rem;
  height: 3rem;
}
</style>

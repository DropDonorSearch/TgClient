<template>
  <div class="flex flex-column gap-2">
    <div class="flex flex-row gap-3 align-items-center">
      <h3>Город</h3>
      <Dropdown
          :options="cities"
          optionLabel="title"
          optionValue="id"
          v-model="cityId"
      />
    </div>
    <div
        class="flex flex-column gap-2"
        ref="scrollComponent"
    >
      <BloodStationCard
          v-for="infoItem in bloodStationsInfo"
          key="infoItem.id"
          :card-data="infoItem"
          @schedule-donation="openScheduleDonation"
      />
    </div>
    <div v-if="!loading && !bloodStationsInfoAvailable">
      <h3>По вашему городу нет информации о пунктах приема крови, но она обязательно появится!</h3>
    </div>
    <Spinner v-if="loading"/>
  </div>
</template>

<script>
import Spinner from "@/components/spinner.vue";
import BloodStationCard from "@/components/blood-station-card.vue";
import {mapStores} from "pinia";
import {useApplicationStore} from "@/store/application-store.js";
import apiClient from "@/api/api-client.js";
import Dropdown from "primevue/dropdown";

const PAGE_SIZE = 10;

export default {
  components: {BloodStationCard, Spinner, Dropdown},
  data() {
    return {
      loading: false,

      bloodStationsInfo: [],
      cities: [],

      cityId: 2
    }
  },
  watch: {
    cityId(newVal, prevVal) {
      if (newVal != prevVal) {
        this.bloodStationsInfo = [];
        this.initialLoadData();
      }
    }
  },
  computed: {
    ...mapStores(useApplicationStore),

    bloodStationsInfoAvailable() {
      return this.bloodStationsInfo.length > 0;
    },
  },
  methods: {
    handleScroll() {
      if (!this.$refs.scrollComponent) return;

      let element = this.$refs.scrollComponent;
      if (element.getBoundingClientRect().bottom < window.innerHeight && !this.loading) {
        this.loadNextData();
      }
    },

    initialLoadData() {
      this.loading = true;

      apiClient.get('/blood-stations', {
        params: {
          city_id: this.cityId ?? undefined,
          page_size: PAGE_SIZE,
          page: 1
        }
      })
          .then((response) => {
            const data = response.data;

            if (data.results) {
              this.bloodStationsInfo = response.data.results;
            }

            this.nextPath = data?.next ?? undefined;
          })
          .finally(() => this.loading = false);
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
              this.bloodStationsInfo.push(...response.data?.results);
            }

            this.nextPath = data?.next ?? undefined;
          })
          .finally(() => this.loading = false);
    },

    openScheduleDonation(bloodStationId) {
      this.$router.push({ path: 'schedule-donation', query: {
          bloodStationId, cityId: this.cityId
      } });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    apiClient.get('/cities')
        .then((response) => {
          this.cities = response.data.results;
        });

    this.initialLoadData();
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}
</script>
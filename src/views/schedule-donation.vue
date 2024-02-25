<template>
  <div class="p-fluid">
    <div class="grid">
      <div class="col-12">
        <h3>Выберите тип донации</h3>
        <div class="flex align-items-center" v-for="donationType in bloodDonationTypesList">
          <RadioButton
              v-model="donation.type"
              :inputId="donationType.value"
              :value="donationType.value"
          />
          <label :for="donationType.value" class="m-2">{{ donationType.label }}</label>
        </div>
      </div>
      <div class="col-12">
        <h3>Планируемая дата донации</h3>
        <Calendar
            v-model="donation.date"
            placeholder="Укажите дату"
            date-format="yy/mm/dd"
            :min-date="new Date()"
        />
      </div>
      <div class="col-12">
        <h3>Возмездность</h3>
        <div class="flex align-items-center">
          <RadioButton
              v-model="donation.kind"
              input-id="free"
              value="free"
          />
          <label for="free" class="m-2">
            <span class="flex flex-row justify-content-center align-items-center gap-1">
              <span>Безвозмездно</span>
              <a href="#" @click="openFreeSuggestion">
                <i class="pi pi-question-circle"/>
              </a>
            </span>
          </label>
          <OverlayPanel width="80vw" ref="opFree">
            <span class="overlay-font">
              Питание или компенсация питания: 5 процентов МРОТ (около 700-1500 рублей).
              Учитывается при получении звания Почетного донора
            </span>
          </OverlayPanel>
        </div>
        <div class="flex align-items-center">
          <RadioButton
              v-model="donation.kind"
              input-id="paid"
              value="paid"
          />
          <label for="paid" class="m-2">
            <span class="flex flex-row justify-content-center align-items-center gap-1">
              <span>Платно</span>
              <a href="#" @click="openPaidSuggestion">
                <i class="pi pi-question-circle"/>
              </a>
            </span>
          </label>
          <OverlayPanel ref="opPaid">
            <span class="overlay-font">
              Не учитывается при получении звания Почетного донора
            </span>
          </OverlayPanel>
        </div>
      </div>
      <div class="col-12">
        <h3>Место сдачи</h3>
        <div class="flex align-items-center">
          <RadioButton
              v-model="donation.place"
              input-id="station"
              value="station"
          />
          <label for="station" class="m-2">
            <span class="flex flex-row justify-content-center align-items-center gap-1">
              <span>Стационарный пункт</span>
              <a href="#" @click="openStationSuggestion">
                <i class="pi pi-question-circle"/>
              </a>
            </span>
          </label>
          <OverlayPanel width="80vw" ref="opStation">
            <span class="overlay-font">
              Центр крови или станция переливания в вашем городе
            </span>
          </OverlayPanel>
        </div>
        <div class="flex align-items-center">
          <RadioButton
              v-model="donation.place"
              input-id="mobile"
              value="mobile"
          />
          <label for="mobile" class="m-2">
            <span class="flex flex-row justify-content-center align-items-center gap-1">
              <span>Выездная акция</span>
              <a href="#" @click="openMobileSuggestion">
                <i class="pi pi-question-circle"/>
              </a>
            </span>
          </label>
          <OverlayPanel ref="opMobile">
            <span class="overlay-font">
              День донора, выезды в ВУЗы, передвижные мобильные бригады
            </span>
          </OverlayPanel>
        </div>
      </div>
      <div class="col-12">
        <h3>Город</h3>
        <Dropdown
            v-if="!loading"
            :options="cities"
            optionLabel="title"
            optionValue="id"
            v-model="donation.city"
        />
        <Spinner v-else />
      </div>
      <div class="col-12">
        <h3>Пункт приема крови</h3>
        <Dropdown
            v-if="!loading"
            :options="bloodStations"
            optionLabel="title"
            optionValue="id"
            v-model="donation.bloodStation"
        />
        <Spinner v-else />
      </div>
      <div class="col-12">
        <Button label="Запланировать донацию" @click="submit" :disabled="disabledSubmit" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import FileUpload from "primevue/fileupload";
import OverlayPanel from "primevue/overlaypanel";
import apiClient from "@/api/api-client.js";
import Spinner from "@/components/spinner.vue";

export default {
  components: {
    Spinner,
    Button,
    RadioButton,
    Calendar,
    Dropdown,
    FileUpload,
    OverlayPanel
  },
  data() {
    return {
      cities: [],
      bloodStations: [],
      donation: {
        type: 'wholeBlood',
        date: undefined,
        kind: 'free',
        place: 'station',
        city: 1,
        reference: 'referenceNow',
        bloodStation: undefined
      },
      bloodDonationTypesList: [
        {
          label: 'Цельная кровь',
          value: 'wholeBlood'
        },
        {
          label: 'Плазма',
          value: 'plasma'
        },
        {
          label: 'Тромбоциты',
          value: 'platelets'
        },
        {
          label: 'Эритроциты',
          value: 'erythrocytes'
        },
        {
          label: 'Гранулоциты',
          value: 'granulocytes'
        }
      ],

      loading: true
    };
  },
  computed: {
    referenceNow() {
      return this.donation.reference === 'referenceNow';
    },
    disabledSubmit() {
      return !this.donation.bloodStation || !this.donation.date;
    }
  },
  methods: {
    submit() {
      console.log(this.donation);
    },
    openPaidSuggestion(event) {
      this.$refs.opPaid.toggle(event);
    },
    openFreeSuggestion(event) {
      this.$refs.opFree.toggle(event);
    },

    openStationSuggestion(event) {
      this.$refs.opStation.toggle(event);
    },
    openMobileSuggestion(event) {
      this.$refs.opMobile.toggle(event);
    },

    openReferenceLaterSuggestion(event) {
      this.$refs.opReferenceLater.toggle(event);
    },
  },
  async mounted() {
    const citiesResponse = await apiClient.get('/cities');

    if (citiesResponse.data) {
      this.cities = citiesResponse.data.results;
      this.loading = false;
    }

    const query = this.$route.query;

    if (query?.cityId) {
      this.donation.city = Number(query.cityId);
    }
    if (query?.bloodStationId) {
      this.donation.bloodStation = Number(query.bloodStationId);

      const bloodStationResponse = await apiClient.get(`/blood-stations/${query.bloodStationId}`);
      this.bloodStations = [bloodStationResponse.data];
    } else {
      const bloodStationsResponse = await apiClient.get('/blood-stations', {city_id: this.donation.city});
      this.bloodStations = bloodStationsResponse.data.results;
    }
  }
}
</script>

<style scoped>
.p-overlaypanel {
  width: 80vw !important;
}

.overlay-font {
  font-size: 10pt;
}
</style>
<template>
  <div>
    <Dialog
        :style="{ width: '80vw' }"
        :modal="true"
        v-model:visible="contraindicationsModalVisible"
    >
      <template #header>
        <span class="font-bold">Могу ли я стать донором?</span>
      </template>
      <div class="flex flex-column gap-3">
        <DonorContraindications />
        <Button label="Хорошо" @click="toggleModal" />
      </div>
    </Dialog>
    <div class="flex flex-column gap-3">
      <div>
        <h2>Как стать донором?</h2>
        <ol>
          <li>Убедитесь, что у вас нет <a href="#" @click="toggleModal">противопоказаний</a> к сдаче крови.</li>
          <li><a href="#" @click="openBloodStations">Выберите</a> ближайший центр крови, уточните потребности по указанным телефонам и запланируйте донацию.</li>
          <li>В запланированный день приходите в центр крови, не забудьте паспорт!</li>
          <li>После донации вы получите справку - сфотографируйте её и загрузите в ваш личный кабинет.</li>
        </ol>
      </div>

      <div>
        <h2>Как подготовиться к сдаче крови?</h2>
        <ul>
          <li>Накануне и в день сдачи крови не рекомендуется употреблять жирную, жареную, острую и копченую пищу.</li>
          <li>За 48 часов до визита на станцию переливания нельзя употреблять алкоголь.</li>
          <li>Утром нужно легко позавтракать. Натощак сдавать кровь нельзя!</li>
        </ul>
      </div>

      <div>
        <h2>Что делать после сдачи крови?</h2>
        <ul>
          <li>Если вы чувствуете головокружение или слабость, обратитесь к персоналу.</li>
          <li>Воздержитесь от курения в течение часа до и после кроводачи.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Dialog from "primevue/dialog";
import DonorContraindications from "@/components/donor-contraindications.vue";
import Button from "primevue/button";

export default {
  components: {
    DonorContraindications,
    Dialog,
    Button
  },
  data() {
    return {
      contraindicationsModalVisible: false
    }
  },
  methods: {
    toggleModal(event) {
      this.contraindicationsModalVisible = !this.contraindicationsModalVisible;
    },
    openBloodStations() {
      this.$router.push('/blood-stations');
    }
  }
}
</script>
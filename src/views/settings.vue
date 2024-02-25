<template>
  <div class="p-fluid">
    <form @submit.prevent="submitForm">
      <div class="field">
        <label for="first_name">Имя</label>
        <InputText id="first_name" v-model="user.first_name" placeholder="Введите имя" />
      </div>
      <div class="field">
        <label for="last_name">Фамилия</label>
        <InputText id="last_name" v-model="user.last_name" placeholder="Введите фамилию" />
      </div>
      <div class="field">
        <label for="last_name">Отчество</label>
        <InputText id="last_name" v-model="user.middle_name" placeholder="Введите отчество" />
      </div>
      <div class="field">
        <label for="last_name">О себе</label>
        <InputText id="last_name" v-model="user.about" placeholder="Введите информацию о себе" />
      </div>
      <div class="field">
        <label for="gender">Пол</label>
        <Dropdown id="gender" v-model="user.gender" :options="genders" optionValue="value" optionLabel="name" placeholder="Выберите пол" />
      </div>
      <Button type="submit" label="Сохранить" :disabled="disabledSubmitButton" />
    </form>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputOtp from "primevue/inputotp";
import { mapStores } from "pinia";
import { useApplicationStore } from "@/store/application-store.js";
import apiClient from "@/api/api-client.js";
import Dropdown from "primevue/dropdown";

const MAX_OTP_LENGTH = 5;

export default {
  components: {
    InputText,
    InputOtp,
    Button,
    Dropdown
  },
  watch: {
    otpCode(newValue, prevVal) {
      if (newValue.length > MAX_OTP_LENGTH) {
        this.otpCode = prevVal;
      }
    }
  },
  computed: {
    ...mapStores(useApplicationStore),
    disabledSubmitButton() {
      return !this.user || !this.user.first_name || !this.user.last_name || !this.user.gender;
    }
  },
  data() {
    return {
      user: {
        id: undefined,
        first_name: undefined,
        last_name: undefined,
        middle_name: undefined,
        about: undefined,
        gender: undefined
      },

      genders: [
        { name: 'Мужской', value: 'male' },
        { name: 'Женский', value: 'female' }
      ],
    }
  },
  methods: {
    async submitForm() {
      const editPayload = {
        "first_name": this.user.first_name,
        "last_name": this.user.last_name,
        "middle_name": this.user.middle_name,
        "about": this.user.about,
        "gender": this.user.gender.value
      };

      try {
        const response = await apiClient.patch(`/user/${this.user.id}`, editPayload);

        await this.applicationStore.refreshUserState();
        this.$router.push('/');
      } catch (error) {
        console.error("Registration error:", error.response);
        await this.applicationStore.refreshUserState();
      }
    },
  },
  mounted() {
    this.user = this.applicationStore.user;
  }
}
</script>


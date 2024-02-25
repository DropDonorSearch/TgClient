<template>
  <div class="p-fluid">
    <Dialog
        :style="{ width: '25rem' }"
        :modal="true"
        v-model:visible="otpDialogVisible"
    >
      <template #header>
        <span class="font-bold">Подтверждение Email</span>
      </template>
      <div class="flex flex-column gap-3 align-items-center">
        <span>На вашу почту был отправлен пятизначный код. Пожалуйста, введите его</span>
        <InputOtp v-model="otpCode" :length="otpCodeLength" mask integer-only />
        <Button
            label="Подтвердить"
            :disabled="disabledOtpResolveButton"
            @click="resolveOtpCode"
        />
      </div>
    </Dialog>
    <form @submit.prevent="submitForm">
      <div class="field">
        <label for="firstName">Имя</label>
        <InputText id="firstName" v-model="user.firstName" placeholder="Введите имя" />
      </div>
      <div class="field">
        <label for="email">Email</label>
        <InputText id="email" type="email" v-model="user.email" placeholder="Введите email" />
      </div>
      <div class="field">
        <label for="password">Пароль</label>
        <InputText id="password" type="password" v-model="user.password" placeholder="Введите пароль" />
      </div>
      <Button type="submit" label="Зарегистрироваться" :disabled="disabledRegisterButton" />
    </form>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputOtp from "primevue/inputotp";
import { mapStores } from "pinia";
import { useApplicationStore } from "@/store/application-store.js";
import apiClient from "@/api/api-client.js";
import {HttpStatusCode} from "axios";

const MAX_OTP_LENGTH = 5;

export default {
  components: {
    InputText,
    InputOtp,
    Button,
    Dialog
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
    disabledOtpResolveButton() {
      return this.otpCode == null || this.otpCode && String(this.otpCode).length < MAX_OTP_LENGTH;
    },
    disabledRegisterButton() {
      return !this.user || !this.user.firstName || !this.user.email || !this.user.password;
    }
  },
  data() {
    return {
      otpDialogVisible: false,
      otpCode: undefined,
      otpCodeLength: MAX_OTP_LENGTH,

      resolveOtp: undefined,

      user: {
        firstName: undefined,
        email: undefined,
        password: undefined
      }
    }
  },
  methods: {
    showOtpModal() {
      this.otpDialogVisible = true;
    },
    getOtpCodeFromUser() {
      return new Promise((resolve, reject) => {
        this.showOtpModal();
        this.resolveOtp = resolve;
      })
    },
    resolveOtpCode() {
      if (this.otpCode) {
        this.resolveOtp(this.otpCode);
        this.otpDialogVisible = false;
      }
    },
    async submitForm() {
      const registrationPayload = {
        email: this.user.email,
        password: this.user.password,
        first_name: this.user.firstName,
        tag: 'Bonus'
      };

      try {
        const response = await apiClient.post('/auth/register', registrationPayload);

        if (response.data.user_id) {
          const otpCode = await this.getOtpCodeFromUser();

          const otpPayload = {
            code: otpCode,
            user_id: response.data.user_id,
            email: this.user.email
          }
          await apiClient.post('/auth/confirm-email-reg', otpPayload);

          await this.applicationStore.refreshUserState();
          this.$router.push('/');
        }
      } catch (error) {
        console.error("Registration error:", error.response);
        await this.applicationStore.refreshUserState();
      }
    },
  }
}
</script>


<template>
  <div class="p-fluid">
    <form @submit.prevent="submitForm">
      <div class="field">
        <label for="email">Email</label>
        <InputText id="email" type="email" v-model="user.email" />
      </div>
      <div class="field">
        <label for="password">Пароль</label>
        <InputText id="password" type="password" v-model="user.password" />
      </div>
      <div>
        <Button type="submit" label="Войти" :disabled="disabledLoginButton" />
      </div>
    </form>
  </div>
</template>

<script>
import apiClient from "@/api/api-client.js";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import {HttpStatusCode} from "axios";
import {mapStores} from "pinia";
import {useApplicationStore} from "@/store/application-store.js";

export default {
  components: {
    InputText,
    Button
  },
  data() {
    return {
      user: {
        email: undefined,
        password: undefined
      }
    }
  },
  computed: {
    ...mapStores(useApplicationStore),
    disabledLoginButton() {
      return !this.user || !this.user.email || !this.user.password;
    }
  },
  methods: {
    async submitForm() {
      const loginPayload = {
        username: this.user.email,
        password: this.user.password
      }

      const loginResponse = await apiClient.post('/auth/login', loginPayload);

      await this.applicationStore.refreshUserState();
      this.$router.push('/');
    }
  }
}
</script>
<template>
  <div class="p-fluid">
    <form @submit.prevent="submitForm">
      <div class="field">
        <label for="firstName">Имя</label>
        <InputText id="firstName" v-model="user.firstName" />
      </div>
      <div class="field">
        <label for="lastName">Фамилия</label>
        <InputText id="lastName" v-model="user.lastName" />
      </div>
      <div class="field">
        <label for="email">Email</label>
        <InputText id="email" type="email" v-model="user.email" />
      </div>
      <div class="field">
        <label for="password">Пароль</label>
        <InputText id="password" type="password" v-model="user.password" />
      </div>
      <Button type="submit" label="Зарегистрироваться" />
    </form>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import apiClient from "@/api/apiClient.js";
import {mapStores} from "pinia";
import {useApplicationStore} from "@/store/application-store.js";

export default {
  components: {
    InputText,
    Button
  },
  computed: {
    ...mapStores(useApplicationStore)
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async submitForm() {
      console.log('submit');
      const payload = {
        email: this.user.email,
        password: this.user.password,
        first_name: `${this.user.firstName} ${this.user.lastName}`,
        tag: 'Bonus'
      };
      try {
        const response = await apiClient.post('/auth/register', payload);

        if (response.data.user_id) {
          const meResponse = await apiClient.get('/auth/me');

          if (meResponse.data) {
            this.applicationStore.setUser({
              id: meResponse.data.id,
              firstName: meResponse.data.first_name,
              lastName: meResponse.data.last_name,
              email: meResponse.data.email
            })

            this.$router.push('/');
          }
        }

        // this.$emit('registration-success', response.data); // Optionally emit an event on successful registration
        // this.$router.push('/home')
      } catch (error) {
        // console.error("Registration error:", error.response);
        // this.$emit('registration-failed', error.response); // Optionally emit an event on failed registration
      }
    }
  }
}
</script>

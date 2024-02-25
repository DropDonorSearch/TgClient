<template>
  <div>
    <div
        v-if="!applicationStore.userId"
        class="flex flex-column align-items-center justify-content-center gap-3 surface-border border-round m-2 p-3"
    >
      <div class="text-center">
        <span class="donor-search-sign">DonorSearch</span>
        <h1 class="font-bold">- твой путеводитель в мир донорства</h1>
      </div>
      <Button label="Зарегистрироваться" @click="openRegister" />
      <Button label="Войти" severity="secondary" @click="openLogin" />
    </div>
    <div class="flex flex-column gap-3" v-else>
      <h2>Здравствуйте, {{ applicationStore.userFullName }}!</h2>
      <GridMenu :menuItems="menuItems"/>
    </div>
  </div>
</template>

<script>
import {mapStores} from "pinia";
import {useApplicationStore} from "@/store/application-store.js";
import Button from "primevue/button";
import GridMenu from "@/components/grid-menu.vue";

export default {
  components: {
    Button,
    GridMenu
  },
  data() {
    return {}
  },
  computed: {
    ...mapStores(useApplicationStore)
  },
  methods: {
    openRegister() {
      this.$router.push('/register');
    },
    openLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style>
.donor-search-sign {
  font-weight: bold;
  font-size: 36pt;
  color: #f73232;
}
</style>
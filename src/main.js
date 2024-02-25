import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from "primevue/config"

import VueSplide from "@splidejs/vue-splide";

import 'primevue/resources/themes/aura-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import App from './app.vue';
import router from './router';
import {useApplicationStore} from "@/store/application-store.js";

import VueCookies from 'vue3-cookies';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const applicationStore = useApplicationStore();
await applicationStore.refreshUserState();

app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(VueSplide);
app.use(VueCookies);

app.mount('#app');

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from "primevue/config"

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import App from './app.vue';
import router from './router';
import {useApplicationStore} from "@/store/application-store.js";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const applicationStore = useApplicationStore();
applicationStore.loadFromLocalStorage();

app.use(router);
app.use(PrimeVue);

app.mount('#app');

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
import DonorMemo from "@/views/donor-memo.vue"
import Settings from "@/views/settings.vue";
import Events from "@/views/events.vue";
import BloodStations from "@/views/blood-stations.vue";
import MyDonations from "@/views/my-donations.vue";
import Register from "@/views/register.vue";
import Login from "@/views/login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { header: 'Главная' }
    },
    {
      path: '/donor-memo',
      name: 'donor-memo',
      component: DonorMemo,
      meta: { header: 'Памятка донору' }
    },
    {
      path: '/blood-stations',
      name: 'blood-stations',
      component: BloodStations,
      meta: { header: 'Где сдать кровь' }
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
      meta: { header: 'Мероприятия' }
    },
    {
      path: '/my-donations',
      name: 'my-donations',
      component: MyDonations,
      meta: { header: 'Мои донации' }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { header: 'Регистрация' }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { header: 'Войти' }
    },

    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: { header: 'Настройки' }
    }
  ]
})

export default router

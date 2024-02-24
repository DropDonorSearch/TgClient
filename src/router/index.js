import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
import DonorMemo from "@/views/donor-memo.vue"
import Settings from "@/views/settings.vue";
import Events from "@/views/events.vue";

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
      path: '/'
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
      meta: { header: 'Мероприятия' }
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

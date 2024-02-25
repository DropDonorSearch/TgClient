import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
import DonorMemo from "@/views/donor-memo.vue"
import Settings from "@/views/settings.vue";
import Events from "@/views/events.vue";
import BloodStations from "@/views/blood-stations.vue";
import MyDonations from "@/views/my-donations.vue";
import Register from "@/views/register.vue";
import Login from "@/views/login.vue";
import AddDonation from "@/views/add-donation.vue";
import ScheduleDonation from "@/views/schedule-donation.vue";
import ScheduledDonations from "@/views/scheduled-donations.vue";
import {useApplicationStore} from "@/store/application-store.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { header: 'Главная', requiresLogin: false }
    },
    {
      path: '/donor-memo',
      name: 'donor-memo',
      component: DonorMemo,
      meta: { header: 'Памятка донору', requiresLogin: false }
    },
    {
      path: '/blood-stations',
      name: 'blood-stations',
      component: BloodStations,
      meta: { header: 'Где сдать кровь', requiresLogin: false }
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
      meta: { header: 'Мероприятия', requiresLogin: false }
    },
    {
      path: '/my-donations',
      name: 'my-donations',
      component: MyDonations,
      meta: { header: 'Мои донации', requiresLogin: true }
    },
    {
      path: '/add-donation',
      name: 'add-donation',
      component: AddDonation,
      meta: { header: 'Добавить донацию', requiresLogin: true }
    },
    {
      path: '/scheduled-donations',
      name: 'scheduled-donations',
      component: ScheduledDonations,
      meta: { header: 'Запланированные донации', requiresLogin: true }
    },
    {
      path: '/schedule-donation',
      name: 'schedule-donation',
      component: ScheduleDonation,
      params: true,
      meta: { header: 'Запланировать донацию', requiresLogin: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { header: 'Регистрация', requiresLogin: false }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { header: 'Войти', requiresLogin: false }
    },
    {
      path: '/logout',
      name: 'logout',
      async beforeEnter (to, from, next) {
        await useApplicationStore().logout();
        return next('/');
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: { header: 'Настройки', requiresLogin: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useApplicationStore();
  if (!store.loggedIn && to.matched.some(record => record.meta.requiresLogin)) {
    next("/login")
  } else {
    next()
}})

export default router

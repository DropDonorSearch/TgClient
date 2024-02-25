<template>
  <div>
    <Sidebar v-model:visible="sidebarVisible">
      <template #container="{ closeCallback }">
        <div class="flex flex-column h-full">
          <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
            <span class="inline-flex align-items-center gap-2">
              <img src="@/assets/donor-search-logo.svg" alt="Donor Search Logo"/>
            </span>
          </div>
          <div class="flex flex-column h-full justify-content-between overflow-y-auto">
            <ul class="list-none p-3 m-0">
              <li class="my-1" v-for="item in navigationItems" :key="item.label">
                <a class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:bg-black-alpha-10 transition-duration-150 transition-colors p-ripple"
                   :class="{'active': isActiveRoute(item.to)}"
                   @click="switchRoute(item.to)"
                >
                  <i :class="item.icon + ' mr-2'"></i>
                  <span class="font-medium">{{ item.label }}</span>
                </a>
              </li>
            </ul>
            <ul v-if="applicationStore.loggedIn" class="list-none p-3 m-0">
              <li v-for="item in profileItems" :key="item.label">
                <a
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:bg-black-alpha-10 transition-duration-150 transition-colors p-ripple"
                    :class="{'active': isActiveRoute(item.to)}"
                    @click="switchRoute(item.to)"
                >
                  <i :class="item.icon + ' mr-2'"></i>
                  <span class="font-medium">{{ item.label }}</span>
                  <span v-if="item.badge"
                        class="inline-flex align-items-center justify-content-center ml-auto bg-primary border-circle"
                        style="min-width: 1.5rem; height: 1.5rem">{{ item.badge }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div v-if="applicationStore.loggedIn" class="mt-auto">
            <hr class="mb-3 mx-3 border-top-1 border-none surface-border"/>
            <div class="m-3 flex align-items-center">
              <span class="font-bold">{{ userFullName }}</span>
            </div>
          </div>
        </div>
      </template>
    </Sidebar>

    <Navbar @toggle-menu="toggleSidebar"/>
    <div class="flex flex-column gap-3 my-2 mx-4">
      <h1>{{ routeHeader }}</h1>
      <div class="router-slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";
import {sidebarNavigationItems} from "@/helpers/sidebar-navigation.js";
import {mapStores} from "pinia";
import {useApplicationStore} from "@/store/application-store.js";

export default {
  components: {
    Navbar,
    Button,
    Sidebar
  },
  data() {
    return {
      sidebarVisible: false,
      profileItems: [
        {
          label: 'Настройки',
          icon: 'pi pi-cog',
          to: '/settings'
        },
        {
          label: 'Выход',
          icon: 'pi pi-sign-out',
          to: '/logout'
        }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    switchRoute(to) {
      this.$router.push(to);
      this.toggleSidebar();
    }
  },
  computed: {
    userFullName() {
      return this.applicationStore.userFullName ?? 'Гость';
    },
    isActiveRoute() {
      return (itemTo) => {
        return this.$route.path === itemTo;
      };
    },
    routeHeader() {
      return this.$route.meta.header ?? 'Упс';
    },
    navigationItems() {
      const navigationItems = sidebarNavigationItems;

      if (this.applicationStore.loggedIn) {
        navigationItems.push(
            {
              label: 'Мои донации',
              icon: 'pi pi-list',
              to: '/my-donations'
            },
            {
              label: 'Запланированные донации',
              icon: 'pi pi-calendar',
              to: '/scheduled-donations'
            }
        );
      }

      return navigationItems;
    },
    ...mapStores(useApplicationStore)
  }
}
</script>

<style>
.p-sidebar {
  background: var(--color-background) !important;
  border: 1px solid var(--color-background) !important;
}

.p-sidebar, .text-700 {
  color: var(--color-text) !important;
}

.active {
  background-color: var(--primary-color);
  color: white !important;
}
</style>
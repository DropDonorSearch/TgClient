<template>
  <div class="app-layout">
    <Sidebar v-model:visible="sidebarVisible">
      <template #container="{ closeCallback }">
        <div class="flex flex-column h-full">
          <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
            <span class="inline-flex align-items-center gap-2">
              <img src="@/assets/donor-search-logo.svg" alt="Donor Search Logo" />
            </span>
          </div>
          <div class="flex flex-column justify-content-around overflow-y-auto">
            <ul class="list-none p-3 m-0">
              <li v-for="item in navigationItems" :key="item.label">
                <a v-ripple
                   class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <i :class="item.icon + ' mr-2'"></i>
                  <span class="font-medium">{{ item.label }}</span>
                </a>
              </li>
            </ul>
            <ul class="list-none p-3 m-0">
              <li v-for="item in profileItems" :key="item.label">
                <a v-ripple
                   class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <i :class="item.icon + ' mr-2'"></i>
                  <span class="font-medium">{{ item.label }}</span>
                  <span v-if="item.badge"
                        class="inline-flex align-items-center justify-content-center ml-auto bg-primary border-circle"
                        style="min-width: 1.5rem; height: 1.5rem">{{ item.badge }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="mt-auto">
            <hr class="mb-3 mx-3 border-top-1 border-none surface-border"/>
            <div class="m-3 flex align-items-center">
              <span class="font-bold">{{ userFullName }}</span>
            </div>
          </div>
        </div>
      </template>
    </Sidebar>
    <Navbar @toggle-menu="toggleSidebar"/>
    <slot></slot>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";

export default {
  components: {
    Navbar,
    Button,
    Sidebar
  },
  data() {
    return {
      sidebarVisible: false,
      navigationItems: [
        {
          label: 'Главная',
          icon: 'pi pi-home',
        },
        {
          label: 'Памятка донору',
          icon: 'pi pi-info',
        }
      ],
      profileItems: [
        {
          label: 'Настройки',
          icon: 'pi pi-cog',
        },
        {
          label: 'Выход',
          icon: 'pi pi-sign-out',
        }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    }
  },
  computed: {
    userFullName() {
      return 'Иван Петров'
    }
  }
}
</script>
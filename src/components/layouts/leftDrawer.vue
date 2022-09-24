<template>
  <q-item-label
    header
    font="bold"
    display="flex"
    place="content-between items-center"
  >
    <div v-if="userStore.isLogin">
      {{ userStore.customer.firstName + ' ' + userStore.customer.lastName }}
    </div>
    <div :position="!userStore.isLogin ? 'absolute right-0' : ''">
      <q-icon
        v-if="userStore.isLogin"
        name="mdi-logout"
        size="md"
        color="secondary"
        class="mr-6"
        @click="logout"
      />
      <q-icon
        name="mdi-close"
        size="md"
        color="negative"
        @click="emit('openClose')"
      />
    </div>
  </q-item-label>
  <q-list bordered separator>
    <SideMenuItem v-if="userStore.isLogin" :menu-item="profile" />
    <q-item
      v-for="link in userMenu"
      :key="link.label"
      v-close-popup
      :to="link.route"
      clickable
      exact
    >
      <q-item-section>
        <q-item-label>{{ link.label }}</q-item-label>
      </q-item-section>
    </q-item>
    <SideMenuItem v-if="!userStore.isLogin" :menu-item="account" />
    <SideMenuItem :menu-item="help" />
  </q-list>
</template>
<script lang="ts" setup>
import { useUserStore } from 'src/stores/user';
import SideMenuItem from './sideMenuItem.vue';
const userStore = useUserStore(),
  // eslint-disable-next-line func-call-spacing
  emit = defineEmits<{
    (e: 'openClose'): void;
  }>(),
  logout = () => {
    userStore.logout();
  },
  userMenu = [
    {
      label: 'Home',
      route: '/',
      iconColor: 'light-green-5',
      show: true,
    },
    {
      label: 'About',
      route: '/about',
      iconColor: 'green-10',
      show: true,
    },
  ],
  profile = {
    title: 'Profile',
    caption: 'Favorites, History, Cart',
    icon: 'mdi-account',
    open: false,
    links: [
      {
        name: 'Wish List',
        path: '/customer/wishlist',
      },
      {
        name: 'History',
        path: '/customer/history',
      },
      {
        name: 'Cart',
        path: '/cart',
      },
      // {
      //   name: 'Change Password',
      //   path: '/student/dashboard/change-password'
      // }
    ],
  },
  account = {
    title: 'Account',
    caption: 'Login or register with iNeeds',
    icon: 'mdi-account-outline',
    open: false,
    links: [
      {
        name: 'Log In',
        path: '/customer/',
      },
      {
        name: 'Register',
        path: '/customer/register',
      },
    ],
  },
  help = {
    title: 'Help',
    caption: 'Contact iNeeds, Faq',
    icon: 'mdi-help',
    open: false,
    links: [
      {
        name: 'Contact iNeeds',
        path: '/customer/',
      },
      {
        name: 'FAQs',
        path: '/customer/register',
      },
    ],
  };
</script>

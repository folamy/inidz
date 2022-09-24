<script lang="ts" setup>
import searchMenu from './search-menu.vue';
import { useUserStore } from 'stores/user';
import DarkToggle from '../navigation/darkMode.vue';
import CartBtn from '../navigation/CartBtn.vue';
import HeaderMenu from './headerMenu.vue';

interface Props {
  denseHeight?: boolean;
}
withDefaults(defineProps<Props>(), {
  denseHeight: false,
});

const // eslint-disable-next-line func-call-spacing
  emit = defineEmits<{
    (e: 'openClose'): void;
  }>(),
  userStore = useUserStore(),
  helpMenu = [
    {
      label: 'Contact Us',
      route: '/customer',
      iconColor: 'light-green-5',
      show: true,
    },
    {
      label: 'FAQ',
      route: '/customer/register',
      iconColor: 'green-10',
      show: true,
    },
  ],
  StLinks = [
    {
      label: 'Login',
      route: '/customer',
      iconColor: 'light-green-5',
      show: true,
    },
    {
      label: 'Register',
      route: '/customer/register',
      iconColor: 'green-10',
      show: true,
    },
  ],
  userMenu = [
    {
      label: 'History',
      route: '/customer',
      iconColor: 'light-green-5',
      show: true,
    },
    {
      label: 'Favorites',
      route: '/customer/register',
      iconColor: 'green-10',
      show: true,
    },
  ],
  studentLinks = ref(StLinks);
// store = useStore(),
// emit = defineEmits<{(e: 'rightDrawer'): void }>()
</script>
<template>
  <q-header
    elevated
    :style="{ height: `${denseHeight ? '56px' : '62px'}` }"
    m="x-auto"
    w="full"
    bg="dark:dark $ineed-bg"
  >
    <q-toolbar
      id="qheader"
      class="max-h-full z-max relative"
      h="full"
      space="x-3 lg:x-0"
      container="xl:~"
      mx-auto
      w="full"
      lg="!w-2.8/3"
      xl="!w-2.5/3"
    >
      <q-toolbar-title
        shrink
        cursor="pointer"
        h="full"
        display="flex"
        place="items-center"
      >
        <router-link to="/">
          <img src="~assets/logo1.png" w="130px" class="gt-xs" />
          <q-img src="~assets/logo2.png" w="48px" class="xs" />
        </router-link>
      </q-toolbar-title>
      <q-space />
      <search-menu
        pos="lg:(absolute left-[50%])"
        transform="lg:translate-x-[-70%] xl:translate-x-[-55%]"
        m="lg:x-0 x-3"
      />
      <dark-toggle />
      <div display="flex" place="items-center" class="hidden sm:!flex" h="full">
        <q-btn to="/" dark flat no-caps stretch exact label="Home" />
        <q-btn to="/" dark flat no-caps stretch exact label="About" />
        <header-menu
          title="Account"
          :links="userStore.isLogin ? userMenu : studentLinks"
        />
      </div>
      <CartBtn />
      <q-btn
        id="headerMenuBtn"
        dark
        flat
        fab-mini
        icon="menu"
        class="sm-hidden"
        @click="emit('openClose')"
      />
    </q-toolbar>
  </q-header>
</template>

<style lang="sass">
#qheader .q-btn
  @apply text-hex-282828 dark:(text-white)

#qheader .q-icon
  @apply text-gray-600 dark:(text-white)
</style>

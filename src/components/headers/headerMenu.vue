<script lang="ts" setup>
import { useUserStore } from 'src/stores/user';
import { darkModeState } from 'src/composables/darkMode';
import { debounce } from 'quasar';
interface MyMenu {
  label: string;
  route: string;
  show?: boolean;
}

// eslint-disable-next-line no-undef
defineProps<{
  links: Array<MyMenu>;
  title: string;
}>();

const isDark = darkModeState(),
  userStore = useUserStore(),
  // textColor = ref('#282828'),
  menu = ref(false),
  menuBtn = reactive({
    menuOver: false,
    listOver: false,
  }),
  // userMenu = [
  //   { label: 'My Favorites', route: '/' },
  //   { label: 'Cart', route: '/' },
  //   { label: 'Profile', route: '/' }
  // ] as Array<MyMenu>,
  Bouncer = (fn: { (): void; (): void; (): void; (): void }) => {
    return debounce(function () {
      fn();
    }, 10);
  },
  logout = () => {
    userStore.logout();
  };
let checkMenu = () => {
  if (menuBtn.menuOver || menuBtn.listOver) {
    menu.value = true;
  } else {
    menu.value = false;
  }
};
watch(
  () => [menuBtn.menuOver, menuBtn.listOver],
  () => {
    checkMenu();
  }
);

checkMenu = Bouncer(checkMenu);
onMounted(() => {
  // textColor.value = computed(() => isDarkMode().value ? 'red' : '#282828').value
});
</script>
<template>
  <q-btn-dropdown
    v-model="menu"
    flat
    stretch
    no-caps
    :label="title"
    content-class="!mt-.5"
    @mouseover="menuBtn.menuOver = true"
    @mouseout="menuBtn.menuOver = false"
  >
    <q-list
      @mouseover="menuBtn.listOver = true"
      @mouseout="menuBtn.listOver = false"
    >
      <q-item
        v-for="link in links"
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
      <q-item
        v-if="userStore.isLogin"
        v-ripple
        v-close-popup
        clickable
        @click="logout"
      >
        <q-item-section>
          <q-item-label text="red-600"> Log Out </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <!-- <q-list
      v-else
      @mouseover="menuBtn.listOver = true"
      @mouseout="menuBtn.listOver = false"
    >
      <q-item
        v-for="link in userMenu"
        :key="link.label"
        v-ripple
        v-close-popup
        :to="link.route"
        clickable
        exact
      >
        <q-item-section>
          <q-item-label>{{ link.label }}</q-item-label>
        </q-item-section>
      </q-item>

    </q-list> -->
  </q-btn-dropdown>
</template>

<template>
  <q-layout view="hHh Lpr fff">
    <toolbar-header @open-close="handleDrawer" />
    <q-drawer
      ref="target"
      v-if="screen.lt.md"
      id="drawer"
      v-model="drawer"
      bordered
      :breakpoint="0"
      behavior="default"
      overlay
      content-class="bg-grey-1"
      :w="screen.xs ? '80%' : '300'"
    >
      <q-scroll-area class="fit">
        <left-drawer @open-close="handleDrawer" />
      </q-scroll-area>
    </q-drawer>
    <q-footer bg="dark:dark $ineed-bg">
      <footers />
    </q-footer>
    <q-page-container
      bg="dark:dark $ineed-bg"
      container="xl:~"
      mx-auto
      w="full"
      lg="!w-2.8/3"
      xl="!w-2.5/3"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

const { screen } = useQuasar(),
  target = ref(null);
let drawer = $ref(false);
// behavior = computed(() => {
//   return screen.lt.md
//     ? 'desktop'
//     : 'default'
// }),
const handleDrawer = () => {
  drawer = !drawer;
};

onClickOutside(target, (event) => {
  // @ts-expect-error type error
  const targeted = event.target;
  const isMenuBtn = targeted.id === 'headerMenuBtn';
  const menuInnerContent =
    targeted.parentElement.parentElement.id === 'headerMenuBtn';

  console.log(targeted.parentElement.parentElement.id);
  if (drawer && !menuInnerContent && !isMenuBtn) {
    drawer = false;
  }
});
</script>

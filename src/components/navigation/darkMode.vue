<script lang="ts" setup>
import { darkModeState } from 'src/composables/darkMode';
const dark = darkModeState();

function toggleDark() {
  dark.value = !dark.value;
}
</script>

<template>
  <q-btn
    flat
    fab-mini
    class="!max-h-min"
    p="x-3 y-3"
    bg="transparent active:gray-200/60"
    @click="toggleDark()"
  >
    <div class="dark:i-carbon-moon i-carbon-sun" text="dark dark:white lg" />
  </q-btn>
</template>

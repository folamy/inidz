<template>
  <!-- <q-toggle
    v-model="dark"
    size="lg"
    dense
    :dark="dark"
    :icon="dark ? 'ion-sunny' : 'ion-moon'"
    :icon-color="dark ? 'secondary' : ''"
    :color="dark ? 'grey-2' : 'grey-10'"
    @update:model-value="toggleDark"
  /> -->
  <q-btn bg="transparent active:gray-200/60" @click="toggleDark">
    <div class="dark:i-carbon-moon i-carbon-sun" text="dark dark:white" />
  </q-btn>
</template>
<script setup lang="ts">
// import { isDarkMode } from 'src/composables/darkMode'
const hasDark = isDarkMode(),
  dark = ref(false);

function toggleDark() {
  hasDark.value = dark.value;
}
onMounted(() => {
  dark.value = hasDark.value;
});
</script>

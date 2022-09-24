<script setup lang="ts">
interface Bread {
  title: string;
  to: string;
}
defineProps<{
  breadcrumbs: Array<Bread>;
  pageTitle: string;
}>();
</script>
<template>
  <header bg="$ineed-bg dark:dark" p="x-4 y-2" m="y-2" rounded class="shadow-4">
    <crumbs :breads="breadcrumbs" />
    <div text="primary xl" font="semibold">
      {{ pageTitle }}
    </div>
  </header>
</template>

<template>
  <q-breadcrumbs>
    <template #separator>
      <q-icon size="1.2em" name="eva-arrow-forward-outline" color="secondary" />
    </template>
    <q-breadcrumbs-el
      v-for="(crumb, i) in breads"
      :key="i"
      :to="crumb.to"
      :label="crumb.title"
    />
  </q-breadcrumbs>
</template>
<script setup lang="ts">
interface Bread {
  title: string;
  to: string;
}
defineProps<{
  breads: Array<Bread>;
}>();
</script>

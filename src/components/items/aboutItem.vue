<script lang="ts" setup>
// @ts-expect-error missing type
import type { Item } from 'src/model/item';

defineProps<{
  item: Item;
}>();
const tab = ref('overview');
</script>
<template>
  <!-- eslint-disable vue/no-v-html -->
  <q-card class="shadow-1">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="overview" label="Overview" />
      <q-tab name="description" label="Description" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="overview">
        <div v-html="item.overview" />
      </q-tab-panel>

      <q-tab-panel name="description">
        <div v-html="item.description" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

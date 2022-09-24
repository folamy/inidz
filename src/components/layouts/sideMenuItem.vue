<template>
  <q-expansion-item
    expand-separator
    :content-inset-level="1.3"
    :caption-lines="2"
    :default-opened="menuItem.open"
    group="account"
    caption="Current, Previous Terms & Classes"
    :expand-icon-class="openHeader ? 'text-primary' : ''"
    :header-class="
      openHeader ? 'text-primary text-weight-bold' : 'text-weight-bold'
    "
    @show="openHeader = true"
    @hide="openHeader = false"
  >
    <template #header>
      <q-item manual-focus clickable class="accordion_header full-width">
        <q-item-section avatar>
          <q-icon size="sm" :name="menuItem.icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{ menuItem.title }}
          </q-item-label>
          <q-item-label lines="2" caption>
            {{ menuItem.caption }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <q-item
      v-for="link in menuItem.links"
      :key="link.path"
      exact
      clickable
      :to="{
        path: link.path,
      }"
    >
      <q-item-label flex items-center>
        {{ link.name }}
      </q-item-label>
    </q-item>
  </q-expansion-item>
</template>
<script setup lang="ts">
// @ts-expect-error missing types
import { sideMenu } from 'src/model/general';

defineProps<{
  menuItem: sideMenu;
}>();
const openHeader = ref(false);
</script>
<style lang="sass">
.accordion_header
  padding: 0px !important
  margin-right: 32px !important
</style>

<template>
  <div flex items-center>
    <nuxt-link
      v-for="(item, i) in crumbs"
      :key="i"
      class="text-12px text-gray-500 crumbs !min-h-[34px]"
      flex
      items-center
      relative
      cursor="pointer"
      :to="item.to"
    >
      <div m="not-last:r-2px">
        {{ item.title }}
      </div>
      <div class="text-sm icon i-mdi:arrow-right-thin" />
    </nuxt-link>
  </div>
</template>
<script lang="ts" setup>
interface Crumbs {
  title: string;
  to: string | object;
}

defineProps<{
  crumbs: Array<Crumbs>;
}>();
</script>
<style scoped>
.crumbs:last-child .icon {
  display: none !important;
  /* border: 1px solid red !important */
}
</style>

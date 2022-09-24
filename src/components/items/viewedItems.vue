<script setup lang="ts">
// @ts-expect-error missing type
import { useCartStore } from 'stores/cart';
// @ts-expect-error missing type
import type { Item } from 'src/model/item';

const route = useRoute(),
  cartStore = useCartStore(),
  viewItems = ref<Item[]>(cartStore.viewedItems);

watch(
  () => route.params,
  () => {
    nextTick();
    viewItems.value = cartStore.viewedItems.filter(
      (item) => item.slug !== route.params.slug
    );
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>
<template>
  <section
    v-if="viewItems.length"
    m="y-4"
    class="shadow-4"
    bg="white dark:dark"
    rounded-md
  >
    <div
      font="bold"
      p="x-4 y-2.5"
      text="20px"
      flex
      items-center
      class="butline"
    >
      Viewed Items
    </div>
    <div m="y-2" w="full max-full" flex overflow="auto" p="x-2 b-4">
      <div
        v-for="(item, index) in viewItems"
        :key="index"
        class="min-w-180px max-w-200px"
        not-last="mr-2"
      >
        <product-item :item="item" />
      </div>
    </div>
  </section>
</template>

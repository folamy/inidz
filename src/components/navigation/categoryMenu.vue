<template>
  <div
    v-if="show"
    display="grid"
    grid="cols-3 row-auto col-auto flow-row-dense row-end-auto"
    gap=" x-2 y-4"
    pos="absolute top-0 bottom-0"
    overflow="y-scroll"
    w="full"
    p-4
    z="20"
    bg="white dark:dark"
    opacity="95 dark:96"
    @mouseover="emit('menuHover', true)"
    @mouseleave="emit('menuHover', false)"
  >
    <div
      v-for="(sub, i) in subs"
      :key="i"
      display="block"
      space="y-1"
      class="flex-nowrap"
    >
      <div
        text="14px"
        font="semibold"
        cursor="pointer"
        border="t-0 r-0 l-0 b-1px solid gray-300 dark:gray-600"
      >
        {{ sub.name }}
      </div>
      <div display="flex" flex="col">
        <div v-for="(gp, g) in sub.group" :key="g" text="12px">
          {{ gp.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { contentStore } from 'stores/contents';
import type { SubCategory } from 'src/model/item';
const // eslint-disable-next-line func-call-spacing
  emit = defineEmits<{
    (e: 'menuHover', value: boolean): void;
  }>(),
  props = defineProps<{
    show: boolean;
    catId: number;
  }>(),
  content = contentStore(),
  subCats = computed(() => content.subCats),
  groupCats = computed(() => content.groupCats),
  subs = ref<Array<SubCategory>>([]);

watch(
  () => props.catId,
  (val) => {
    subs.value = subCats.value.filter((cat) => cat.category_id === val);
    subs.value.forEach((cat) => {
      cat.group = groupCats.value.filter((group) => group.sub_id === cat.id);
      return cat;
    });
  }
);
</script>

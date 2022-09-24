<template>
  <div
    v-for="(cat, i) in categories"
    :key="i"
    rounded="tr-3xl br-3xl"
    hover="text-md"
    cursor="pointer"
    m="l-4 r-1"
    :class="
      activeId === cat.id &&
      open &&
      'bg-paccent/40 dark:bg-pdark/10 text-secondary'
    "
    p=" y-1"
    class="truncate !max-w-full leading-4 xl:leading-5"
    text="left 16px"
    @mouseover="emit('open', cat.id)"
    @mouseleave="emit('close')"
  >
    {{ cat.name }}
  </div>
</template>
<script lang="ts" setup>
import type { Category } from '../../model/item';
defineProps<{
  open: boolean;
  activeId: number;
  categories: Category[];
}>();
const // eslint-disable-next-line func-call-spacing
  emit = defineEmits<{
    (e: 'open', id: number): void;
    (e: 'close'): void;
  }>();
// isActive = ref(false),
// categories = ref<Array<{id: number, name: string}>>([]),
// { data } = await useFetch('/api/forms/get-categories')
</script>

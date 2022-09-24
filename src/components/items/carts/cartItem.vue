<script lang="ts" setup>
// @ts-expect-error missing type
import { useCartStore } from 'src/stores/cart';
// @ts-expect-error missing type
import { slugify, toNaira } from 'src/utils/filterFn';
// @ts-expect-error missing type
import type { Item } from 'src/model/item';

defineProps<{
  item: Item;
}>();

const // eslint-disable-next-line func-call-spacing
  emit = defineEmits<{
    (e: 'adding', value: boolean): void;
  }>(),
  cartStore = useCartStore(),
  adding = ref(false),
  getAdding = (val: boolean) => {
    adding.value = val;
    emit('adding', adding.value);
  };
</script>
<template>
  <div
    relative
    flex
    flex-row
    class="not-last:butline"
    p="not-last:y-2"
    space="x-2"
  >
    <div
      w="min-1/4"
      cursor="pointer"
      @click="$router.push(`/${slugify(item.slug)}`)"
    >
      <img
        :src="`/items/products/${item.images[0]}`"
        :alt="item.name"
        w="86px md:90px"
        h="100% md:104px"
        border="rounded"
      />
    </div>
    <div flex-1 md="flex flex-row " p="x-1 y-0.5" justify="between">
      <div w="full md:2.5/4" space="y-0.5">
        <strong class="line-clamp-1">{{ item.name }}</strong>
        <small flex space="x-2">
          <strong>Price:</strong>
          <div>{{ toNaira(item.price) }}</div>
        </small>
        <item-quantity :item="item" @adding="getAdding" />
      </div>
      <div flex flex-col p="x-1" place="content-between">
        <div flex flex-row space="x-2">
          <div w="auto">
            {{ `${item.qty} x` }}
          </div>
          <div>{{ toNaira(item.price * item.qty) }}</div>
        </div>
        <div
          flex
          flex-row
          items-center
          justify="between"
          place="self-stretch"
          class="<md:butline"
        >
          <q-btn icon="favorite" fab-mini unelevated flat text-color="red" />
          <q-btn
            icon="mdi-delete"
            fab-mini
            unelevated
            flat
            hover="!text-red-700"
            text-color="secondary"
            @click="cartStore.deleteItem(item.product_id)"
          />
        </div>
      </div>
    </div>
    <div
      hidden
      :class="{ '!flex': adding }"
      justify-center
      items-center
      absolute
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="paccent-200/50 dark:dark-900/50"
      border="rounded"
      space="x-2"
    />
  </div>
</template>

<script lang="ts" setup>
// @ts-expect-error missing type
import type { Item } from 'src/model/item';
// @ts-expect-error missing type
import { useCartStore } from 'src/stores/cart';

interface Props {
  item: Item;
  showLabel?: false;
}
const cartStore = useCartStore(),
  // props = defineProps<{
  //   item: Item
  // }>(),
  props = withDefaults(defineProps<Props>(), {
    showLabel: false,
  }),
  delay = ref(800),
  itemQty = computed(() => cartStore.itemQty(props.item.product_id)),
  adding = ref(false),
  // eslint-disable-next-line func-call-spacing
  emit = defineEmits<{
    (e: 'adding', value: boolean): void;
  }>();
function increase() {
  adding.value = true;
  emitAdding();
  setTimeout(() => {
    cartStore.increaseQty(props.item.product_id);
    adding.value = false;
    emitAdding();
  }, delay.value);
}
function decrease() {
  adding.value = true;
  emitAdding();
  setTimeout(() => {
    cartStore.decreaseQty(props.item.product_id);
    adding.value = false;
    emitAdding();
  }, delay.value);
}
function emitAdding() {
  emit('adding', adding.value);
}
</script>
<template>
  <div display="flex" place="items-center">
    <div v-if="showLabel" font="semibold" m="r-2">Quantity:</div>
    <div display="flex" place="items-center content-center" space="x-1.5">
      <q-btn
        dense
        :disabled="itemQty < 2"
        text-color="white"
        bg="secondary/45"
        @click="decrease"
      >
        <q-icon size="xs" name="remove" />
      </q-btn>

      <q-spinner v-if="adding" color="primary" size="1.5em" :thickness="2" />
      <div v-else p="0.2">
        {{ itemQty }}
      </div>
      <q-btn dense text-color="white" bg="secondary/45" @click="increase">
        <q-icon size="xs" name="add" />
      </q-btn>
    </div>
  </div>
</template>

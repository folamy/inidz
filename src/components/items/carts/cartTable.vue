<script lang="ts" setup>
// @ts-expect-error missing type
import { useCartStore } from 'src/stores/cart';
// @ts-expect-error missing type
import { slugify, toNaira } from 'src/utils/filterFn';
// @ts-expect-error missing type
// import type { Item } from 'src/model/item'

// defineProps<{
//   item: Item
// }>()

const // eslint-disable-next-line func-call-spacing
  emit = defineEmits<{
    (e: 'adding', value: boolean): void;
  }>(),
  cartStore = useCartStore(),
  getAdding = (val: boolean) => {
    emit('adding', val);
  },
  columns = [
    {
      name: 'image',
      required: true,
      label: 'Image',
      align: 'left',
      // field: row => row.name,
      // format: val => `${val}`,
      // sortable: true
    },
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row) => row.name,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: 'price',
      align: 'center',
      label: 'Price',
      field: (row) => row.price,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: 'qty',
      align: 'center',
      label: 'Qty',
      field: (row) => row.qty,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: 'action',
      align: 'center',
      label: 'Actions',
    },
  ];
// delay = ref(600),
// processingID = ref('')

// function increase (productId: string) {
//   adding.value = true
//   processingID.value = productId
//   emit('adding', adding.value)
//   setTimeout(() => {
//     cartStore.increaseQty(productId)
//     adding.value = false
//     processingID.value = ''
//     emit('adding', adding.value)
//   }, delay.value)
// }
// function decrease (productId: string) {
//   adding.value = true
//   processingID.value = productId
//   emit('adding', adding.value)
//   setTimeout(() => {
//     cartStore.decreaseQty(productId)
//     adding.value = false
//     processingID.value = ''
//     emit('adding', adding.value)
//   }, delay.value)
// }
</script>
<template>
  <q-table flat :rows="cartStore.cartItems" :columns="columns" row-key="name">
    <template #header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          <span text="16px" font="semibold">
            {{ col.label }}
          </span>
        </q-th>
      </q-tr>
    </template>
    <template #body="props">
      <q-tr :props="props" cursor="!pointer">
        <q-td
          key="image"
          :props="props"
          auto-width
          cursor="pointer"
          @click="$router.push(`/products/${slugify(props.row.slug)}`)"
        >
          <q-img scale-down :src="`/items/products/${props.row.images[0]}`" />
        </q-td>
        <q-td key="name" :props="props" auto-width>
          <div
            cursor="pointer"
            @click="$router.push(`/products/${slugify(props.row.slug)}`)"
          >
            {{ props.row.name }}
          </div>
        </q-td>
        <q-td key="price" :props="props" auto-width class="text-center">
          <div>
            {{ toNaira(props.row.price * props.row.qty) }}
          </div>
        </q-td>
        <q-td key="price" :props="props" auto-width>
          <item-qty
            :item="props.row"
            transform="translate-x-[15%]"
            @adding="getAdding"
          />
        </q-td>
        <q-td key="action" :props="props" auto-width space="x-2">
          <favorite-item :item="props.row" />
          <q-btn
            fab-mini
            icon="delete"
            flat
            dense
            text="hover:!red"
            @click="cartStore.deleteItem(props.row.product_id)"
          >
            <q-tooltip> Delete this Item from Cart </q-tooltip>
          </q-btn>
        </q-td>
      </q-tr>
    </template>
    <template #top>
      <div hidden />
    </template>
  </q-table>
</template>

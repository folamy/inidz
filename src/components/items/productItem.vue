<script setup lang="ts">
import { slugify, toNaira } from 'src/utils/filterFn';
import { Item } from 'src/model/item';
import { useCartStore } from 'stores/cart';

interface Props {
  item: Item;
  displayFlex?: boolean;
}
const { platform } = useQuasar(),
  router = useRouter(),
  props = withDefaults(defineProps<Props>(), {
    displayFlex: false,
  }),
  cartStore = useCartStore(),
  isHover = ref(false);

function addToCart(event: Event) {
  event.stopPropagation();
  cartStore.addItemToCart(props.item);
}

function viewItem() {
  router.push(`/${slugify(props.item.slug)}`);
}
</script>
<template>
  <q-card
    display="relative"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    @click="viewItem"
  >
    <div
      hidden
      :class="{ '!flex': isHover && !platform.has.touch }"
      justify-center
      items-center
      absolute
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="gray-100/50 dark:dark-100/50"
      border="rounded"
      space="x-2"
      @mouseleave="isHover = false"
    >
      <q-btn bg="paccent" text="primary" p="x-1.5" @click="viewItem">
        <div
          display="flex"
          flex="row"
          place="items-center !content-between"
          space="x-1"
        >
          <q-icon name="mdi-eye" />
          <div>View</div>
        </div>
      </q-btn>
      <q-btn bg="green-500" text="white" p="x-1.5" @click="addToCart($event)">
        <div
          display="flex"
          flex="row"
          place="items-center !content-between"
          space="x-1"
        >
          <q-icon name="mdi-cart-plus" />
          <div>Buy</div>
        </div>
      </q-btn>
    </div>
    <div flex justify="center" flex-1 m="b-3" w="full">
      <img
        :src="`/items/products/${item.images[0]}`"
        :alt="item.name"
        :h="displayFlex ? '100px' : '100px'"
        m="sm:0"
        border="rounded"
        w
      />
    </div>

    <q-card-section>
      <div text="15px" class="min-h-30px line-clamp-2">
        {{ item.name }}
      </div>
      <div font="semibold" mt-1>
        <div>
          {{ toNaira(item.price) }}
          <span text="xs gray-400" line-through font="normal" m="x-0.5xp"
            >&#8358; {{ item.price }}</span
          >
        </div>
        <div text="xs green-700">You save &#8358; {{ item.price }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<template>
  <q-spinner v-if="adding" color="primary" size="sm" :thickness="2" />
  <q-icon
    v-else
    :name="!inFavs ? 'favorite_border' : 'favorite'"
    color="red"
    size="md"
    cursor="pointer"
    @click="makeFavorite"
  >
    <q-tooltip v-if="!platform.has.touch || !platform.is.mobile">
      {{ inFavs ? 'Remove this Item from' : 'Add this Item  to' }} favorite list
    </q-tooltip>
  </q-icon>
</template>
<script setup lang="ts">
// @ts-expect-error missing type
import { useUserStore } from 'src/stores/user';
// @ts-expect-error missing type
import type { Item } from 'src/model/item';

const props = defineProps<{
    item: Item;
  }>(),
  { platform } = useQuasar(),
  userStore = useUserStore(),
  adding = ref(false),
  inFavs = ref(false);

async function makeFavorite() {
  adding.value = true;
  await userStore.replaceFavs(props.item.product_id);
  inFavs.value = await userStore.inFav(props.item.product_id);
  adding.value = false;
}
onMounted(async () => {
  !userStore.favorites.length && (await userStore.getUserFavs());
  inFavs.value = await userStore.inFav(props.item.product_id);
});
</script>

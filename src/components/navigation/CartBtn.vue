<script lang="ts" setup>
import { useCartStore } from '../../stores/cart';

const cartStore = useCartStore(),
  { screen } = useQuasar();
// implement persistence
</script>
<template>
  <q-btn
    flat
    :fab-mini="screen.lt.md"
    rounded
    no-caps
    bg="transparent md:primary"
    class="!text-white"
    to="/cart"
  >
    <div display="flex" space="md:x-1.5">
      <span v-if="screen.md || screen.gt.md">Cart</span>
      <q-icon class="md:!text-white" name="mdi-cart" />
    </div>
    <q-badge color="positive" floating class="">
      {{ cartStore.cartLength }}
    </q-badge>
  </q-btn>
</template>

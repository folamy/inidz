<template>
  <q-rating
    v-model="rating"
    max="7"
    size="1.5em"
    color="primary"
    icon="star_border"
    icon-selected="star"
    icon-half="star_half"
  />
</template>
<script setup lang="ts">
const rating = ref(3.5);
</script>

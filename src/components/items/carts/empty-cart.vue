<template>
  <div
    flex
    flex-col
    justify="center"
    place="items-center content-center"
    class="full-height"
  >
    <q-icon name="mdi-cart-off" text="secondary 9xl" />
    <div text="center 3xl gray-600 dark:saccent" font="semibold">
      Your cart is empty!
    </div>

    <div m="t-18">
      <q-icon
        class="animate-bounce-alt animate-count-infinite animate-delay-1000"
        color="positive"
        size="xl"
        name="mdi-hand-pointing-down"
      />
    </div>
    <q-btn
      class="q-mt-xl"
      color="white"
      text-color="accent"
      unelevated
      to="/"
      label="Click here to Shop More"
      no-caps
    />
    <!-- <router-link
      class="my-4"
      to="/"
    >
      Click here to Shop More
    </router-link> -->
  </div>
</template>

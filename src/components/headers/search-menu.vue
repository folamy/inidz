<template>
  <div>
    <div class="inline-flex" @click="modalOpen">
      <input
        type="text"
        p="x-2 y-1.2"
        placeholder="Search items, categories, and brands"
        bg="gray-200 dark:gray-300"
        class="hidden lg:!block min-w-200px xl:w-300px dark:caret-pdark"
        border="0 rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none"
        outline="none"
        :autofocus="false"
      />
      <button
        class="border-none py-2 px-4 !outline-none dark:text-white"
        bg="transparent lg:primary active:gray-200/60 lg:active:primary/40"
        cursor="pointer"
        lg="dark:bg-#62412e dark:active:bg-#412"
        p="x-2 y-2 lg:x-3"
        text="ineed-text lg:white"
        font="!bold"
        border="rounded-full lg:(rounded-tl-none rounded-bl-none) "
      >
        <q-icon text="2xl" name="search" class="lg:!text-white" />
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CustomComponent from './seachComponent.vue';

const { dialog } = useQuasar(),
  search = ref<HTMLInputElement | null>();
function modalOpen() {
  dialog({
    component: CustomComponent,
    class: 'qqD',
  }).onDismiss(() => {
    search.value?.blur();
  });
}
</script>

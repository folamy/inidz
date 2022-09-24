<template>
  <!-- notice dialogRef here -->
  <q-dialog
    ref="dialogRef"
    :full-height="screen.lt.md"
    :full-width="screen.lt.md"
    :position="screen.md || screen.gt.md ? 'top' : 'standard'"
    @hide="hideModal"
  >
    <q-card
      class="q-pa-none"
      display="flex"
      flex="col"
      w="full md:600px"
      :pos="(screen.md || screen.gt.md) && 'top-20'"
    >
      <q-card-section p="none" flex="grow grow-1">
        <div h="full">
          <div
            display="flex"
            place="content-between items-center"
            space="x-3"
            p="4"
          >
            <div
              display="flex"
              pos="relative"
              flex="grow"
              place="items-center"
              space="x-2"
              p="1.2 x-3"
              border="rounded-md"
              bg="gray-300 dark:gray-800"
            >
              <q-icon name="search" text="saccent 2xl" font="bold" />
              <input
                ref="inputRef"
                type="text"
                placeholder="Search items, categories, and brands"
                h="40px"
                w="full"
                outline="none"
                border="none"
                bg="transparent"
                :autofocus="true"
              />
            </div>
            <q-btn
              no-caps
              label="Cancel"
              unelevated
              class="!text-saccent"
              flat
              @click="onDialogCancel"
            />
          </div>
          <div
            v-if="!recent.length"
            w="full"
            h="100px"
            display="flex"
            place="content-center items-center"
          >
            <div text="sm gray-500">No recent searches</div>
          </div>
        </div>
        <!-- <div
          w="full"
          border="t-1px b-0 r-0 l-0 gray-200 dark:gray-800"
          text="right"
          p="t-0.6"
        >
          <div
            text="sm gray-500"
            m="2 y-1"
          >
            Search by <strong>
              <em>Folweb-IT</em>
            </strong>
          </div>
        </div> -->
      </q-card-section>
      <q-card-actions
        align="right"
        border="t-1px b-0 r-0 l-0 gray-200 dark:gray-800"
      >
        <div text="sm gray-500" m="2 y-1">
          Search by
          <strong>
            <em>Folweb-IT</em>
          </strong>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar';
defineEmits([...useDialogPluginComponent.emits]);
const inputRef = ref<HTMLInputElement | null>(),
  recent = ref([]),
  { screen } = useQuasar(),
  { dialogRef, onDialogHide, /* onDialogOK, */ onDialogCancel } =
    useDialogPluginComponent(),
  hideModal = () => {
    onDialogHide();
  };
</script>
<style lang="css">
.autoHeight {
  flex: 0 0 0 !important;
}
</style>

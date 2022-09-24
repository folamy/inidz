<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar';

defineEmits([...useDialogPluginComponent.emits]);
const props = defineProps<{
    openForm: boolean;
  }>(),
  openAddForm = ref(false),
  { screen } = useQuasar(),
  { dialogRef, onDialogHide, /* onDialogOK, */ onDialogCancel } =
    useDialogPluginComponent(),
  hideModal = () => {
    onDialogHide();
  },
  cancelDialog = () => {
    onDialogCancel();
  };
function handleAddAddress(val: boolean) {
  openAddForm.value = val;
}

watch(
  () => props.openForm,
  (val: boolean) => {
    openAddForm.value = val;
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <q-dialog
    ref="dialogRef"
    no-backdrop-dismiss
    :position="screen.md || screen.gt.md ? 'right' : 'standard'"
    @hide="hideModal"
  >
    <q-card w="full md:!600px">
      <q-card-section
        display="flex"
        place="items-center content-between"
        class="butline"
      >
        <div font="semibold" text="3xl" p="b-1">
          {{ !openAddForm ? 'Choose Address' : 'Address Form' }}
          <div v-if="openAddForm" text="xs gray-500" font="normal">
            Fill this form to add a Delivery Address
          </div>
          <div v-else text="xs gray-00" font="normal">
            Choose one address for Delivery
          </div>
        </div>
        <q-btn
          fab-mini
          icon="close"
          text-color="negative"
          unelevated
          @click="cancelDialog"
        />
      </q-card-section>
      <q-card-section>
        <address-form
          v-if="openAddForm"
          @add-form="handleAddAddress"
          @close-panel="cancelDialog"
        />
        <addresses
          v-else
          @add-form="handleAddAddress"
          @close-panel="cancelDialog"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

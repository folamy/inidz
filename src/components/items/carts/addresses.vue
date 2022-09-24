<script lang="ts" setup>
// @ts-expect-error missing type
import { useUserStore } from 'src/stores/user';
// import type { Address } from 'src/model/user'
import { storeToRefs } from 'pinia';

const userStore = useUserStore(),
  { addresses, selectedId } = storeToRefs(userStore),
  // selectedId = ref(''),
  // eslint-disable-next-line func-call-spacing
  emit = defineEmits<{
    (e: 'addForm', val: boolean): void;
    (e: 'closePanel'): void;
  }>();

function selected(id: string) {
  // selectedId.value = id
  userStore.setAddressId(id);
  // emit('selected', selectedAddress.value)
}

watch(
  () => addresses,
  (val) => {
    if (val.length === 0) emit('addForm', true);
  },
  {
    deep: true,
  }
);
</script>
<template>
  <q-card flat w="full">
    <div flex items-center justify-between m="y-4">
      <div px-2>You can add another address here!</div>
      <q-btn
        bg="primary dark:pdark"
        text="white"
        font="semibold"
        label="Add Address"
        @click="emit('addForm', true)"
      />
    </div>
    <q-card-section flex flex-col>
      <div flex flex-col space="y-2">
        <div
          v-for="(address, i) in addresses"
          :key="i"
          :bg="
            selectedId === address.uid
              ? 'paccent/60'
              : 'gray-100/25 dark:dark-800'
          "
          rounded
          class="card"
          border="rounded 1px gray-200 dark:gray-800"
          space="y-4"
          w="full"
          cursor="pointer"
          @click="selected(address.uid)"
        >
          <div
            p="x-1 md:x-4 y-2"
            text
            flex
            items-center
            justify="between"
            space="x-2"
            w="full"
            butline
          >
            <div text="gray-500 dark:gray-300" font="semibold">
              {{ `${address.firstName} ${address.lastName}` }}
            </div>
            <div flex space="x-2">
              <div
                v-if="selectedId !== address.uid"
                class="i-mdi:radiobox-marked"
                text="gray-400"
              />
              <div
                v-else
                class="i-mdi:checkbox-marked-circle"
                text="positive"
              />
              <div
                class="i-mdi-delete"
                text="gray-400 dark:negative hover:negative"
                @click="userStore.deleteAddress(address.uid)"
              />
            </div>
          </div>
          <div p="4">
            <div flex items-center space="x-4">
              <div class="i-bx-bxs-user" />
              <div>{{ `${address.firstName} ${address.lastName}` }}</div>
            </div>
            <div flex items-center space="x-4">
              <div class="i-ion-location" />
              <div>
                {{ `${address.street} ${address.city} ${address.state}` }}
              </div>
            </div>
            <div flex items-center space="x-4">
              <div class="i-ion-call" />
              <div>{{ `${address.phoneNumber}` }}</div>
            </div>
          </div>
        </div>
      </div>
      <q-card-actions>
        <q-btn
          font="semibold"
          text="white xl"
          w="full"
          bg="positive"
          label="Close"
          @click="emit('closePanel')"
        />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

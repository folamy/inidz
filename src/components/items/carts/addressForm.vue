<template>
  <q-form ref="addForm" @submit="addAddress">
    <q-card flat w="full">
      <q-card-section>
        <div class="col-12">
          <div class="row q-col-gutter-x-sm q-col-gutter-y-sm">
            <div class="col-12 col-sm-6 col-md-12">
              <q-input
                v-model="address.firstName"
                filled
                dense
                label="First Name"
                :rules="[rules.required]"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-12">
              <q-input
                v-model="address.lastName"
                filled
                dense
                label="Last Name"
                :rules="[rules.required]"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-12">
              <q-input
                v-model="address.phoneNumber"
                filled
                dense
                label="Phone Number"
                type="tel"
                :rules="[rules.required, rules.phone]"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-12">
              <q-input
                v-model="address.email"
                filled
                dense
                label="Email"
                type="email"
                :rules="[rules.required, rules.email]"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="address.street"
                filled
                dense
                autogrow
                label="Street Address"
                type="textarea"
                :rules="[rules.required]"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="address.direction"
                filled
                dense
                label="Directions (Optiona)"
                type="textarea"
                autogrow
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="address.city"
                filled
                dense
                label="City"
                :rules="[rules.required]"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-select
                v-model="state.stateObj"
                filled
                dense
                :clearable="address.state > 0"
                use-input
                options-dense
                input-debounce="0"
                label="Select State *"
                :options="state.stateOptions"
                option-label="name"
                behavior="menu"
                map-options
                emit-value
                return-object
                :rules="[rules.required]"
                :hint="
                  state.stateHint
                    ? `Start typing the first three(3) letters of your state`
                    : 'Your state of origin'
                "
                @filter="getState"
                @focus="state.stateHint = true"
                @blur="state.stateHint = false"
                @update:model-value="getLGA"
              >
                <template #no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-12 col-sm-6">
              <q-select
                v-model="address.lga"
                filled
                dense
                use-input
                options-dense
                input-debounce="0"
                label="Select Local Government *"
                :options="state.lgaOptions"
                option-value="name"
                option-label="name"
                map-options
                emit-value
                behavior="menu"
                :rules="[rules.required]"
                hint="Appropriate local government from your state"
              >
                <template #no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
        </div>
        <q-card-actions
          p="8"
          align="center"
          border="t-1px b-0 r-0 l-0 gray-200 dark:gray-800"
        >
          <q-btn
            label="Close"
            no-caps
            bg="negative/85"
            text="white"
            @click="emit('close-panel')"
          />
          <q-btn
            v-if="addresses.length"
            label="Choose Address"
            no-caps
            bg="secondary/85"
            text="white"
            @click="emit('addForm', false)"
          />
          <q-btn
            type="submit"
            label="Add Address"
            no-caps
            bg="positive/85"
            text="white"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-form>
</template>
<script lang="ts" setup>
import { api } from '../../../boot/axios';
// @ts-expect-error missing type
import type { Address } from 'src/model/user';
// @ts-expect-error missing type
import { useUserStore } from 'src/stores/user';

const addForm = ref(null),
  address = reactive({}) as Address,
  state = reactive({
    ngState: [],
    stateObj: null,
    stateOptions: [],
    lgaOptions: [],
    stateHint: false,
  }),
  { addresses, addToAddress } = useUserStore(),
  rules = {
    dob: (val: string) =>
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(
        val
      ) || 'Date format must be in DD/MM/YYYY',
    required: (val: string) => !!val || 'Please type something',
    phone: (v: string) => /^[0]\d{10}$/.test(v) || 'invalid phone format',

    email: (v: string) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) ||
      'E-mail must be valid',
  },
  // eslint-disable-next-line func-call-spacing
  emit = defineEmits<{
    (e: 'addForm', val: boolean): void;
    (e: 'close-panel'): void;
  }>();

async function getState(val, update) {
  if (val.length > 2) {
    if (!state.ngState.length) {
      state.ngState = await (await api({ url: '/get-states' })).data;
    }
    await update(() => {
      const needle = val.toLowerCase();
      state.stateOptions = state.ngState.filter(
        (v) =>
          (v.name || '')
            .toLowerCase()
            .includes((needle || '').toLowerCase()) !== false
      );
    });
  }
}
async function getLGA() {
  state.lgaOptions = [];
  address.lga = '';
  // if (address.stateOfOrigin < 1) { return }
  const id = state.stateObj.id;
  state.lgaOptions = await (await api({ url: `/get-lga/?stateid=${id}` })).data;
}

function addAddress() {
  addForm.value.validate().then(async (success) => {
    if (success) {
      address.state = state.stateObj.name;
      await addToAddress(address);
      emit('addForm', false);
      // console.log(address)
    } else {
      // oh no, user has filled in
      // at least one invalid value
    }
  });
}
</script>
<style lang="css">
.autoHeight {
  flex: 0 0 0 !important;
}
</style>

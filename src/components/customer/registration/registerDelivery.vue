<script lang="ts" setup>
import { api } from '../../../boot/axios';
// @ts-expect-error missing type
import type { User } from 'src/model/user';

defineProps<{
  loading: boolean;
  errorMsg: string;
}>();
const // eslint-disable-next-line func-call-spacing
  emit = defineEmits<{
    (e: 'nextStep', value: User): void;
    (e: 'prevStep'): void;
  }>(),
  { screen } = useQuasar(),
  formRef = ref(null),
  customer = reactive({}) as User,
  confirmPass = ref(''),
  state = reactive({
    ngState: [],
    stateObj: null,
    stateOptions: [],
    lgaOptions: [],
    stateHint: false,
  }),
  rules = {
    required: (val: string) => !!val || 'This field is required *',
    phone: (v: string) => /^[0]\d{10}$/.test(v) || 'invalid phone format',
    email: (v: string) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) ||
      'E-mail must be valid',
    pass: (v: string) => {
      if (confirmPass.value) {
        return v === confirmPass.value || 'Password do not match';
      }
      return true;
    },
    passConfirm: (v: string) => {
      if (customer.password) {
        return v === customer.password || 'Password do not match';
      }
      return true;
    },
    passLength: (v: string) =>
      /^.{8,12}$/.test(v) ||
      'Password should be minimum of 8 , and maximum of 12 characters!',
  };
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
  customer.lga = '';
  // if (customer.stateOfOrigin < 1) { return }
  const id = state.stateObj.id;
  state.lgaOptions = await (await api({ url: `/get-lga/?stateid=${id}` })).data;
}
function onSubmit() {
  formRef.value.validate().then((success) => {
    if (success) {
      customer.state = state.stateObj.name;
      emit('nextStep', customer);
    }
  });
}
function onReset() {
  formRef.value.resetValidation();
}
function previous() {
  emit('prevStep');
}
</script>
<template>
  <q-form ref="formRef" class="q-gutter-md">
    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-sm" m="b-4">
          <div class="col-12 col-sm-6">
            <q-input
              v-model="customer.street"
              :outlined="screen.sm || screen.gt.sm"
              :filled="screen.lt.sm"
              dense
              label="Street Address"
              :rules="[rules.required]"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="customer.direction"
              :outlined="screen.sm || screen.gt.sm"
              :filled="screen.lt.sm"
              dense
              label="Directions"
              autogrow
            />
          </div>
          <div class="col-12 col-sm-4">
            <q-input
              v-model="customer.city"
              :outlined="screen.sm || screen.gt.sm"
              :filled="screen.lt.sm"
              dense
              label="Current City"
              :rules="[rules.required]"
            />
          </div>
          <div class="col-12 col-sm-4">
            <q-select
              v-model="state.stateObj"
              filled
              dense
              :clearable="customer.state > 0"
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
                  : 'What state are you at'
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
          <div class="col-12 col-sm-4">
            <q-select
              v-model="customer.lga"
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
          <div
            v-if="errorMsg"
            w="max"
            display="flex"
            text="center red lg"
            font="semibold"
            m="t-8 x-auto"
            v-html="errorMsg"
          />
          <div w="max" display="flex" m="t-8 x-auto" space="x-4">
            <q-btn label="Reset" color="grey" no-caps @click="onReset" />
            <q-btn label="Back" color="warning" no-caps @click="previous" />
            <q-btn
              color="positive"
              label="Register"
              :loading="loading"
              no-caps
              @click="onSubmit"
            />
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>

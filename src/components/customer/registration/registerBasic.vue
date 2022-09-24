<script lang="ts" setup>
// @ts-expect-error missing type
import type { User } from 'src/model/user';

const // eslint-disable-next-line func-call-spacing
  emit = defineEmits<{
    (e: 'nextStep', value: User): void;
  }>(),
  // props = defineProps<{
  //   customer: User
  // }>(),
  { screen } = useQuasar(),
  formRef = ref(null),
  customer = reactive({}) as User,
  confirmPass = ref(''),
  isPwd = ref(true),
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

function onSubmit() {
  formRef.value.validate().then((success) => {
    if (success) {
      console.log(success);
      emit('nextStep', customer);
    }
  });
}
function onReset() {
  formRef.value.resetValidation();
}
</script>
<template>
  <q-form ref="formRef" class="q-gutter-md">
    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-sm" m="b-4">
          <div class="col-12 col-sm-6">
            <q-input
              v-model="customer.firstname"
              :outlined="screen.sm || screen.gt.sm"
              :filled="screen.lt.sm"
              dense
              label="First Name"
              :rules="[rules.required]"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="customer.lastName"
              :outlined="screen.sm || screen.gt.sm"
              :filled="screen.lt.sm"
              dense
              label="Last Name"
              :rules="[rules.required]"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="customer.phoneNumber"
              :outlined="screen.sm || screen.gt.sm"
              :filled="screen.lt.sm"
              dense
              label="Phone Number"
              :rules="[rules.required, rules.phone]"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="customer.email"
              :outlined="screen.sm || screen.gt.sm"
              :filled="screen.lt.sm"
              dense
              label="Email Address"
              :rules="[rules.required, rules.email]"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="customer.password"
              :outlined="screen.sm || screen.gt.sm"
              :filled="screen.lt.sm"
              :type="isPwd ? 'password' : 'text'"
              dense
              label="Password"
              :rules="[rules.required, rules.pass, rules.passLength]"
            >
              <template #append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  cursor="pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="confirmPass"
              :outlined="screen.sm || screen.gt.sm"
              :filled="screen.lt.sm"
              :type="isPwd ? 'password' : 'text'"
              dense
              label="Confirm Password"
              :rules="[rules.required, rules.passConfirm, rules.passLength]"
            >
              <template #append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  cursor="pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>

          <div w="max" display="flex" m="t-8 x-auto" space="x-4">
            <q-btn label="Reset" color="grey" no-caps @click="onReset" />
            <q-btn
              color="positive"
              label="Continue"
              no-caps
              @click="onSubmit"
            />
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>
<style scoped>
b {
  border: 1px;
}
</style>

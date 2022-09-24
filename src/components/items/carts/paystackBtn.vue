<template>
  <template v-if="userStore.addresses.length > 0">
    <q-no-ssr>
      <PayStack
        v-if="selectedAddress"
        :amount="(getDeliveryChargeTotal + cartTotal) * 100"
        :firstname="selectedAddress.firstName"
        :lastname="selectedAddress.lastName"
        :email="selectedAddress.email"
        :public-key="publicKey"
        :reference="paymentRef"
        :on-success="afterPayment"
        :on-cancel="closeFn"
        :metadata="metaData(cartItems, additionalInfo)"
        button-text="Pay Online"
        button-class="q-btn"
        shadow="lg"
        text="white"
        w="full"
        font="semibold"
        :disabled="adding"
        cursor="pointer disabled:not-allowed"
        bg="positive active:positive/40 disabled:secondary/45 dark:active:paccent/40 !disabled:active:gray-200"
      />
    </q-no-ssr>
  </template>
  <template v-else>
    <em font="semibold" text="gray-600"
      >You have to add one or more delivery Addresses</em
    >
  </template>
</template>
<script lang="ts" setup>
import PayStack from 'vue3-paystack';
import { storeToRefs } from 'pinia';
// @ts-expect-error missing type
import { metaData, reference } from 'src/utils/filterFn';
// @ts-expect-error missing type
import { useCartStore } from 'src/stores/cart';
// @ts-expect-error missing type
import { useUserStore } from 'src/stores/user';
import { api } from '../../../boot/axios';
import { QSpinnerGears } from 'quasar';
const cartStore = useCartStore(),
  userStore = useUserStore(),
  { selectedAddress } = storeToRefs(userStore),
  { getDeliveryChargeTotal, cartItems, cartTotal } = storeToRefs(cartStore),
  publicKey = 'pk_test_1bc526343bc264f35e3899a95637c909cecdb7fd';

defineProps<{
  adding: boolean;
  additionalInfo: string;
}>();
const { dialog } = useQuasar(),
  paymentRef = reference(),
  dialogIsOpen = ref(false),
  afterPayment = async (ctx: { reference: string; transaction: string }) => {
    // console.log(ctx)
    dialogIsOpen.value = true;
    const now = new Date();
    now.setSeconds(0, 0);
    const data = {
      buyer: `${selectedAddress.value.firstName} ${selectedAddress.value.lastName}`,
      items: cartItems.value
        .map((item: { product_id: string; qty: number }) => {
          return `${item.product_id} X ${item.qty}`;
        })
        .toString(),
      email: selectedAddress.value.email,
      phoneNumber: selectedAddress.value.phoneNumber,
      reference: ctx.reference,
      transaction_id: ctx.transaction,
      amount: getDeliveryChargeTotal.value + cartTotal.value,
      date: now
        .toISOString()
        .replace('T', ' ')
        .replace(/:00.000Z/, ''),
    };
    console.log(data);
    await api({
      url: '/add-order',
      method: 'post',
      data: {
        order: data,
      },
    }).finally(() => {
      dialogIsOpen.value = false;
    });
  },
  closeFn = () => {
    cartStore.clearCart();
    console.log('closed');
  },
  openDialog = () => {
    const open = dialog({
      title: '<div text="center" font="bold">Documenting your Order</div>',
      message:
        '<div text="warning">Payment done! We are placing your order</div>',
      html: true,
      persistent: true,
      progress: {
        spinner: QSpinnerGears,
        color: 'warning',
      },
      ok: false,
    });

    let percentage = 0;
    const interval = setInterval(() => {
      percentage = Math.min(100, percentage + Math.floor(Math.random() * 22));

      open.update({
        message: `Working... ${percentage}`,
      });
      if (dialogIsOpen.value && percentage === 100) {
        percentage = 0;
      }
      if (!dialogIsOpen.value) {
        clearInterval(interval);
        open.update({
          title: '<div text="positive" font="bold">Done!</div>',
          message: `<div>
            <div>We have recieved your order and it's being processed!</div>
            <div text="xs"><srong text="!lg">Note: </strong>Your order will be delivered within 3-5 working days. </div>
          </div>`,
          progress: false,
          ok: true,
        });
      }
    }, 500);
  };
watch(dialogIsOpen, (val) => {
  if (val) {
    openDialog();
  }
});
</script>

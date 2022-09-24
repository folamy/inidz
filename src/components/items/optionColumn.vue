<script setup lang="ts">
const { screen } = useQuasar(),
  lastCol = ref<HTMLElement | null>(null);
// props = defineProps<{
//   mainDiv: Element
// }>()
function fixMe() {
  if (screen.lt.lg) {
    return;
  }
  const fixmeTop = lastCol.value.offsetTop,
    fixmeWidth = lastCol.value.clientWidth,
    mainDiv = document.getElementById('mainDiv'),
    positionRight = (window.innerWidth - mainDiv.clientWidth) / 2,
    currentScroll = window.pageYOffset,
    mainHeader = document.getElementById('qheader'),
    headerHeight = mainHeader.clientHeight;
  if (currentScroll >= fixmeTop) {
    lastCol.value.style.position = 'fixed';
    lastCol.value.style.top = `${headerHeight + 4}px`;
    lastCol.value.style.width = `${fixmeWidth}px`;
    lastCol.value.style.right = `calc(${positionRight}px - 0.5rem)`;
    lastCol.value.style.zIndex = `1`;
  } else {
    lastCol.value.style.position = 'static';
    lastCol.value.style.top = 'auto';
    lastCol.value.style.zIndex = 'auto';
  }
}

onMounted(async () => {
  await nextTick();
  // console.log(smAndLarger.value) 8kddp
  document.addEventListener('scroll', fixMe, true);
});
</script>
<template>
  <div
    ref="lastCol"
    bg="transparent"
    rounded
    w="full lg:1.1/4 xl:0.9/4 2xl:0.8/4"
    display="block sm:flex lg:block"
    space=" y-2 lg:(x-0 y-2) sm:(x-2 y-0)"
  >
    <div
      flex="grow"
      bg="$ineed-bg dark:dark"
      border="rounded-md"
      class="shadow-1"
    >
      <div class="butline">
        <div p="2">Seller Information</div>
      </div>
      <div p="4" display="flex" space="x-4">
        <div block>
          <div font="semibold" m="b-1">
            {{ 'iNeeds Store' }}
          </div>
          <div text="sm">94% Rating Score</div>
          <div text="sm">700 followers</div>
        </div>
        <div flex="grow" display="flex" place="content-end items-end">
          <q-btn class="ibtn" bg="primary/25" no-caps flat> Follow </q-btn>
        </div>
      </div>
      <hr border="t-0.1px gray-200 dark:gray-800" />
      <div p="4" space="y-0.5">
        <div text="gray-600 dark:gray-300" m="b-2">Seller Performance</div>
        <div display="flex" place="items-center" space="x-2">
          <div
            class="rounded-full"
            display="flex"
            place="items-center content-center"
            bg="positive"
            p="0.5"
          >
            <q-icon color="white" name="star" />
          </div>
          <div text="sm">Order Fulfillment Rate: Good</div>
        </div>
        <div display="flex" place="items-center" space="x-2">
          <div
            class="rounded-full"
            display="flex"
            place="items-center content-center"
            bg="positive"
            p="0.5"
          >
            <q-icon color="white" name="star" />
          </div>
          <div text="sm">Quality Score: Excellent</div>
        </div>
        <div display="flex" place="items-center" space="x-2">
          <div
            class="rounded-full"
            display="flex"
            place="items-center content-center"
            bg="positive"
            p="0.5"
          >
            <q-icon color="white" name="star" />
          </div>
          <div text="sm">Customer Rating: Excellent</div>
        </div>
      </div>
    </div>
    <div
      flex="grow"
      bg="white dark:dark"
      border="rounded-md"
      class="test hidden items-center lg:flex"
      p="2"
      hover="bg-saccent text-white dark:bg-primary/20"
    >
      <router-link to="/">
        You can also sell on iNeeds! click here To list your products
      </router-link>
      <q-icon text="2xl" name="chevron-right" />
    </div>
    <div
      flex="grow"
      bg="$ineed-bg dark:dark"
      border="rounded-md"
      class="shadow-1"
    >
      <div class="butline">
        <div p="2">Product Details</div>
      </div>
    </div>
  </div>
</template>

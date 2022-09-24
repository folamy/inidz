<script lang="ts">
import { preFetch } from 'quasar/wrappers';
import { contentStore as contStore } from '../stores/contents';
export default {
  preFetch: preFetch(async ({ store }) => {
    const contentStore = contStore(store);
    await contentStore.getProducts();
    await contentStore.setCategories();
  }),
};
</script>
<script setup lang="ts">
import { contentStore } from 'stores/contents';
const { screen } = useQuasar();
const imageArray = [
  { alt: 'intel_banner', src: 'banners/intel.jpg' },
  { alt: 'asus', src: 'banners/asus.jpeg' },
  { alt: 'banner', src: 'banners/banner.jpeg' },
  { alt: 'verve', src: '/banners/verve.jpg' },
  { alt: 'coke', src: '/banners/coke.png' },
  { alt: 'samsung', src: '/banners/samsung.jpg' },
];
const slide = ref('asus');
const contents = contentStore();
const cats = computed(() => contents.categories);
const items = computed(() => contents.products);
const showMenu = ref(false);
const menuOver = ref(false);
const catId = ref(0);
const menuClose = () =>
  setTimeout(() => {
    if (!menuOver.value) {
      catId.value = 0;
      showMenu.value = false;
    }
  }, 100);
const menuOpen = (id: number) =>
  setTimeout(() => {
    catId.value = id;
    menuOver.value = false;
    showMenu.value = true;
  }, 100);

function hoverMenu(what: boolean) {
  menuOver.value = what;
  if (!what) {
    showMenu.value = false;
  }
}
</script>

<template>
  <q-page padding>
    <!-- <page-container class="mx-auto col-xs-12 col-sm-11 col-md-10 col-lg-9"> -->
    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-sm" m="b-4">
          <div class="hidden !sm-block" w="3.5/12 md:2.8/12">
            <div bg="white dark:#222" class="shadow-2" rounded-md h="full">
              <div
                text="xl paccent"
                bg="primary dark:pdark"
                p="x-4 y-1"
                m="b-2"
                border="rounded-tl-md rounded-tr-md"
                font="semibold"
              >
                Categories
              </div>
              <div text-right>
                <categories
                  :active-id="catId"
                  :open="showMenu"
                  :categories="cats"
                  @open="menuOpen"
                  @close="menuClose"
                />
              </div>
            </div>
          </div>
          <div class="col-xs-12 sm:flex-1">
            <div relative rounded-md class="shadow-2" h="full">
              <category-menu
                :show="showMenu"
                :cat-id="catId"
                @menu-hover="hoverMenu"
              />
              <div h="full">
                <q-carousel
                  v-model="slide"
                  transition-prev="scale"
                  transition-next="scale"
                  swipeable
                  animated
                  autoplay
                  control-color="white"
                  navigation
                  infinite
                  :draggable="false"
                  :arrows="screen.gt.xs"
                  h="min-full full"
                  class="rounded-md"
                >
                  <q-carousel-slide
                    v-for="img in imageArray"
                    :key="img.alt"
                    :name="img.alt"
                    class="rounded-md !p-0"
                  >
                    <img
                      class="rounded-md"
                      :src="img.src"
                      :alt="img.alt"
                      h="full"
                      style="width: 100% !important"
                    />
                  </q-carousel-slide>
                </q-carousel>
              </div>
            </div>
          </div>
          <div class="col-xs-12" w="lg:!2.4/12">
            <div
              w="full"
              h="full"
              bg="white dark:#222"
              class="shadow-2"
              rounded-md
            >
              <div
                text="xl paccent"
                bg="primary dark:pdark"
                p="x-4 y-1"
                m="b-2"
                border="rounded-tl-md rounded-tr-md"
                font="semibold"
              >
                New Deals
              </div>
              <!-- <items-new-deals v-for="(item, index) in newDeal" :key="index" :item="item" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <section m="y-4" class="shadow-2" bg="white dark:dark" rounded-md>
      <div
        font="bold"
        p="x-4 y-2.5"
        text="20px"
        flex
        items-center
        class="butline"
      >
        Top selling items
      </div>
      <div m="y-2" w="full max-full" flex overflow="auto" p="x-2 b-4">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="min-w-180px max-w-200px"
          not-last="mr-2"
        >
          <product-item :item="item" />
        </div>
        <div
          v-for="(item, index) in items"
          :key="index"
          class="min-w-180px max-w-200px"
          not-last="mr-2"
        >
          <product-item :item="item" />
        </div>
      </div>
    </section>
    <!-- <viewed-items /> -->
    <!-- </page-container> -->
  </q-page>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';

interface Links {
  label: string;
  route: RouteLocationRaw;
}
const helpLinks = $ref<Links[]>([
  { label: 'Help Center', route: '/' },
  { label: 'How to shop on iNeeds', route: '/' },
  { label: 'Delivery options and timelines', route: '/' },
  { label: 'How to return an iten on iNeeds', route: '/' },
  { label: 'Corporate and bulk purchases', route: '/' },
  { label: 'How to report an item', route: '/' },
]);
const aboutLinks = $ref<Links[]>([
  { label: 'About us', route: '/' },
  { label: 'Career with iNeeds', route: '/' },
  { label: 'Terms and conditions', route: '/' },
  { label: 'Privacy and Cookie Notice', route: '/' },
  // { label: 'Corporate and bulk purchases', route: '/' },
  // { label: 'How to report an item', route: '/' },
]);
const PartnerLinks = $ref<Links[]>([
  { label: 'Sell on iNeeds', route: '/' },
  { label: 'Become a sales consultant', route: '/' },
  { label: 'Become a vendor', route: '/' },
  { label: 'Become a Logistics Service Partner', route: '/' },
  // { label: 'Corporate and bulk purchases', route: '/' },
  // { label: 'How to report an item', route: '/' },
]);
const accountLinks = $ref<Links[]>([
  { label: 'Login', route: '/account/login' },
  { label: 'Register with iNeeds', route: '/account/register' },
  // { label: 'Become a Logistics Service Partner', route: '/' },
  // { label: 'Corporate and bulk purchases', route: '/' },
  // { label: 'How to report an item', route: '/' },
]);
</script>

<template>
  <div pos="" m="">
    <div class="hidden sm:!block" bg="dark">
      <div
        display="flex"
        flex="wrap"
        space="x-6"
        text="white"
        p="x-2 t-8 b-10"
        container
        m="x-auto"
      >
        <div flex="1">
          <router-link to="/">
            <img src="~assets/logo1.png" w="130px" class="gt-xs" />
            <q-img src="~assets/logo2.png" w="48px" class="xs" />
          </router-link>
        </div>
        <div flex-1 space="y-2">
          <div space="3">
            <div font="bold" text="xl">New to iNeeds?</div>
            <div text="sm gray-400">
              Subscribe to our newsletter to get updates on our latest offers!
            </div>
          </div>
          <div w="full" display="col md:flex" space="y-2 md:y-0 md:x-2">
            <input
              type="text"
              p="x-2 y-1.2"
              placeholder="Search items, categories, and brands"
              class="flex-1"
              caret="dark dark:white"
              border="rounded-md"
              outline="none"
              text="dark-500 dark:gray-100"
              bg="gray-300 dark:gray-500"
              :autofocus="false"
            />
            <div display="flex" space="x-2">
              <q-btn flat no-caps bg="transparent active:gray-200/60">
                Male
              </q-btn>
              <q-btn flat no-caps bg="transparent active:gray-200/60">
                Female
              </q-btn>
            </div>
          </div>
        </div>
        <div flex-1>
          <div space="3">
            <div font="bold" text="xl">Store Front</div>
            <div>
              <router-link
                font="normal"
                p="x-1 y-0"
                to="/"
                bg="hover:paccent/10"
                class="max-w-max"
              >
                Register as a Vendor
              </router-link>
              <router-link
                font="normal"
                p="x-1 y-0"
                to="/"
                bg="hover:paccent/10"
                class="max-w-max"
              >
                Register as a Merchant
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div
        display="flex"
        flex="wrap"
        space="x-6"
        text="white"
        p="x-2 t-8 b-10"
        container
        m="x-auto"
      >
        <div flex-1>
          <div font="semibold" m="b-3">WE WANT TO HELP YOU</div>
          <div v-for="link in helpLinks" :key="link.label">
            <router-link
              p="x-0 y-0"
              :to="link.route"
              font="normal"
              bg="hover:paccent/10"
              class="text-sm text-gray-400 max-w-max"
            >
              {{ link.label }}
            </router-link>
          </div>
        </div>
        <div flex-1>
          <div font="semibold" m="b-3">ABOUT INEEDS</div>
          <div v-for="link in helpLinks" :key="link.label">
            <router-link
              p="x-0 y-0"
              :to="link.route"
              font="normal"
              bg="hover:paccent/10"
              class="text-sm text-gray-400 max-w-max"
            >
              {{ link.label }}
            </router-link>
          </div>
        </div>
        <div flex-1>
          <div font="semibold" m="b-3">BECOME A PARTNER</div>
          <div v-for="link in PartnerLinks" :key="link.label">
            <router-link
              p="x-0 y-0"
              :to="link.route"
              font="normal"
              bg="hover:paccent/10"
              class="text-sm text-gray-400 max-w-max"
            >
              {{ link.label }}
            </router-link>
          </div>
        </div>
        <div flex-1>
          <div font="semibold" m="b-3">ACCOUNT</div>
          <div v-for="link in accountLinks" :key="link.label">
            <router-link
              v-for="link in accountLinks"
              :key="link.label"
              p="x-0 y-0"
              :to="link.route"
              font="normal"
              bg="hover:paccent/10"
              class="text-sm text-gray-400 max-w-max"
            >
              {{ link.label }}
            </router-link>
          </div>
        </div>
      </div>
      <div
        display="flex"
        flex="wrap"
        space="x-6"
        text="white"
        p="x-2 t-8 b-10"
        container
        m="x-auto"
      >
        <div flex-1>
          <div font="semibold" m="b-3">FOLLOW US ON</div>
          <div display="flex" place="items-center" space="x-3">
            <div class="i-fa6-brands:facebook-f" text="2xl" cursor="pointer" />
            <div class="i-ri:twitter-fill" text="2xl" cursor="pointer" />
            <div class="i-ri:youtube-fill" text="2xl" cursor="pointer" />
            <div class="i-ri:instagram-fill" text="2xl" cursor="pointer" />
            <div class="i-ri:whatsapp-fill" text="2xl" cursor="pointer" />
          </div>
        </div>
        <div flex-1>
          <div font="semibold" m="b-3">PAYMENT METHODS</div>
          <div display="flex" place="items-center" space="x-3">
            <div
              class="i-fa6-brands:cc-mastercard"
              text="2xl"
              cursor="pointer"
            />
            <div class="i-fa6-brands:cc-visa" text="2xl" cursor="pointer" />
            <div class="i-ic:round-atm" text="2xl" cursor="pointer" />
            <!-- <div class="i-ri:instagram-fill" text="2xl" />
            <div class="i-ri:whatsapp-fill" text="2xl" /> -->
          </div>
        </div>
      </div>
    </div>
    <div class="sm:hidden">
      <div
        display="flex"
        flex="wrap"
        space="x-4"
        place="content-around"
        bg="dark"
        text="white"
        p="x-2 y-2"
        font="bold"
      >
        <router-link p="x-1 y-1" to="/" m="t-4"> Help Center </router-link>
        <router-link p="x-1 y-1" to="/" m="t-4"> Contact Us </router-link>
        <router-link p="x-1 y-1" to="/" m="t-4">
          Terms & Conditions
        </router-link>
        <router-link p="x-1 y-1" to="/" m="t-4"> Sell on iNeeds </router-link>
        <router-link p="x-1 y-1" to="/" m="t-4"> Report a Product </router-link>
      </div>
    </div>
    <div class="text-center" bg="dark-900/95" text="sm gray-300" p="y-2">
      <em>Built by <strong>FolwebIT </strong> for <strong> iNeeds</strong></em>
    </div>
  </div>
</template>

import { defineStore } from 'pinia';
// import { useToast, POSITION } from 'vue-toastification'
import { actions } from './actions';
import { getters } from './getters';
import type { Item } from '../../model/item';

// const toast = useToast()

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartItems: [] as Array<Item>,
    favorites: [] as Array<Item>,
    inView: {} as Item,
    viewedItems: [] as Array<Item>,
  }),

  actions: actions(),

  getters: getters(),
  persistedState: {
    // persist: false
    excludePaths: ['favorites'],
  },
});

// if (import.meta.hot) { import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot)) }

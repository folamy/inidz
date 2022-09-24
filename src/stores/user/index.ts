import { defineStore } from 'pinia';
// import { useToast, POSITION } from 'vue-toastification'
import { actions } from './actions';
import { getters } from './getters';
import type { Address, User as Customer } from '../../model/user';
import type { Item } from '../../model/item';

// const toast = useToast()

export const useUserStore = defineStore('userStore', {
  state: () => ({
    addresses: [] as Array<Address>,
    customer: {} as Customer,
    favorites: [] as Array<Item>,
    selectedId: '' as string,
    isLogin: false,
    CToken: '' as string,
  }),

  actions: actions(),
  getters: getters(),
  persistedState: {
    persist: false,
  },
});

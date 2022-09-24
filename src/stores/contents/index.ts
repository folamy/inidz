import { defineStore } from 'pinia';
import type { Address } from '../../model/user';
import { actions } from './actions';
import { getters } from './getters';
import type {
  Category,
  SubCategory,
  GroupCategory,
  Item,
} from '../../model/item';

// const toast = useToast()

export const contentStore = defineStore('contentStore', {
  state: () => ({
    products: [] as Array<Item>,
    categories: [] as Array<Category>,
    subCats: [] as Array<SubCategory>,
    groupCats: [] as Array<GroupCategory>,
    addresses: [] as Array<Address>,
  }),

  actions: actions(),
  getters: getters(),
});
// if (import.meta.hot) { import.meta.hot.accept(acceptHMRUpdate(contentStore, import.meta.hot)) }

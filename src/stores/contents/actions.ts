import type { SubCategory, GroupCategory } from '../../model/item';
import { api } from '../../boot/axios';

export const actions = function () {
  return {
    // categories
    async setCategories() {
      !this.categories.length &&
        (this.categories = await (await api({ url: '/get-categories' })).data);
      !this.subCats.length &&
        (this.subCats = await (await api({ url: '/get-sub-cats' })).data);
      !this.groupCats.length &&
        (this.groupCats = await (await api({ url: '/get-group-cats' })).data);
    },
    async setSubCats(subs: SubCategory[]) {
      this.subCats = subs;
    },
    async setGroupCats(groups: GroupCategory[]) {
      this.groupCats = groups;
    },

    // items
    async getProducts() {
      this.products = (await api({ url: '/get-items' })).data;
      // const items = await (await api({ url: '/get-items' })).data
      // this.products = items.map(item => {
      //   item.images = item.images.split(',')
      //   return item
      // })
    },
  };
};

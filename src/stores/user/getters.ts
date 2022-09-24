import type { Address } from '../../model/user';
import type { Item } from '../../model/item';

export const getters = function () {
  return {
    // setAddress: function () {
    //   return (id: string) => {
    //     return this.addresses.find((add: Address) => add.uid === id)
    //   }
    // },
    selectedAddress: function () {
      return this.addresses.find((add: Address) => add.uid === this.selectedId);
    },
    // Favorites Items
    inFav() {
      return async (id: string) => {
        if (this.favorites && this.favorites.length > 0) {
          return this.favorites.some((e: Item) => e.product_id === id);
        } else {
          return false;
        }
      };
    },
  };
};

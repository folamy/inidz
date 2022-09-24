import type { Item } from '../../model/item';
import { deliveryCharge } from '../../utils/filterFn';

export const getters = () => {
  return {
    cartLength() {
      return this.cartItems.length;
    },
    cartTotal() {
      const items: Array<Item> = this.cartItems;
      return items.reduce((acc, item) => acc + item.price * item.qty, 0);
    },
    itemQty() {
      return (id: string) => {
        const indexId = this.cartItems.findIndex(
          (item) => item.product_id === id
        );
        return indexId > -1 ? this.cartItems[indexId].qty : 1;
      };
    },
    inCart() {
      return (id: string) =>
        this.cartItems.some((e: Item) => e.product_id === id);
    },
    getInView() {
      return this.inView;
    },
    viewed() {
      return (id: string) =>
        this.viewedItems.some((e: Item) => e.product_id === id);
    },
    getDeliveryChargeTotal() {
      const items: Array<Item> = this.cartItems;
      return items.reduce(
        (acc, item) => acc + deliveryCharge(item.price) * item.qty,
        0
      );
    },
    getViewedItems() {
      return this.viewedItems;
    },

    // getUserFavs () {
    //   return this.favorites
    // }
  };
};

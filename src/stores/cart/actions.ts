import { slugify } from '../../utils/filterFn';
import type { Item } from '../../model/item';
export const actions = function () {
  // const user = useUserStore()
  return {
    addItemToCart(item: Item) {
      if (this.inCart(item.product_id)) {
        this.router.push(`/products/${slugify(item.slug)}`);
        return;
      }
      item.qty = 1; // setting default qty to 1
      this.cartItems.unshift(item);
      // toast.clear()
      console.log('One piece of this Item has been added to the Cart');
    },

    increaseQty(id: string) {
      const indexId = this.cartItems.findIndex(
        (item) => item.product_id === id
      );
      if (this.cartItems[indexId].qty === 2) {
        // toast.clear()
        console.log('Only (2) of this item available');
        return;
      }
      this.cartItems[indexId].qty++;
    },

    decreaseQty(id: string = this.inView.product_id) {
      const indexId = this.cartItems.findIndex(
        (item) => item.product_id === id
      );
      if (this.cartItems[indexId].qty === 1) {
        return;
      }

      this.cartItems[indexId].qty--;
    },

    deleteItem(id: string) {
      const indexId = this.cartItems.findIndex(
        (item) => item.product_id === id
      );
      this.cartItems.splice(indexId, 1);
    },

    async setInView(item: Item) {
      this.inView = item;
    },

    clearCart() {
      this.cartItems.length = 0;
    },
    setDeliveryDialog(payload: boolean) {
      this.deliveryDialog = payload;
    },

    // viewedItems
    addViewed(item: Item) {
      if (this.viewed(item.product_id)) {
        return;
      }
      this.viewedItems.unshift(item);
    },
  };
};

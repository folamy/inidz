import type { Address } from '../../model/user';
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
  };
};

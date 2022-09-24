import { getNotified } from '../../utils/generalHelpers';
import type { Address, User } from '../../model/user';
import type { Item } from '../../model/item';
import { useGenUid } from '../../utils/filterFn';
import { api } from 'boot/axios';

export const actions = function () {
  return {
    async addToAddress(address: Address) {
      const id = useGenUid(),
        add = { ...address, uid: id };
      // @ts-expect-error missing type
      this.addresses.unshift(add);
      this.setAddressId(id);
    },
    async setAddressId(id: string) {
      // @ts-expect-error missing type
      this.selectedId = id;
    },
    async deleteAddress(id: string) {
      const indexId = this.addresses.findIndex(
        (address: Address) => address.uid === id
      );
      this.addresses.splice(indexId, 1);

      this.addresses.length && (await this.setAddressId(this.addresses[0].uid));
    },

    // User Authentication!
    async setCustomer(customer: User) {
      // console.log(customer)
      this.customer = customer;
      this.isLogin =
        typeof this.customer.uid === 'string' && this.customer.uid !== '';
    },
    async setToken(token: string) {
      this.CToken = token;
    },
    async logout() {
      try {
        await api('/customer-logout');
        await this.setCustomer({});
        await this.setToken('');
        this.router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
    async login(loginData: unknown) {
      try {
        const { customer, CToken, msg } = await api({
          url: '/customer-login',
          method: 'POST',
          data: {
            loginData,
          },
        }).then((res) => res.data);
        this.setCustomer(customer);
        this.setToken(CToken);
        // remove customer passsword
        delete customer.passsword;
        this.addToAddress(customer);
        return { customer, emsg: msg };
      } catch (error) {
        const { data, status } = error.response,
          title = status === 404 ? 'User not Found' : 'Invalid Password',
          msg = data.msg;

        getNotified(msg, title);
        return data;
      }
    },
    async userRegister(customerData: User) {
      try {
        const { customer, CToken } = await api({
          url: '/customer-register',
          method: 'POST',
          baseURL: process.env.baseURL,
          data: {
            customerData,
          },
        }).then((res) => res.data);
        this.setCustomer(customer);
        this.setToken(CToken);
        // remove customer passsword
        delete customer.passsword;
        this.addToAddress(customer);
        return { customer };
      } catch (error) {
        const { msg } = error.response._data;
        getNotified(msg, 'Duplicate User Found!');
        return { msg };
      }
    },
    // Favorite Items
    addItemFav(item: Item) {
      this.favorites.unshift(item);
    },
    async getUserFavs() {
      if (!this.isLogin) {
        return;
      }
      const favorites = await (await api({ url: '/get-favorites' })).data;
      this.favorites = favorites;
      // console.log(favorites)
    },
    async replaceFavs(id: string) {
      if (!this.isLogin) {
        const msg = 'This action requires that you login.',
          title = 'Authentication Required!';
        getNotified(msg, title);
        return;
      }
      this.favorites = await (
        await api({ url: `/handle-favorite?productId=${id}` })
      ).data;
    },
    deleteFav(id: string) {
      const indexId = this.favorites.findIndex(
        (item) => item.product_id === id
      );
      this.favorites.splice(indexId, 1);
    },
    clearFav() {
      this.favorites.length = 0;
    },
  };
};

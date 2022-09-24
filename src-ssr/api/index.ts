import { Router } from 'express';
import * as formApi from './forms';
import * as items from './items';
import * as user from './user';
import { duplicateUser } from './middlewares';

export function itemsRoute(router: Router) {
  router.get('/get-items', items.fetchItems);
  router.get('/view-item', items.viewItem);
  router.get('/handle-favorite', items.handleFavorite);
  router.get('/get-favorites', items.getUserFavs);
  router.post('/add-order', items.addOrder);
  router.get('/get-user-order', items.getOrderHistory);
}

export function userRoute(router: Router) {
  router.post('/customer-register', duplicateUser, user.register);
  router.post('/customer-login', user.login);
  router.delete('/customer-logout', user.logout);
}
export function formRoute(router: Router) {
  router.get('/get-states', formApi.getNgStates);
  router.get('/get-lga', formApi.getLga);
  router.get('/get-categories', formApi.categories);
  router.get('/get-sub-cats/', formApi.getSubCategories);
  router.get('/get-group-cats/', formApi.groupCategories);
}

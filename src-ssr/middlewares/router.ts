import { ssrMiddleware } from 'quasar/wrappers';
import { formRoute, itemsRoute, userRoute } from '../api';

export default ssrMiddleware(async ({ app }) => {
  userRoute(app);
  itemsRoute(app);
  formRoute(app);
});

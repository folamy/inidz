import { ssrMiddleware } from 'quasar/wrappers';
import type { IncomingMessage, ServerResponse } from 'http';
import { Server } from 'socket.io';
import { handleFavorite } from '../api/socketHandler/favorite';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let server: any = null;
export default ssrMiddleware(async ({ app }) => {
  app.use((req: IncomingMessage, res: ServerResponse, next) => {
    if (!server) {
      // @ts-expect-error missing type
      server = res.socket?.server;
      const io = new Server(server);
      io.on('connection', (socket) => {
        console.log('Made socket connection');

        socket.on('favorite', async (msg) => {
          const favs = await handleFavorite(msg);
          // return a new set favorite items by the user
          socket.emit('returnFavs', favs);
        });

        socket.on('disconnect', () => console.log('disconnected'));
      });
    }
    next();
  });
});

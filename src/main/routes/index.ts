import { Router } from 'express';
import survivorRoutes from './survivor.routes';
import itemRoutes from './item.routes';
import tradeRoutes from './trade.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.status(200);
  return res.json({ ok: true });
});

routes.use('/survivor', survivorRoutes);
routes.use('/item', itemRoutes);
routes.use('/trade', tradeRoutes);

export default routes;

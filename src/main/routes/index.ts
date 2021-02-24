import { Router } from 'express';
import survivorRoutes from './survivor.routes';
import itemRoutes from './item.routes';
import tradeRoutes from './trade.routes';
import ReportsControllerBuilder from '../builders/ReportsControllerBuilder';

const routes = Router();
const reportsControllerBuilder = ReportsControllerBuilder();

routes.get('/', async (req, res) => {
  const report = await reportsControllerBuilder.index();
  return res.json(report);
});

routes.use('/survivor', survivorRoutes);
routes.use('/item', itemRoutes);
routes.use('/trade', tradeRoutes);

export default routes;

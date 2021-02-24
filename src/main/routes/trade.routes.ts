import { Router } from 'express';
import TradeControllerbuilders from '../builders/TradeControllerBuilder';

const tradeRoutes = Router();

const TradeController = TradeControllerbuilders();

tradeRoutes.post('/', async (req, res) => {
  await TradeController.store(req.body);

  return res.status(204).json();
});

export default tradeRoutes;

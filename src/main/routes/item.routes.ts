import { Router } from 'express';
import ItemControllerBuilder from '../builders/ItemControllerBuilder';

const itemRoutes = Router();

const itemControllerBuilder = ItemControllerBuilder();

itemRoutes.get('/', async (req, res) => {
  const allItems = await itemControllerBuilder.index();
  return res.json(allItems);
});

itemRoutes.get('/:item_id', async (req, res) => {
  const allItems = await itemControllerBuilder.show(req.params.item_id);
  return res.json(allItems);
});

export default itemRoutes;

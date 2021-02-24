import { ITradeController } from '../adapters';
import { InventoryRepository, ItemRepository, SurvivorRepository } from '../../usecases/typeorm/repositories';
import { TradeController } from '../controllers';

export default (): ITradeController => {
  const inventoryRepository = new InventoryRepository();
  const itemRepository = new ItemRepository();
  const survivorRepository = new SurvivorRepository();

  return new TradeController(
    survivorRepository,
    inventoryRepository,
    itemRepository,
  );
};

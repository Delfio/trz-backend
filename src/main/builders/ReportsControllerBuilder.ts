import { IReportsController } from '../adapters';
import { ReportsController } from '../controllers';
import {
  InventoryRepository,
  ItemRepository,
  SurvivorRepository,
} from '../../usecases/typeorm/repositories';

export default (): IReportsController => {
  const inventoryRepository = new InventoryRepository();
  const itemRepository = new ItemRepository();
  const survivorRepository = new SurvivorRepository();
  return new ReportsController(
    inventoryRepository,
    itemRepository,
    survivorRepository,
  );
};

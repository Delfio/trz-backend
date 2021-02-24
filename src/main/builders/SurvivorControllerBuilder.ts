import { ISurvivorController } from '../adapters';
import { SurvivorController } from '../controllers';
import { InventoryRepository, ItemRepository, SurvivorRepository } from '../../usecases/typeorm/repositories';

export default (): ISurvivorController => {
  const inventoryRepository = new InventoryRepository();
  const itemRepository = new ItemRepository();
  const survivorRepository = new SurvivorRepository();

  return new SurvivorController(survivorRepository, itemRepository, inventoryRepository);
};

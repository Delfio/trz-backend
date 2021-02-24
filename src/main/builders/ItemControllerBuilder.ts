import { IItemController } from '../adapters';
import { ItemControllerAdapter } from '../controllers';
import { ItemRepository } from '../../usecases/typeorm/repositories';

export default (): IItemController => {
  const itemRepository = new ItemRepository();
  return new ItemControllerAdapter(itemRepository);
};

import { GetItemByID, IItem } from '../domain';
import { IItemAdapter } from '../adapters/database/IItemAdapter';
import DomainError from '../usecases/validations/DomainErro';

class GetItemByIDService implements GetItemByID {
  constructor(private itemAdapter: IItemAdapter) {}

  async execute(item_id: string): Promise<IItem> {
    try {
      const itemExists = await this.itemAdapter.getItemById(item_id);

      if (!itemExists) {
        throw new DomainError('item not exists !');
      }

      return itemExists;
    } catch (error) {
      throw new DomainError(`Invalid Information ${error.message}`);
    }
  }
}

export default GetItemByIDService;

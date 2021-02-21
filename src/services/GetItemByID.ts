import { GetItemByID, IItem } from '../domain';
import { IItemAdapter } from '../adapters/database/IItemAdapter';
import DomainError from '../usecases/validations/DomainErro';

class GetItemByIDService implements GetItemByID {
  constructor(private itemAdapter: IItemAdapter) {}

  async execute(item_id: string): Promise<IItem> {
    const itemExists = await this.itemAdapter.getItemById(item_id);

    if (!itemExists) {
      throw new DomainError('item not exists !');
    }

    return itemExists;
  }
}

export default GetItemByIDService;

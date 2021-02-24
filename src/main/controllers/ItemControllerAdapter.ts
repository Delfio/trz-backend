import { IItem } from '../../domain';
import { IItemController } from '../adapters';

export class ItemControllerAdapter extends IItemController {
  async index(): Promise<IItem[]> {
    return this.itemAdapter.getAllItens();
  }

  async show(item_id: string): Promise<IItem | undefined> {
    return this.itemAdapter.getItemById(item_id);
  }
}

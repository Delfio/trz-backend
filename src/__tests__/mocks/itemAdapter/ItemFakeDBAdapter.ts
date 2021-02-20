import IItemAdapter from '../../../adpters/database/IItemAdapter';
import { IItem } from '../../../domain';

class ItemAdapterFakeDB implements IItemAdapter {
    private lstOfItems: IItem[] = [];

    async getItemById(item_id: string): Promise<IItem | undefined> {
      return this.lstOfItems.find((item) => item.item_id === item_id);
    }

    async getAllItens(): Promise<IItem[]> {
      return this.lstOfItems;
    }

    async getCatalogOfItem(): Promise<IItem[]> {
      return this.lstOfItems;
    }

    async addItem(item: IItem): Promise<void> {
      this.lstOfItems.push(item);
    }
}

export default ItemAdapterFakeDB;

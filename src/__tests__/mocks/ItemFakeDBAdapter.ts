import { IItemAdapter } from '../../adapters';
import { IItem } from '../../domain';

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

    private async updateItemAmount(itemRefer: IItem): Promise<void> {
      const itemExists = this.lstOfItems.find(
        (item) => item.item_id === itemRefer.item_id,
      );

      itemExists!.item_amount_total += 1;
    }
}

export default ItemAdapterFakeDB;

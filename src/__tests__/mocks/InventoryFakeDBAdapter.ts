import { IInventoryAdapter } from '../../adapters';
import { IInventory } from '../../domain';

class IInventoryFakeDBAdapter implements IInventoryAdapter {
    private listOfInventory: IInventory[] = [];

    async addItemToSurvivorInventory(inventory: IInventory): Promise<void> {
      this.listOfInventory.push(inventory);
    }

    async getAllItensIntoSurvivorInventory(survivor_id: string): Promise<IInventory[]> {
      return this.listOfInventory.filter((inventory) => inventory.survivor_id === survivor_id);
    }

    async findItemIntoSurvivorInventory(
      survivor_id: string, item_id: string,
    ): Promise<IInventory | undefined> {
      return this.listOfInventory.find(
        (inventory) => inventory.item_id === item_id && inventory.survivor_id === survivor_id,
      );
    }
}

export default IInventoryFakeDBAdapter;

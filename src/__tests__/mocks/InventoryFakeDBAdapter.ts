import { IInventoryAdapter } from '../../adpters';
import { IInventory, IItem, ISurvivor } from '../../domain';

class IInventoryFakeDBAdapter implements IInventoryAdapter {
    private listOfInventory: IInventory[] = [];

    async addItemToSurvivorInventory(
      item: IItem,
      survivor: ISurvivor,
      amount: number,
    ): Promise<void> {
      this.listOfInventory.push({
        survivor_id: survivor.id,
        ...item,
        amount,
      });
    }

    async getAllItensIntoSurvivorInventory(survivor_id: string): Promise<IInventory[]> {
      return this.listOfInventory.filter((inventory) => inventory.survivor_id === survivor_id);
    }
}

export default IInventoryFakeDBAdapter;

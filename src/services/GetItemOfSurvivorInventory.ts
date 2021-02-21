import DomainErro from '../usecases/validations/DomainErro';
import { GetItemOfSurvivorInventory, IInventory } from '../domain';
import { ISurvivorsAdapter, IInventoryAdapter, IItemAdapter } from '../adapters';

class GetItemOfSurvivorInventoryService implements GetItemOfSurvivorInventory {
  constructor(
        private inventoryAdapter: IInventoryAdapter,
        private itemAdapter: IItemAdapter,
        private survivorsAdapter: ISurvivorsAdapter,
  ) {

  }

  async execute(survivor_id: string, item_id: string): Promise<IInventory> {
    const [survivor, item, inventory] = await Promise.all([
      this.survivorsAdapter.getSurvivor(survivor_id),
      this.itemAdapter.getItemById(item_id),
      this.inventoryAdapter.findItemIntoSurvivorInventory(survivor_id, item_id),
    ]);

    if (!survivor) {
      throw new DomainErro('Survivor dont registred!');
    }

    if (survivor.infected) {
      throw new DomainErro('Infected survivor, your items are inaccessible!');
    }

    if (!item) {
      throw new DomainErro('item dont registred!');
    }

    if (!inventory) {
      throw new DomainErro('survivor dont contains this item!');
    }

    return {
      ...inventory,
      item,
    };
  }
}

export default GetItemOfSurvivorInventoryService;

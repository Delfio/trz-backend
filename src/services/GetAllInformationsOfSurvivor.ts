import { GetAllInformationsOfSurvivor, ISurvivor, IInventory } from '../domain';
import { IInventoryAdapter, IItemAdapter, ISurvivorsAdapter } from '../adapters';
import DomainErro from '../usecases/validations/DomainErro';

class GetAllInformationsOfSurvivorService implements GetAllInformationsOfSurvivor {
  constructor(
    private inventoryAdapter: IInventoryAdapter,
    private itemAdapter: IItemAdapter,
    private survivorsAdapter: ISurvivorsAdapter,
  ) {

  }

  async execute(survivor_id: string): Promise<ISurvivor> {
    const validSurvivor = await this.survivorsAdapter.getSurvivor(survivor_id);

    if (!validSurvivor) {
      throw new DomainErro('Survivor not exists!');
    }

    if (validSurvivor.infected) {
      throw new DomainErro('Infected survivor, your items are inaccessible!');
    }

    const survivorInventory = await this.inventoryAdapter
      .getAllItensIntoSurvivorInventory(validSurvivor.id);

    if (survivorInventory.length === 0) {
      return {
        ...validSurvivor,
        suvivor_inventory: [] as IInventory[],
      };
    }

    const PromisseOfAllItemsInTheSurvivorInventory = survivorInventory
      .map((item) => this.itemAdapter.getItemById(item.item_id));

    const AllItemsInTheSurvivorInventory = await Promise
      .all(PromisseOfAllItemsInTheSurvivorInventory);

    const inventoryFormated = survivorInventory.map((inventory) => {
      const itemOfInventory = AllItemsInTheSurvivorInventory
        .find((item) => item?.item_id === inventory.item_id);

      if (itemOfInventory) {
        return {
          ...inventory,
          item: itemOfInventory,
        };
      }

      return inventory;
    });

    return {
      ...validSurvivor,
      suvivor_inventory: inventoryFormated,
    };
  }
}

export default GetAllInformationsOfSurvivorService;

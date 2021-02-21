import {
  AddItemsToTheSurvivorInventory, IInventory, InventoryDTO, GetItemByID,
} from '../domain';
import { ISurvivorsAdapter, IInventoryAdapter } from '../adapters';

class AddItemsToTheSurvivorInventoryService implements AddItemsToTheSurvivorInventory {
  constructor(
      private survivorAdapter: ISurvivorsAdapter,
      private getItemByID: GetItemByID,
      private inventoryAdapter: IInventoryAdapter,
  ) {}

  async execute(data: InventoryDTO): Promise<IInventory> {
    const {
      amount,
      item_id,
      survivor_id,
    } = data;

    const [survivor, item] = await Promise.all(
      [
        this.survivorAdapter.getSurvivor(survivor_id),
        this.getItemByID.execute(item_id),
      ],
    ).then((res) => res).catch((err) => {
      throw new Error(`Error in adding item into inventory ${err}`);
    });

    if (!survivor) {
      throw new Error('Error in adding item into inventory, survivor dont exists!');
    }
    if (!item) {
      throw new Error('Error in adding item into inventory, item dont exists!');
    }

    await this.inventoryAdapter
      .addItemToSurvivorInventory(
        item,
        survivor,
        amount,
      );

    return data;
  }
}

export default AddItemsToTheSurvivorInventoryService;

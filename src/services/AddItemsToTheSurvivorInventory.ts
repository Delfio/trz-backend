import {
  AddItemsToTheSurvivorInventory, IInventory, InventoryDTO, GetItemByID,
} from '../domain';
import { ISurvivorsAdapter } from '../adpters/database';

class AddItemsToTheSurvivorInventoryService implements AddItemsToTheSurvivorInventory {
  constructor(
      private survivorAdapter: ISurvivorsAdapter,
      private getItemByID: GetItemByID,
  ) {}

  async execute(data: InventoryDTO): Promise<IInventory> {
    return Promise.all(
      [
        this.survivorAdapter.getSurvivor(data.survivor_id),
        this.getItemByID.execute(data.item_id),
      ],
    ).then((res) => {
      if (!res[0]) {
        throw new Error('survivor dont exists!');
      }
      if (!res[1]) {
        throw new Error('item dont exists!');
      }

      return {
        ...data,
      };
    }).catch((err) => {
      throw new Error(`Error in adding item into inventory ${err}`);
    });
  }
}

export default AddItemsToTheSurvivorInventoryService;

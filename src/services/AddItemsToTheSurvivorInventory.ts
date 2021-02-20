/* eslint-disable class-methods-use-this */
import { AddItemsToTheSurvivorInventory, IInventory, InventoryDTO } from '../domain';

class AddItemsToTheSurvivorInventoryService implements AddItemsToTheSurvivorInventory {
  async execute(data: InventoryDTO): Promise<IInventory> {
    return {
      ...data,
    };
  }
}

export default AddItemsToTheSurvivorInventoryService;

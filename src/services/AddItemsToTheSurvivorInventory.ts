import { AddItemsToTheSurvivorInventory, IInventory, InventoryDTO } from '../domain';
import ISurvivorAdapter from '../adpters/database/survivor/ISurvivorAdapter';

class AddItemsToTheSurvivorInventoryService implements AddItemsToTheSurvivorInventory {
  constructor(private survivorAdapter: ISurvivorAdapter) {}

  async execute(data: InventoryDTO): Promise<IInventory> {
    const survivorExists = await this.survivorAdapter.getSurvivor(data.survivor_id);

    if (!survivorExists) {
      throw new Error('erro, sobrevivente não existe');
    }

    return {
      ...data,
    };
  }
}

export default AddItemsToTheSurvivorInventoryService;

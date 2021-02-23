import { getRepository, Repository } from 'typeorm';
import { IInventory, ITraderProfile } from '../../../domain';
import { IInventoryAdapter } from '../../../adapters';
import { SurvivorInventoryEntity } from '../entities';

export class InventoryRepository implements IInventoryAdapter {
    private inventoryRepository: Repository<SurvivorInventoryEntity>

    constructor() {
      this.inventoryRepository = getRepository(SurvivorInventoryEntity);
    }

    async addItemToSurvivorInventory(inventory: IInventory): Promise<void> {
      const newItem = this.inventoryRepository.create(inventory);

      await this.inventoryRepository.save(newItem);
    }

    async getAllItensIntoSurvivorInventory(survivor_id: string): Promise<IInventory[]> {
      return this.inventoryRepository.find({
        where: {
          survivor_id,
        },
      });
    }

    async findItemIntoSurvivorInventory(
      survivor_id: string, item_id: string,
    ): Promise<IInventory | undefined> {
      return this.inventoryRepository.findOne({
        where: {
          survivor_id,
          item_id,
        },
      });
    }

    async exchangeBetweenTwoSurvivors(
      trader01: ITraderProfile,
      trader02: ITraderProfile,
    ): Promise<void> {
      // punk
    }
}

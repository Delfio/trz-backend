import { getRepository, Repository } from 'typeorm';
import { IItem } from '../../../domain';
import { IItemAdapter } from '../../../adapters';
import { ItemEntity } from '../entities';

export class ItemRepository implements IItemAdapter {
    private itemRepository: Repository<ItemEntity>

    constructor() {
      this.itemRepository = getRepository(ItemEntity);
    }

    async getItemById(item_id: string): Promise<IItem | undefined> {
      return this.itemRepository.findOne(item_id);
    }

    async getAllItens(): Promise<IItem[]> {
      return this.itemRepository.find();
    }

    async getCatalogOfItem(): Promise<IItem[]> {
      return this.itemRepository.find();
    }
}

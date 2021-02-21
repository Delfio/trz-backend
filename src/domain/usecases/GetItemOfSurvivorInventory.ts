import { IInventory } from '../index';

export interface GetItemOfSurvivorInventory {
    execute(survivor_id: string, item_id: string): Promise<IInventory[]>
}

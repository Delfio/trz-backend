import { IInventory } from '../../domain';

export interface IInventoryAdapter {
    addItemToSurvivorInventory(inventory: IInventory): Promise<void>;
    getAllItensIntoSurvivorInventory(survivor_id: string): Promise<IInventory[]>;
    findItemIntoSurvivorInventory(
        survivor_id: string, item_id: string): Promise<IInventory | undefined>
    // trade
}

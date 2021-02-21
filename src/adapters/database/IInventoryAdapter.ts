import { IItem, ISurvivor, IInventory } from '../../domain';

export interface IInventoryAdapter {
    addItemToSurvivorInventory(item: IItem, survivor: ISurvivor, amount: number): Promise<void>;
    getAllItensIntoSurvivorInventory(survivor_id: string): Promise<IInventory[]>;
    findItemIntoSurvivorInventory(
        survivor_id: string, item_id: string): Promise<IInventory | undefined>
    // trade
}

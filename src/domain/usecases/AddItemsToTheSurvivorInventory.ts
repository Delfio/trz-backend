import { IInventory, InventoryDTO } from '../index';

export interface AddItemsToTheSurvivorInventory {
    execute(data: InventoryDTO): Promise<IInventory>
}

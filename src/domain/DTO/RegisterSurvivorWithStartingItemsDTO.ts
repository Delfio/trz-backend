import { SurvivorDTO, InventoryDTO } from '..';

export type RegisterSurvivorWithStartingItemsDTO = {
    survivor: SurvivorDTO,
    initialInventory: Omit<InventoryDTO, 'survivor_id'>[]
}

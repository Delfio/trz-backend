import { SurvivorDTO, InventoryDTO } from '../../domain';

export type AddSurvivorWithInitialBasicItems = {
    survivor: SurvivorDTO,
    initialInventory: Omit<InventoryDTO, 'survivor_id'>[]
}

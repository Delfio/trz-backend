import { SurvivorDTO } from '../DTO/SurvivorDTO';
import { IInventory } from './IInventory';

export interface ISurvivor extends SurvivorDTO {
    id: string;
    infected: boolean,
    suvivor_inventory?: IInventory[],
}

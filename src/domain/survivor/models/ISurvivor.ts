import { SurvivorDTO } from './SurvivorDTO';

export interface ISurvivor extends SurvivorDTO {
    id: string;
    infected: boolean,
    inventory_id: number
}

import { coords_of_survivor, ISurvivor } from '../index';

export interface UpdateSurvivorLocation {
    execute(survivor_id: string, new_coords: coords_of_survivor): Promise<ISurvivor>
}

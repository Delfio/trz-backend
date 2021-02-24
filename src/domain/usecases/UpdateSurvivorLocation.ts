import { UpdateSurvivorLocationDTO, ISurvivor } from '../index';

export interface UpdateSurvivorLocation {
    execute(new_coords: UpdateSurvivorLocationDTO): Promise<ISurvivor>
}

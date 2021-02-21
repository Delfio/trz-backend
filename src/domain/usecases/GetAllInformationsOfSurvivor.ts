import { ISurvivor } from '../index';

export interface GetAllInformationsOfSurvivor {
    execute(survivor_id: string): Promise<ISurvivor>
}

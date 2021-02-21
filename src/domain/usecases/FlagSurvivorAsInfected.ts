import { ISurvivor } from '../index';

export interface FlagSurvivorAsInfected {
    execute(survivor_id: string): Promise<ISurvivor>
}

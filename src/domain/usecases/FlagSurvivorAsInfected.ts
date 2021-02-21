import { ISurvivor } from '../index';

export interface FlagSurvivorAsInfected {
    execute(reporter_survivor_id: string, infected_survivor_id: string): Promise<ISurvivor>
}

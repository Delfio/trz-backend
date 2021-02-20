import { ISurvivor } from '../models/ISurvivor';

export interface AddSurvivor {
    execute(data: Omit<ISurvivor, 'id'>): Promise<ISurvivor>
}

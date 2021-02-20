import { ISurvivor } from '../../domain';

export interface ISurvivorsAdapter {
    addSurvivor(survivor: ISurvivor): Promise<ISurvivor>

    getSurvivor(survivorId: string): Promise<ISurvivor | undefined>

    deleteSurvivor(survivorId: string): Promise<void>
}

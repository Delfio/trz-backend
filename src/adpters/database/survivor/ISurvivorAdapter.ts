import { ISurvivor } from '../../../domain/survivor';

interface ISurvivorsAdapter {
    addSurvivor(survivor: ISurvivor): Promise<ISurvivor>;

    getSurvivor(survivorId: string): Promise<ISurvivor | undefined>;

    deleteSurvivor(survivorId: string): Promise<void>;
}

export default ISurvivorsAdapter;

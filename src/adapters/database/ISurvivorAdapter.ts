import { ISurvivor, ISurvivorInfected } from '../../domain';

export interface ISurvivorsAdapter {
    addSurvivor(survivor: ISurvivor): Promise<ISurvivor>;

    getSurvivor(survivorId: string): Promise<ISurvivor | undefined>;

    deleteSurvivor(survivorId: string): Promise<void>;

    reportSurvivorHasInfected(
        survivorInfected: ISurvivor,
        reporterSurvivor: ISurvivor): Promise<ISurvivorInfected[]>;

    getAllInfectionReportsFromASurvivor(
        referentSurvivor: ISurvivor): Promise<ISurvivorInfected[]>

    updateSurvivor(Survivor: ISurvivor): Promise<ISurvivor>
}

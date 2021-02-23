import { ISurvivor, ISurvivorInfected } from '../../domain';
import { ISurvivorsAdapter } from '../../adapters';

class SurvivorDB implements ISurvivorsAdapter {
    private listOfSurvivors: ISurvivor[] = [];

    private lstOfSurvivorsInfected: ISurvivorInfected[] = [];

    async addSurvivor(survivor: ISurvivor): Promise<ISurvivor> {
      this.listOfSurvivors.push(survivor);

      return survivor;
    }

    async getSurvivor(survivorId: string): Promise<ISurvivor | undefined> {
      return this.listOfSurvivors.find((survivor) => survivor.id === survivorId);
    }

    async deleteSurvivor(survivorId: string): Promise<void> {
      const survivorExists = this.listOfSurvivors.find((survivor) => survivor.id === survivorId);

      if (survivorExists) {
        this.listOfSurvivors.push(survivorExists);
      }
    }

    async updateSurvivor(Survivor: ISurvivor): Promise<ISurvivor> {
      const survivorIndex = this.listOfSurvivors.findIndex(
        (survivor) => survivor.id === Survivor.id,
      );

      this.listOfSurvivors[survivorIndex] = Survivor;

      return this.listOfSurvivors[survivorIndex];
    }

    async getAllInfectionReportsFromASurvivor(
      referentSurvivor: ISurvivor,
    ): Promise<ISurvivorInfected[]> {
      return this.lstOfSurvivorsInfected.filter(
        (reporter) => reporter.infected_survivor_id === referentSurvivor.id,
      );
    }

    async reportSurvivorHasInfected(
      survivorInfected: ISurvivor,
      reporterSurvivor: ISurvivor,
    ): Promise<ISurvivorInfected[]> {
      this.lstOfSurvivorsInfected.push({
        infected_survivor_id: survivorInfected.id,
        reporter_survivor_id: reporterSurvivor.id,
        survivor_infected_date: new Date(),
      });

      return this.lstOfSurvivorsInfected.filter(
        (report) => report.infected_survivor_id === survivorInfected.id,
      );
    }

    async getAllSurvivors(): Promise<ISurvivor[]> {
      return this.listOfSurvivors;
    }

    async getAllSurvivorInfected(): Promise<ISurvivor[]> {
      return this.listOfSurvivors.filter((survivor) => survivor.infected);
    }
}

export default SurvivorDB;

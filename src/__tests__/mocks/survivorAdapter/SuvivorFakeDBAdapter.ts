import { ISurvivor } from '../../../domain';
import ISurvivorAdapter from '../../../adpters/database/ISurvivorAdapter';

class SurvivorDB implements ISurvivorAdapter {
    private listOfSurvivors: ISurvivor[] = [];

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
}

export default SurvivorDB;

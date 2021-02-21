import { ISurvivor } from '../../domain';
import { ISurvivorsAdapter } from '../../adpters';

class SurvivorDB implements ISurvivorsAdapter {
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

    async updateSurvivor(Survivor: ISurvivor): Promise<ISurvivor> {
      const survivorIndex = this.listOfSurvivors.findIndex(
        (survivor) => survivor.id === Survivor.id,
      );

      this.listOfSurvivors[survivorIndex] = Survivor;

      return this.listOfSurvivors[survivorIndex];
    }
}

export default SurvivorDB;

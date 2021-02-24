import { GetAllInformationsOfSurvivor, ISurvivor } from '../domain';
import { ISurvivorsAdapter } from '../adapters';
import DomainErro from '../usecases/validations/DomainErro';

class GetAllInformationsOfSurvivorService implements GetAllInformationsOfSurvivor {
  constructor(
    private survivorsAdapter: ISurvivorsAdapter,
  ) {

  }

  async execute(survivor_id: string): Promise<ISurvivor> {
    try {
      const validSurvivor = await this.survivorsAdapter
        .getSurvivorsWithTheirCompleteInventory(survivor_id);

      if (!validSurvivor) {
        throw new DomainErro('Survivor not exists!');
      }

      if (validSurvivor.infected) {
        throw new DomainErro('Infected survivor, your items are inaccessible!');
      }

      return validSurvivor;
    } catch (error) {
      throw new DomainErro(`Invalid information ${error.message}!`);
    }
  }
}

export default GetAllInformationsOfSurvivorService;

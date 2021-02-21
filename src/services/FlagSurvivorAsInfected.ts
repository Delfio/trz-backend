import { FlagSurvivorAsInfected, ISurvivor } from '../domain';
import { ISurvivorsAdapter } from '../adpters';

// TODO -- add socket notify
// TODO -- add list of lost items.

class FlagSurvivorAsInfectedService implements FlagSurvivorAsInfected {
  constructor(private survivorsAdapter: ISurvivorsAdapter) {}

  async execute(survivor_id: string): Promise<ISurvivor> {
    const survivorExists = await this.survivorsAdapter.getSurvivor(survivor_id);

    if (!survivorExists) {
      throw new Error('Survivor dont exist!');
    }

    survivorExists.infected = true;

    return this.survivorsAdapter.updateSurvivor(survivorExists);
  }
}

export default FlagSurvivorAsInfectedService;

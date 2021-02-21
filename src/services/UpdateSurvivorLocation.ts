import { UpdateSurvivorLocation, ISurvivor, coords_of_survivor } from '../domain';
import { ISurvivorsAdapter } from '../adapters';
import DomainError from '../usecases/validations/DomainErro';

class UpdateSurvivorLocationService implements UpdateSurvivorLocation {
  constructor(private survivorsAdapter: ISurvivorsAdapter) {}

  async execute(survivor_id: string, new_coords: coords_of_survivor): Promise<ISurvivor> {
    const survivorExists = await this.survivorsAdapter.getSurvivor(survivor_id);

    if (!survivorExists) {
      throw new DomainError('Survivor dont exists!');
    }

    survivorExists.lastLocation = new_coords;

    return this.survivorsAdapter.updateSurvivor(survivorExists);
  }
}

export default UpdateSurvivorLocationService;

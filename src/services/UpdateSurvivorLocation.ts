import { UpdateSurvivorLocation, ISurvivor } from '../domain';
import { ISurvivorsAdapter } from '../adapters';
import DomainError from '../usecases/validations/DomainErro';

type coords_of_survivor = {
    latitude: number;
    longitude: number
}

class UpdateSurvivorLocationService implements UpdateSurvivorLocation {
  constructor(private survivorsAdapter: ISurvivorsAdapter) {}

  async execute(survivor_id: string, new_coords: coords_of_survivor): Promise<ISurvivor> {
    try {
      const survivorExists = await this.survivorsAdapter.getSurvivor(survivor_id);

      if (!survivorExists) {
        throw new DomainError('Survivor dont exists!');
      }

      survivorExists.latitude = new_coords.latitude;
      survivorExists.longitude = new_coords.longitude;

      return this.survivorsAdapter.updateSurvivor(survivorExists);
    } catch (error) {
      throw new DomainError(`Invalid Information ${error.message}!`);
    }
  }
}

export default UpdateSurvivorLocationService;

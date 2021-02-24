import { UpdateSurvivorLocation, ISurvivor, UpdateSurvivorLocationDTO } from '../domain';
import { ISurvivorsAdapter } from '../adapters';
import DomainError from '../usecases/validations/DomainErro';

class UpdateSurvivorLocationService implements UpdateSurvivorLocation {
  constructor(private survivorsAdapter: ISurvivorsAdapter) {}

  async execute(new_coords: UpdateSurvivorLocationDTO): Promise<ISurvivor> {
    try {
      const { latitude, longitude, survivor_id } = new_coords;
      const survivorExists = await this.survivorsAdapter.getSurvivor(survivor_id);

      if (!survivorExists) {
        throw new DomainError('Survivor dont exists!');
      }

      survivorExists.latitude = latitude;
      survivorExists.longitude = longitude;

      return this.survivorsAdapter.updateSurvivor(survivorExists);
    } catch (error) {
      throw new DomainError(`Invalid Information ${error.message}!`);
    }
  }
}

export default UpdateSurvivorLocationService;

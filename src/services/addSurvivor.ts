import { AddSurvivor, ISurvivor, SurvivorDTO } from '../domain/survivor';
import ISurvivorAdapter from '../adpters/database/survivor/ISurvivorAdapter';

class AddSurvivorService implements AddSurvivor {
  constructor(private survivorAdapter: ISurvivorAdapter) {}

  async execute(data: SurvivorDTO): Promise<ISurvivor> {
    return this.survivorAdapter.addSurvivor({
      ...data,
      id: String(Math.random()),
      infected: false,
      inventory_id: 1,
    });
  }
}

export default AddSurvivorService;

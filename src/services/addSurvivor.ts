import { AddSurvivor, ISurvivor, SurvivorDTO } from '../domain';
import { ISurvivorsAdapter } from '../adpters/database';

class AddSurvivorService implements AddSurvivor {
  constructor(private survivorAdapter: ISurvivorsAdapter) {}

  async execute(data: SurvivorDTO): Promise<ISurvivor> {
    return this.survivorAdapter.addSurvivor({
      ...data,
      id: String(Math.random()),
      infected: false,
    });
  }
}

export default AddSurvivorService;

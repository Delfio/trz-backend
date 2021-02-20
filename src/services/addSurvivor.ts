import { AddSurvivor, ISurvivor, SurvivorDTO } from '../domain/survivor';

class AddSurvivorService implements AddSurvivor {
  async execute(data: SurvivorDTO): Promise<ISurvivor> {
    return {
      ...data,
      id: String(Math.random()),
      infected: false,
      inventory_id: 1,
    };
  }
}

export default AddSurvivorService;

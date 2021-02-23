import { ISurvivorInfectedController } from '../adapters';
import { SurvivorInfectedController } from '../controllers';
import { SurvivorRepository } from '../../usecases/typeorm/repositories';

export default (): ISurvivorInfectedController => {
  const survivorRepository = new SurvivorRepository();

  return new SurvivorInfectedController(survivorRepository);
};

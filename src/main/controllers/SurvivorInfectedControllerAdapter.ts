import * as Yup from 'yup';
import { ISurvivor } from '../../domain';
import FlagSurvivorAsInfected from '../../services/FlagSurvivorAsInfected';
import AppError from '../usecase/MainErros';
import DomainErro from '../../usecases/validations/DomainErro';

import { ISurvivorInfectedController, IRegisterSurvivorInfected } from '../adapters/controllers/ISurvivorInfectedController';

export class SurvivorInfectedController extends ISurvivorInfectedController {
  async index(): Promise<ISurvivor[]> {
    return this.survivorsAdapter.getAllSurvivorInfected();
  }

  async store(data: IRegisterSurvivorInfected): Promise<void> {
    const schema = Yup.object().shape({
      survivor_infected: Yup.string().required(''),
      survivor_reported: Yup.string().required(''),
    });
    try {
      await schema.isValid(data);

      const flagSurvivorAsInfected = new FlagSurvivorAsInfected(
        this.survivorsAdapter,
      );

      await flagSurvivorAsInfected
        .execute(data.survivor_reported, data.survivor_infected);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        throw new AppError(`check the registration information ${error}`, 403);
      }

      if (error instanceof DomainErro) {
        throw new AppError(error.message, 406);
      }

      throw error;
    }
  }

  async show(survivor_id: string): Promise<ISurvivor | undefined> {
    const survivor = await this.survivorsAdapter.getSurvivor(survivor_id);

    return survivor?.infected ? survivor : undefined;
  }
}

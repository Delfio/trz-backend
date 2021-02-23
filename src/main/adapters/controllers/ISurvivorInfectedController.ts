import { ISurvivor } from '../../../domain';
import { ISurvivorsAdapter } from '../../../adapters';

export type IRegisterSurvivorInfected = {
    survivor_infected: string;
    survivor_reported: string;
}

export abstract class ISurvivorInfectedController {
  constructor(
        protected survivorsAdapter: ISurvivorsAdapter,
  ) {}

  abstract index(): Promise<ISurvivor[]>;

  abstract store(data: IRegisterSurvivorInfected): Promise<void>

  abstract show(survivor_id: string): Promise<ISurvivor | undefined>
}

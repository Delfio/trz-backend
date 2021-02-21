import { FlagSurvivorAsInfected, ISurvivor } from '../domain';
import { ISurvivorsAdapter } from '../adapters';
import DomainError from '../usecases/validations/DomainErro';

// TODO -- add socket notify
// TODO -- add list of lost items.

class FlagSurvivorAsInfectedService implements FlagSurvivorAsInfected {
  constructor(private survivorsAdapter: ISurvivorsAdapter) {}

  async execute(reporter_survivor_id: string, infected_survivor_id: string): Promise<ISurvivor> {
    const [reporterSurvivor, infectedSurvivor] = await Promise.all([
      this.survivorsAdapter.getSurvivor(reporter_survivor_id),
      this.survivorsAdapter.getSurvivor(infected_survivor_id),
    ]);

    if (!reporterSurvivor || !infectedSurvivor) {
      throw new DomainError('Survivor dont exist!');
    }

    if (infectedSurvivor.infected) {
      throw new DomainError('Referent survivor is already infected!');
    }

    // Extra rules
    if (reporterSurvivor.infected) {
      throw new DomainError('An infected survivor cannot report another survivor! Leave us alone!');
    }

    const totalOfReports = await this.survivorsAdapter
      .reportSurvivorHasInfected(infectedSurvivor, reporterSurvivor);

    if (totalOfReports.length >= 5) {
      infectedSurvivor.infected = true;
    }

    return this.survivorsAdapter.updateSurvivor(infectedSurvivor);
  }
}

export default FlagSurvivorAsInfectedService;

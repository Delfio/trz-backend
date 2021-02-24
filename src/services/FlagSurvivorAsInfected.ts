import { SimpleConsoleLogger } from 'typeorm';
import { FlagSurvivorAsInfected, ISurvivor } from '../domain';
import { ISurvivorsAdapter } from '../adapters';
import DomainError from '../usecases/validations/DomainErro';

// TODO -- add socket notify
// TODO -- add list of lost items.

class FlagSurvivorAsInfectedService implements FlagSurvivorAsInfected {
  constructor(private survivorsAdapter: ISurvivorsAdapter) {}

  async execute(reporter_survivor_id: string, infected_survivor_id: string): Promise<ISurvivor> {
    try {
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

      if (reporterSurvivor.infected) {
        throw new DomainError('An infected survivor cannot report another survivor! Leave us alone!');
      }

      let totalOfReports = await this.survivorsAdapter
        .getAllInfectionReportsFromASurvivor(infectedSurvivor);

      const allItemsOfRepot = await Promise.all(
        totalOfReports.map((report) => report.reporter_survivor_id),
      );

      const isRepeatedReporting = allItemsOfRepot
        .find((survivor_id) => survivor_id === reporter_survivor_id);

      if (isRepeatedReporting) {
        throw new DomainError('previously computerized report!');
      }

      totalOfReports = await this.survivorsAdapter
        .reportSurvivorHasInfected(infectedSurvivor, reporterSurvivor);

      if (totalOfReports.length >= 5) {
        infectedSurvivor.infected = true;
        delete infectedSurvivor.suvivor_inventory;

        return this.survivorsAdapter.updateSurvivor(infectedSurvivor);
      }

      return reporterSurvivor;
    } catch (error) {
      throw new DomainError(error.message);
    }
  }
}

export default FlagSurvivorAsInfectedService;

import { getRepository, Repository } from 'typeorm';
import { ISurvivor, ISurvivorInfected } from '../../../domain';
import { ISurvivorsAdapter } from '../../../adapters';
import { SurvivorEntity, SurvivorInfectedEntity } from '../entities';

export class SurvivorRepository implements ISurvivorsAdapter {
    private survivorRepository: Repository<SurvivorEntity>;

    private survivorInfectedRepository: Repository<SurvivorInfectedEntity>;

    constructor() {
      this.survivorRepository = getRepository(SurvivorEntity);
      this.survivorInfectedRepository = getRepository(SurvivorInfectedEntity);
    }

    async addSurvivor(survivor: ISurvivor): Promise<ISurvivor> {
      const newSurvivorRegistered = this.survivorRepository.create(survivor);
      return this.survivorRepository.save(newSurvivorRegistered);
    }

    async getAllSurvivors(): Promise<ISurvivor[]> {
      return this.survivorRepository.find();
    }

    async getSurvivor(survivorId: string): Promise<ISurvivor | undefined> {
      return this.survivorRepository.findOne(survivorId);
    }

    async getSurvivorsWithTheirCompleteInventory(
      survivorId: string,
    ): Promise<ISurvivor | undefined> {
      return this.survivorRepository.findOne(survivorId, {
        relations: ['suvivor_inventory'],
      });
    }

    async deleteSurvivor(survivorId: string): Promise<void> {
      await this.survivorRepository.delete(survivorId);
    }

    async reportSurvivorHasInfected(
      survivorInfected: ISurvivor,
      reporterSurvivor: ISurvivor,
    ): Promise<ISurvivorInfected[]> {
      const newReport = this.survivorInfectedRepository.create({
        infected_survivor_id: survivorInfected.id,
        reporter_survivor_id: reporterSurvivor.id,
      });

      await this.survivorInfectedRepository.save(newReport);

      return this.survivorInfectedRepository.find({
        where: {
          infected_survivor_id: survivorInfected.id,
        },
      });
    }

    async getAllInfectionReportsFromASurvivor(
      referentSurvivor: ISurvivor,
    ): Promise<ISurvivorInfected[]> {
      return this.survivorInfectedRepository.find({
        where: {
          infected_survivor_id: referentSurvivor.id,
        },
        relations: ['infected_survivor_id'],
      });
    }

    async updateSurvivor(Survivor: ISurvivor): Promise<ISurvivor> {
      return this.survivorRepository.save(Survivor);
    }

    async getAllSurvivorInfected(): Promise<ISurvivor[]> {
      return this.survivorRepository.find({
        where: {
          infected: true,
        },
      });
    }
}

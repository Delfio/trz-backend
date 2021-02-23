import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';

import { ISurvivorInfected } from '../../../domain';

@Entity('tbl_survivor_infected')
export class SurvivorInfectedEntity implements ISurvivorInfected {
    @PrimaryColumn('uuid')
    infected_survivor_id!: string;

    @PrimaryColumn('uuid')
    reporter_survivor_id!: string;

    @Column('date')
    survivor_infected_date: Date;

    constructor() {
      this.survivor_infected_date = new Date();
    }
}

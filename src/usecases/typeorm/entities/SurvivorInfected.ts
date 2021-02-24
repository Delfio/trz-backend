import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ISurvivorInfected } from '../../../domain';
import { SurvivorEntity } from './SurvivorEntity';

@Entity('tbl_survivor_infected')
export class SurvivorInfectedEntity implements ISurvivorInfected {
    @OneToOne(() => SurvivorEntity, { lazy: true })
    @JoinColumn({ name: 'infected_survivor_id' })
    @PrimaryColumn('uuid')
    infected_survivor_id!: string;

    @OneToOne(() => SurvivorEntity, { lazy: true })
    @JoinColumn({ name: 'reporter_survivor_id' })
    @PrimaryColumn('uuid')
    reporter_survivor_id!: string;

    @Column('date')
    survivor_infected_date: Date;

    constructor() {
      this.survivor_infected_date = new Date();
    }
}

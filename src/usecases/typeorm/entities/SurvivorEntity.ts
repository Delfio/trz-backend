import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';

import { ISurvivor } from '../../../domain';

@Entity('tbl_survivor')
export class SurvivorEntity implements ISurvivor {
    @PrimaryColumn('uuid')
    id!: string;

    @Column('varchar')
    name!: string;

    @Column('integer')
    age!: number;

    @Column('boolean')
    infected!: boolean;

    @Column('real')
    latitude!: number;

    @Column('real')
    longitude!: number;
}

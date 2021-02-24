import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';

import { ISurvivor } from '../../../domain';

import { SurvivorInventoryEntity } from './SurvivorInventory';

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

    @OneToMany(() => SurvivorInventoryEntity,
      (survivorInventoryEntity) => survivorInventoryEntity.survivor_id, {
        lazy: true,
        persistence: false,
      })
    @JoinTable({ name: 'inventory' })
    suvivor_inventory!: SurvivorInventoryEntity[]
}

import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { ItemEntity } from './ItemsEntity';
import { IInventory } from '../../../domain';
import { SurvivorEntity } from './SurvivorEntity';

@Entity('tbl_survivor_inventory')
export class SurvivorInventoryEntity implements IInventory {
    @PrimaryColumn('uuid')
    item_id!: string

    @OneToOne(() => SurvivorEntity, { lazy: true, persistence: false })
    @JoinColumn({ name: 'survivor_id' })
    @PrimaryColumn('uuid')
    survivor_id!: string

    @Column('integer')
    amount!: number;

    @OneToOne(() => ItemEntity, { eager: true, persistence: false })
    @JoinColumn({ name: 'item_id' })
    item!: ItemEntity
}

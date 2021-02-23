import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { ItemEntity } from './ItemsEntity';
import { IInventory } from '../../../domain';

@Entity('tbl_survivor_inventory')
export class SurvivorInventoryEntity implements IInventory {
    @PrimaryColumn('uuid')
    item_id!: string

    @PrimaryColumn('uuid')
    survivor_id!: string

    @Column('integer')
    amount!: number;

    @OneToOne(() => ItemEntity, { eager: true })
    @JoinColumn({ name: 'item_id' })
    item!: ItemEntity
}

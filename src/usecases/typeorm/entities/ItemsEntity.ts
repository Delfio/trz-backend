import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';

import { IItem } from '../../../domain';

  @Entity('tbl_item')
export class ItemEntity implements IItem {
    @PrimaryColumn('uuid')
    item_id!: string;

    @Column('integer')
    item_amount_total!: number;

    @Column('varchar', { length: 250 })
    item_description!: string;

    @Column('integer')
    item_points!: number
}

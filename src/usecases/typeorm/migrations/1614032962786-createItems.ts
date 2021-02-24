import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import getInitialItems from '../../../utils/getInitialItems.js';

export default class createItems1614032962786 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_item',
        columns: [
          {
            name: 'item_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'item_description',
            type: 'varchar',
            length: '250',
            isNullable: true,
          },
          {
            name: 'item_points',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'item_amount_total',
            type: 'integer',
            isNullable: false,
          },
        ],
      }),
    );

    const allItens = await getInitialItems();
    await queryRunner.query(allItens);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_item');
  }
}

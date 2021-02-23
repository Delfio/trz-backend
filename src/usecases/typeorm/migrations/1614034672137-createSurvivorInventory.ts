import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createSurvivorInventory1614034672137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_survivor_inventory',
        columns: [
          {
            name: 'survivor_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'item_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'survivor_inventory_amount',
            type: 'integer',
            default: 0,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_SURVIVOR',
            referencedTableName: 'tbl_survivor',
            referencedColumnNames: ['id'],
            columnNames: ['survivor_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_ITEM',
            referencedTableName: 'tbl_item',
            referencedColumnNames: ['item_id'],
            columnNames: ['item_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_survivor_inventory');
  }
}

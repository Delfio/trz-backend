import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class
addingColumnToCountTheTotalItemsInTheSurvivorInventory1614051065578 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('tbl_survivor_inventory',
      new TableColumn({
        name: 'amount',
        type: 'integer',
      }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tbl_survivor_inventory', 'amount');
  }
}

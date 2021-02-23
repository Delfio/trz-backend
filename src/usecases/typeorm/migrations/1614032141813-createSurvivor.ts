import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createSurvivor1614032141813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_survivor',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'age',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'latitude',
            type: 'real',
            isNullable: false,
          },
          {
            name: 'longitude',
            type: 'real',
            isNullable: false,
          },
          {
            name: 'infected',
            type: 'boolean',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_survivor');
  }
}

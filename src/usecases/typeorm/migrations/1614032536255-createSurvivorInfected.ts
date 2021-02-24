import {
  MigrationInterface, QueryRunner, Table,
} from 'typeorm';

export default class createSurvivorInfected1614032536255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_survivor_infected',
        columns: [
          {
            name: 'infected_survivor_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'reporter_survivor_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'survivor_infected_date',
            type: 'date',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_SURVIVOR_INFECTED',
            referencedTableName: 'tbl_survivor',
            referencedColumnNames: ['id'],
            columnNames: ['infected_survivor_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_SURVIVOR_REPORTED',
            referencedTableName: 'tbl_survivor',
            referencedColumnNames: ['id'],
            columnNames: ['reporter_survivor_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_survivor_infected');
  }
}

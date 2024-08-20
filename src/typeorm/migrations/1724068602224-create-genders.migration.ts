import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { GENDER_TABLE, GENDER_TABLE_INDEXED_COLUMNS } from '../constants/genders.constant';
import base from './base.migration';

export class CreateGendersMigration1724068602224 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: GENDER_TABLE,
				indices: [{ columnNames: GENDER_TABLE_INDEXED_COLUMNS, name: 'idx_name' }],
				columns: base.concat([{ name: 'name', type: 'varchar' }]),
			}),
			true,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(GENDER_TABLE);
	}
}

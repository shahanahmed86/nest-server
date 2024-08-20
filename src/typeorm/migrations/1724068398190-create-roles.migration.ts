import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ROLE_TABLE, ROLE_TABLE_INDEXED_COLUMNS } from '../constants/roles.constant';
import base from './base.migration';

export class CreateRoleMigration1724068398190 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: ROLE_TABLE,
				indices: [{ columnNames: ROLE_TABLE_INDEXED_COLUMNS, name: 'idx_name' }],
				columns: base.concat([{ name: 'name', type: 'varchar' }]),
			}),
			true,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(ROLE_TABLE);
	}
}

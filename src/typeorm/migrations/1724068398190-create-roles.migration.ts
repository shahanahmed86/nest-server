import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ROLES_TABLE, ROLES_TABLE_INDEXED_COLUMNS } from '../constants/roles.constant';
import base from './base.migration';

export class CreateRoleMigration1724068398190 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: ROLES_TABLE,
				indices: [
					{
						columnNames: ROLES_TABLE_INDEXED_COLUMNS.columns,
						name: ROLES_TABLE_INDEXED_COLUMNS.name,
					},
				],
				columns: base.concat([{ name: 'name', type: 'varchar' }]),
			}),
			true,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(ROLES_TABLE);
	}
}

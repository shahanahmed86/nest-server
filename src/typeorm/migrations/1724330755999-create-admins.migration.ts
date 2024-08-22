import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ADMINS_TABLE, ADMINS_TABLE_INDEXED_COLUMNS } from '../constants/admins.constant';
import base from './base.migration';

export class CreateAdminsMigration1724330755999 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: ADMINS_TABLE,
				indices: [
					{
						columnNames: ADMINS_TABLE_INDEXED_COLUMNS.columns,
						name: ADMINS_TABLE_INDEXED_COLUMNS.name,
					},
				],
				columns: base.concat([
					{
						name: 'email',
						type: 'varchar',
					},
					{
						name: 'password',
						type: 'varchar',
					},
					{
						name: 'super',
						type: 'boolean',
						default: false,
					},
					{
						name: 'roleId',
						type: 'varchar',
						generationStrategy: 'uuid',
					},
					{
						name: 'genderId',
						type: 'varchar',
						generationStrategy: 'uuid',
					},
				]),
			}),
			true,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(ADMINS_TABLE);
	}
}

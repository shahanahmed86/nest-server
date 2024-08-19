import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { USER_TABLE, USER_TABLE_INDEXED_COLUMNS } from '../constants/users.constant';
import base from './base.migration';

export class CreateUserMigration1724067310118 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: USER_TABLE,
				indices: [
					{
						columnNames: USER_TABLE_INDEXED_COLUMNS,
						name: 'idx_email_phone_firstName_last_name',
						isFulltext: true,
					},
				],
				columns: base.concat([
					{
						name: 'firstName',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'lastName',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'avatar',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'email',
						type: 'varchar',
					},
					{
						name: 'password',
						type: 'varchar',
					},
					{
						name: 'emailVerified',
						type: 'boolean',
						default: false,
					},
					{
						name: 'phone',
						type: 'varchar',
					},
					{
						name: 'phoneVerified',
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
		await queryRunner.dropTable(USER_TABLE);
	}
}

import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ADMINS_ROLES_FOREIGN_KEY, ADMINS_TABLE } from '../constants/admins.constant';
import { ROLES_TABLE } from '../constants/roles.constant';

export class AddRolesToAdminsMigration1724334224588 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			ADMINS_TABLE,
			new TableForeignKey({
				columnNames: ['roleId'],
				referencedColumnNames: ['id'],
				referencedTableName: ROLES_TABLE,
				name: ADMINS_ROLES_FOREIGN_KEY,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(ADMINS_TABLE, ADMINS_ROLES_FOREIGN_KEY);
	}
}

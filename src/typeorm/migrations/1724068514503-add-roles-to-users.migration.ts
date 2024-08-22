import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ROLES_TABLE } from '../constants/roles.constant';
import { USERS_ROLES_FOREIGN_KEY, USERS_TABLE } from '../constants/users.constant';

export class AddRolesToUsersMigration1724068514503 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			USERS_TABLE,
			new TableForeignKey({
				columnNames: ['roleId'],
				referencedColumnNames: ['id'],
				referencedTableName: ROLES_TABLE,
				name: USERS_ROLES_FOREIGN_KEY,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(USERS_TABLE, USERS_ROLES_FOREIGN_KEY);
	}
}

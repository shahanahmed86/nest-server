import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ROLES_TABLE } from '../constants/roles.constant';
import { USERS_TABLE } from '../constants/users.constant';

const FOREIGN_KEY = 'fk_role_id';

export class AddRolesToUsersMigration1724068514503 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			USERS_TABLE,
			new TableForeignKey({
				columnNames: ['roleId'],
				referencedColumnNames: ['id'],
				referencedTableName: ROLES_TABLE,
				name: FOREIGN_KEY,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(USERS_TABLE, FOREIGN_KEY);
	}
}

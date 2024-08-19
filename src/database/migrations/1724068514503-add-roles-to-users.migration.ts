import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ROLE_TABLE } from '../constants/roles.constant';
import { USER_TABLE } from '../constants/users.constant';

const FOREIGN_KEY = 'fk_role_id';

export class AddRolesToUsersMigration1724068514503 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			USER_TABLE,
			new TableForeignKey({
				columnNames: ['roleId'],
				referencedColumnNames: ['id'],
				referencedTableName: ROLE_TABLE,
				name: FOREIGN_KEY,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(USER_TABLE, FOREIGN_KEY);
	}
}

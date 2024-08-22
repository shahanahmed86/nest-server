import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { GENDERS_TABLE } from '../constants/genders.constant';
import { USERS_GENDERS_FOREIGN_KEY, USERS_TABLE } from '../constants/users.constant';

export class AddGendersToUsersMigration1724069641825 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			USERS_TABLE,
			new TableForeignKey({
				columnNames: ['genderId'],
				referencedColumnNames: ['id'],
				referencedTableName: GENDERS_TABLE,
				name: USERS_GENDERS_FOREIGN_KEY,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(USERS_TABLE, USERS_GENDERS_FOREIGN_KEY);
	}
}

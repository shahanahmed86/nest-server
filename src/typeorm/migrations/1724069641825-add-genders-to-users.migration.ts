import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { GENDERS_TABLE } from '../constants/genders.constant';
import { USERS_TABLE } from '../constants/users.constant';

const FOREIGN_KEY = 'fk_gender_id';

export class AddGendersToUsersMigration1724069641825 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			USERS_TABLE,
			new TableForeignKey({
				columnNames: ['genderId'],
				referencedColumnNames: ['id'],
				referencedTableName: GENDERS_TABLE,
				name: FOREIGN_KEY,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(USERS_TABLE, FOREIGN_KEY);
	}
}

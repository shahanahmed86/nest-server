import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { GENDER_TABLE } from '../constants/genders.constant';
import { USER_TABLE } from '../constants/users.constant';

const FOREIGN_KEY = 'fk_gender_id';

export class AddGendersToUsersMigration1724069641825 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			USER_TABLE,
			new TableForeignKey({
				columnNames: ['genderId'],
				referencedColumnNames: ['id'],
				referencedTableName: GENDER_TABLE,
				name: FOREIGN_KEY,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(USER_TABLE, FOREIGN_KEY);
	}
}

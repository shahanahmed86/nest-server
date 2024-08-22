import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ADMINS_GENDERS_FOREIGN_KEY, ADMINS_TABLE } from '../constants/admins.constant';
import { GENDERS_TABLE } from '../constants/genders.constant';

export class AddGendersToAdminsMigration1724332870951 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			ADMINS_TABLE,
			new TableForeignKey({
				columnNames: ['genderId'],
				referencedColumnNames: ['id'],
				referencedTableName: GENDERS_TABLE,
				name: ADMINS_GENDERS_FOREIGN_KEY,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(ADMINS_TABLE, ADMINS_GENDERS_FOREIGN_KEY);
	}
}

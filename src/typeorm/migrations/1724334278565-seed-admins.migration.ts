import { MigrationInterface, QueryRunner } from 'typeorm';
import { ADMINS_DATA, ADMINS_TABLE } from '../constants/admins.constant';
import { Admins } from '../entities/admins.entity';

export class SeedAdminsMigration1724334278565 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Admins, ADMINS_TABLE)
			.insert()
			.values(ADMINS_DATA)
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Admins, ADMINS_TABLE)
			.delete()
			.where('id IS NOT NULL')
			.execute();
	}
}

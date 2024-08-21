import { MigrationInterface, QueryRunner } from 'typeorm';
import { GENDERS_DATA, GENDERS_TABLE } from '../constants/genders.constant';
import { Genders } from '../entities/genders.entity';

export class SeedGendersMigration1724069641822 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Genders, GENDERS_TABLE)
			.insert()
			.values(GENDERS_DATA)
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Genders, GENDERS_TABLE)
			.delete()
			.where('id IS NOT NULL')
			.execute();
	}
}

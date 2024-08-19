import { MigrationInterface, QueryRunner } from 'typeorm';
import { GENDER_DATA, GENDER_TABLE } from '../constants/genders.constant';
import { Gender } from '../entities/genders.entity';

export class SeedGendersMigration1724069641822 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Gender, GENDER_TABLE)
			.insert()
			.values(GENDER_DATA)
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Gender, GENDER_TABLE)
			.delete()
			.where('id IS NOT NULL')
			.execute();
	}
}

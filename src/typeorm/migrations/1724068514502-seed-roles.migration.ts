import { MigrationInterface, QueryRunner } from 'typeorm';
import { ROLE_DATA, ROLE_TABLE } from '../constants/roles.constant';
import { Role } from '../entities/roles.entity';

export class SeedRolesMigration1724068514502 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Role, ROLE_TABLE)
			.insert()
			.values(ROLE_DATA)
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Role, ROLE_TABLE)
			.delete()
			.where('id IS NOT NULL')
			.execute();
	}
}

import { MigrationInterface, QueryRunner } from 'typeorm';
import { ROLES_DATA, ROLES_TABLE } from '../constants/roles.constant';
import { Roles } from '../entities/roles.entity';

export class SeedRolesMigration1724068514502 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Roles, ROLES_TABLE)
			.insert()
			.values(ROLES_DATA)
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Roles, ROLES_TABLE)
			.delete()
			.where('id IS NOT NULL')
			.execute();
	}
}

import { Injectable } from '@nestjs/common';
import { ApiBaseResponse } from 'src/app.dto';
import { connectionSource } from '../';

@Injectable()
export class TransactionService {
	async withTransaction<T extends ApiBaseResponse>(callback: () => Promise<T>): Promise<T> {
		const queryRunner = connectionSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const result = await callback();

			await queryRunner.commitTransaction();

			return result;
		} catch (error) {
			await queryRunner.rollbackTransaction();

			throw error;
		} finally {
			await queryRunner.release();
		}
	}
}

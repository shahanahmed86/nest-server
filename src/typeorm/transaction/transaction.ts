import { Injectable } from '@nestjs/common';
import { ApiBaseResponse } from 'src/app.dto';
import { queryRunner } from '../';

@Injectable()
export class TransactionService {
	async withTransaction<T extends ApiBaseResponse>(callback: () => Promise<T>): Promise<T> {
		await queryRunner.startTransaction();
		try {
			const result = await callback();

			await queryRunner.commitTransaction();

			return result;
		} catch (error) {
			await queryRunner.rollbackTransaction();

			throw error;
		}
	}
}

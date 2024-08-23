import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction';

describe('Transaction', () => {
	let provider: TransactionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TransactionService],
		}).compile();

		provider = module.get<TransactionService>(TransactionService);
	});

	it('should be defined', () => {
		expect(provider).toBeDefined();
	});
});

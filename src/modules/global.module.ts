import { Global, Module } from '@nestjs/common';
import { TransactionService } from 'src/typeorm/transaction/transaction';

@Global()
@Module({
	providers: [TransactionService],
	exports: [TransactionService],
})
export class GlobalModuleTsModule {}

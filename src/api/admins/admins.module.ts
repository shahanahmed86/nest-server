import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		// all routes will be configured here
		RouterModule.register([{ path: 'auth', module: AuthModule }]),
		AuthModule,
	],
})
export class AdminsModule {}

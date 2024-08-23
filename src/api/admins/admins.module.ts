import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		// all routes will be configured here
		RouterModule.register([
			{
				path: 'api/admins',
				children: [{ path: 'v1/auth', module: AuthModule }],
			},
		]),
		AuthModule,
	],
})
export class AdminsModule {}

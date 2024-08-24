import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';

@Module({
	imports: [
		// all routes will be configured here
		RouterModule.register([
			{
				path: 'api/users',
				children: [{ path: 'v1/auth', module: AuthModule }],
			},
		]),
		AuthModule,
	],
})
export class UsersModule {}

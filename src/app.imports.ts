import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { GendersModule } from './api/genders/genders.module';
import { RolesModule } from './api/roles/roles.module';
import config from './config';
import redis from './library/redis.library';
import typeorm from './typeorm';

export const AllImports: ModuleMetadata['imports'] = [
	ConfigModule.forRoot({
		isGlobal: true,
		load: [config, typeorm, redis],
	}),
	RouterModule.register([
		{
			path: 'api',
			children: [
				{ path: 'v1/genders', module: GendersModule },
				{ path: 'v1/roles', module: RolesModule },
			],
		},
	]),
	GendersModule,
	RolesModule,
];

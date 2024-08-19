import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from 'src/env.validation';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly env: ConfigService<EnvVars, true>) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		const environment = this.env.get('NODE_ENV', { infer: true });
		const dialect = this.env.get('DB_DIALECT', { infer: true });
		return {
			type: dialect,
			host: this.env.get('DB_HOST', { infer: true }),
			port: this.env.get('DB_PORT', { infer: true }),
			username: this.env.get('DB_USER', { infer: true }),
			password: this.env.get('DB_PASS', { infer: true }),
			database: this.env.get('DB_NAME', { infer: true }),
			entities: [__dirname + '/**/*.entity.{ts,js}'],
			migrations: [__dirname + '/**/*.migration.{ts,js}'],
			migrationsRun: environment === 'production',
			synchronize: false,
			logging: true,
			logger: 'advanced-console',
			migrationsTransactionMode: 'each',
		};
	}
}

import { ConfigModuleOptions } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

type Environment = 'development' | 'production' | 'test';
const ENVIRONMENTS: Environment[] = ['development', 'production', 'test'];

type Protocol = 'http' | 'https';
const PROTOCOLS: Protocol[] = ['http', 'https'];

export class EnvVars {
	@IsEnum(ENVIRONMENTS)
	NODE_ENV: Environment;

	@IsNumber()
	APP_PORT: number;

	@IsEnum(PROTOCOLS)
	APP_PROTOCOL: Protocol;

	APP_HOST: string;

	@IsNumber()
	BCRYPT_SALT: number;

	@IsString()
	JWT_SECRET: string;

	@IsNumber()
	JWT_EXPIRY: number;

	@IsEnum(['mysql', 'mariadb'])
	DB_DIALECT: 'mysql' | 'mariadb';

	@IsString()
	DB_HOST: string;

	@IsNumber()
	DB_PORT: number;

	@IsString()
	DB_USER: string;

	@IsString()
	DB_PASS: string;

	@IsString()
	DB_NAME: string;

	@IsString()
	REDIS_HOST: string;

	@IsNumber()
	REDIS_PORT: number;

	@IsString()
	REDIS_PASSWORD: string;
}

export const configOptions: ConfigModuleOptions = {
	validate(config) {
		const validatedConfig = plainToInstance(EnvVars, config, {
			enableImplicitConversion: true,
		});
		const errors = validateSync(validatedConfig, { skipMissingProperties: false });

		if (errors.length) throw new Error(errors.toString());
		return validatedConfig;
	},
};

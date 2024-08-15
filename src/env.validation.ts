import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';

type Environment = 'development' | 'production' | 'test';
const ENVIRONMENTS: Environment[] = ['development', 'production', 'test'];

type Protocol = 'http' | 'https';
const PROTOCOLS: Protocol[] = ['http', 'https'];

class EnvVars {
	@IsEnum(ENVIRONMENTS)
	NODE_ENV: Environment;

	@IsNumber()
	APP_PORT: number;

	@IsEnum(PROTOCOLS)
	APP_PROTOCOL: Protocol;

	APP_HOST: string;

	@IsNumber()
	BCRYPT_SALT: number;

	JWT_SECRET: string;

	@IsNumber()
	JWT_EXPIRY: number;

	DB_HOST: string;

	@IsNumber()
	DB_PORT: number;

	DB_USER: string;

	DB_PASS: string;

	DB_NAME: string;

	REDIS_HOST: string;

	@IsNumber()
	REDIS_PORT: number;

	REDIS_PASSWORD: string;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvVars, config, {
		enableImplicitConversion: true,
	});
	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length) throw new Error(errors.toString());
	return validatedConfig;
}

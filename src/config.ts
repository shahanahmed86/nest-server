import { registerAs } from '@nestjs/config';
import 'dotenv/config';
import * as z from 'zod';

const Configs = z.object({
	app: z.object({
		env: z.enum(['development', 'test', 'production']).default('development'),
		protocol: z.enum(['http', 'https']).default('http'),
		host: z.string().default('localhost'),
		port: z
			.string()
			.length(4)
			.transform((arg) => parseInt(arg, 10))
			.default('7000'),
		url: z.string().url('Invalid Base URL').default('http://localhost'),
	}),
	jwt: z.object({
		secret: z.string().min(1).default('jwt-secret'),
		expiry: z
			.string()
			.min(1)
			.transform((arg) => parseInt(arg, 10))
			.default('36000000'),
	}),
	db: z.object({
		dialect: z.enum(['mysql', 'mariadb']).default('mysql'),
		host: z.string().min(1).default('db'),
		port: z
			.string()
			.length(4)
			.transform((arg) => parseInt(arg, 10))
			.default('5432'),
		username: z.string().min(1).default('admin'),
		password: z.string().min(1).default('thinktwice'),
		database: z.string().min(1).default('app'),
	}),
	bcrypt: z.object({
		salt: z
			.string()
			.min(2)
			.transform((arg) => parseInt(arg, 10))
			.default('10'),
		maxBytes: z
			.string()
			.min(2)
			.transform((arg) => parseInt(arg, 10))
			.default('72'),
	}),
	cache: z.object({
		host: z.string().min(1).default('cache'),
		port: z
			.string()
			.length(4)
			.transform((arg) => parseInt(arg, 10))
			.default('6379'),
		pass: z.string().min(1).default('thinktwice'),
		url: z.string().min(1).default('redis://:thinktwice@cache:6379'),
	}),
	admin: z.object({
		email: z.string().email().default('developer.shahan@gmail.com'),
		password: z.string().min(1).default('123Abc456'),
	}),
});

type Configs = z.infer<typeof Configs>;

const allEnvs = {
	app: {
		env: process.env.NODE_ENV,
		protocol: process.env.APP_PROTOCOL,
		host: process.env.APP_HOST,
		port: process.env.APP_PORT,
		get url() {
			return `${this.protocol}://${this.host}`;
		},
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		expiry: process.env.SESSION_LIFE,
	},
	db: {
		dialect: process.env.DB_DIALECT,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
	},
	bcrypt: {
		salt: process.env.BCRYPT_SALT,
		maxBytes: process.env.BCRYPT_MAX_BYTES,
	},
	cache: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		pass: process.env.REDIS_PASSWORD,
		get url() {
			return `redis://:${this.pass}@${this.host}:${this.port}`;
		},
	},
	admin: {
		email: process.env.APP_ADMIN.split('::')[0],
		password: process.env.APP_ADMIN.split('::')[1],
	},
};

export const configs = Configs.parse(allEnvs);
export default registerAs('config', () => configs);

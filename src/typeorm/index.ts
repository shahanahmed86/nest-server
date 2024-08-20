import { registerAs } from '@nestjs/config';
import { configs } from '../config';
import { DataSource, DataSourceOptions } from 'typeorm';

const { dialect, host, port, username, password, database } = configs.db;
const notInDev = configs.app.env !== 'development';

const typeormConfig: DataSourceOptions = {
	type: dialect,
	host,
	port,
	username,
	password,
	database,
	entities: [__dirname + '/**/*.entity.{ts,js}'],
	migrations: [__dirname + '/**/*.migration.{ts,js}'],
	migrationsRun: notInDev,
	migrationsTransactionMode: 'each',
	synchronize: false,
	logging: true,
	logger: 'advanced-console',
};

export const connectionSource = new DataSource(typeormConfig);
export default registerAs('typeorm', () => typeormConfig);

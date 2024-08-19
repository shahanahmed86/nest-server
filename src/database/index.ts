import { registerAs } from '@nestjs/config';
import { configs } from '../config';
import { DataSource, DataSourceOptions } from 'typeorm';

const { dialect, host, port, username, password, database } = configs.db;
const inProd = configs.app.env === 'production';

const typeormConfig: DataSourceOptions = {
	type: dialect,
	host,
	port,
	username,
	password,
	database,
	entities: [__dirname + '/**/*.entity.{ts,js}'],
	migrations: [__dirname + '/**/*.migration.{ts,js}'],
	migrationsRun: inProd,
	migrationsTransactionMode: 'each',
	synchronize: false,
	logging: true,
	logger: 'advanced-console',
};

export const connectionSource = new DataSource(typeormConfig);
export default registerAs('typeorm', () => typeormConfig);

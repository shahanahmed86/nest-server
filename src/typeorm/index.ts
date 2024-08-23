import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { configs } from '../config';

const { dialect, host, port, username, password, database } = configs.db;
const notInDev = configs.app.env !== 'development';

const typeormConfig: DataSourceOptions = {
	type: dialect,
	host,
	port,
	username,
	password,
	database,
	entities: [`${__dirname}/entities/*.entity.{ts,js}`],
	migrations: [`${__dirname}/migrations/*.migration.{ts,js}`],
	migrationsRun: notInDev,
	migrationsTransactionMode: 'each',
	synchronize: false,
	logging: true,
	logger: 'advanced-console',
};

export const connectionSource = new DataSource(typeormConfig);

export const queryRunner = connectionSource.createQueryRunner();

export default registerAs('typeorm', () => {
	connectionSource.initialize().then(() => {
		console.log('Data Source has been initialized!');
	});
	return typeormConfig;
});

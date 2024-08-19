import { TableColumnOptions } from 'typeorm';

const base: TableColumnOptions[] = [
	{
		name: 'id',
		type: 'varchar',
		isPrimary: true,
		isGenerated: true,
		generationStrategy: 'uuid',
	},
	{
		name: 'createdAt',
		type: 'timestamp',
		default: 'CURRENT_TIMESTAMP',
	},
	{
		name: 'updatedAt',
		type: 'timestamp',
		default: 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	},
	{
		name: 'deletedAt',
		type: 'timestamp',
		isNullable: true,
	},
];

export default base;

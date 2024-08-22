import { DeepPartial } from 'typeorm';
import { Roles } from '../entities/roles.entity';
import { IndexColumnsOptions } from 'src/types/common.type';

export const ROLES_TABLE = 'roles';

export const ROLES_TABLE_INDEXED_COLUMNS: IndexColumnsOptions<Roles> = {
	name: `idx_${ROLES_TABLE}_name`,
	columns: ['name'],
} as const;

export const ROLES_DATA: DeepPartial<Roles[]> = [
	{ id: '81e5a41a-771f-41aa-89cc-1bf8ea120b83', name: 'admin' },
	{ id: '6ab568da-c798-46a6-ac09-bf020ceb1bcf', name: 'user' },
];

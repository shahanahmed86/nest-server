import { DeepPartial } from 'typeorm';
import { Role } from '../entities/roles.entity';

export const ROLE_TABLE = 'roles';

export const ROLE_TABLE_INDEXED_COLUMNS: (keyof Role)[] = ['name'];

export const ROLE_DATA: DeepPartial<Role[]> = [
	{ id: '81e5a41a-771f-41aa-89cc-1bf8ea120b83', name: 'admin' },
	{ id: '6ab568da-c798-46a6-ac09-bf020ceb1bcf', name: 'user' },
];

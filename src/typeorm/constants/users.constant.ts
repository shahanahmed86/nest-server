import { Users } from '../entities/users.entity';

export const USERS_TABLE = 'users';

export const USERS_TABLE_INDEXED_COLUMNS: (keyof Users)[] = [
	'email',
	'phone',
	'firstName',
	'lastName',
];

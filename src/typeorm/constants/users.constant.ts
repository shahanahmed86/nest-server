import { User } from '../entities/users.entity';

export const USER_TABLE = 'users';

export const USER_TABLE_INDEXED_COLUMNS: (keyof User)[] = [
	'email',
	'phone',
	'firstName',
	'lastName',
];

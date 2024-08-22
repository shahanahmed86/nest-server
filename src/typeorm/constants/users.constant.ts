import { IndexColumnsOptions } from 'src/types/common.type';
import { Users } from '../entities/users.entity';
import { GENDERS_TABLE } from './genders.constant';
import { ROLES_TABLE } from './roles.constant';

export const USERS_TABLE = 'users';

export const USERS_TABLE_INDEXED_COLUMNS: IndexColumnsOptions<Users> = {
	name: `idx_${USERS_TABLE}_email_phone_firstName_last_name`,
	columns: ['email', 'phone', 'firstName', 'lastName'],
} as const;

export const USERS_GENDERS_FOREIGN_KEY = `fk_${USERS_TABLE}_${GENDERS_TABLE}_id`;
export const USERS_ROLES_FOREIGN_KEY = `fk_${USERS_TABLE}_${ROLES_TABLE}_id`;

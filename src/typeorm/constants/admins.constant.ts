import { DeepPartial } from 'typeorm';
import { configs } from '../../config';
import { hashSync } from '../../library/bcrypt.library';
import { Admins } from '../entities/admins.entity';
import { GENDERS_DATA, GENDERS_TABLE } from './genders.constant';
import { ROLES_DATA, ROLES_TABLE } from './roles.constant';
import { IndexColumnsOptions } from 'src/types/common.type';

export const ADMINS_TABLE = 'admins';

export const ADMINS_TABLE_INDEXED_COLUMNS: IndexColumnsOptions<Admins> = {
	name: `idx_${ADMINS_TABLE}_email`,
	columns: ['email'],
} as const;

export const ADMINS_GENDERS_FOREIGN_KEY = `fk_${ADMINS_TABLE}_${GENDERS_TABLE}_id`;
export const ADMINS_ROLES_FOREIGN_KEY = `fk_${ADMINS_TABLE}_${ROLES_TABLE}_id`;

export const ADMINS_DATA: DeepPartial<Admins> = {
	id: '06e5f424-043b-447b-be13-45e2894013f2',
	email: configs.admin.email,
	password: hashSync(configs.admin.password),
	roleId: ROLES_DATA[0].id,
	genderId: GENDERS_DATA[0].id,
	super: true,
};

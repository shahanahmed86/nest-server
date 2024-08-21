import { ROLES_TABLE } from 'src/typeorm/constants/roles.constant';
import { Roles } from '../typeorm/entities/roles.entity';
import BaseDao from './base.dao';

class RolesDao extends BaseDao<Roles> {
	constructor() {
		super(Roles, ROLES_TABLE);
	}
}

export default RolesDao;

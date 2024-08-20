import { ROLE_TABLE } from 'src/typeorm/constants/roles.constant';
import { Role } from '../typeorm/entities/roles.entity';
import BaseDao from './base.dao';

class RoleDao extends BaseDao<Role> {
	constructor() {
		super(Role, ROLE_TABLE);
	}
}

export default RoleDao;

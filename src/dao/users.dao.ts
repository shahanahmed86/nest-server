import { USERS_TABLE } from '../typeorm/constants/users.constant';
import { Users } from '../typeorm/entities/users.entity';
import BaseDao from './base.dao';

class UsersDao extends BaseDao<Users> {
	constructor() {
		super(Users, USERS_TABLE);
	}
}

export default UsersDao;

import { USER_TABLE } from '../typeorm/constants/users.constant';
import { User } from '../typeorm/entities/users.entity';
import BaseDao from './base.dao';

class UserDao extends BaseDao<User> {
	constructor() {
		super(User, USER_TABLE);
	}
}

export default UserDao;

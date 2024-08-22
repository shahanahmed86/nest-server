import { ADMINS_TABLE } from '../typeorm/constants/admins.constant';
import { Admins } from '../typeorm/entities/admins.entity';
import BaseDao from './base.dao';

class AdminsDao extends BaseDao<Admins> {
	constructor() {
		super(Admins, ADMINS_TABLE);
	}
}

export default AdminsDao;

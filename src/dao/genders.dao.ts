import { GENDER_TABLE } from 'src/typeorm/constants/genders.constant';
import { Gender } from '../typeorm/entities/genders.entity';
import BaseDao from './base.dao';

class GenderDao extends BaseDao<Gender> {
	constructor() {
		super(Gender, GENDER_TABLE);
	}
}

export default GenderDao;

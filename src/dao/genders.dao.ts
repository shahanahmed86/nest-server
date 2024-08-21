import { Injectable } from '@nestjs/common';
import { GENDERS_TABLE } from 'src/typeorm/constants/genders.constant';
import { Genders } from '../typeorm/entities/genders.entity';
import BaseDao from './base.dao';

@Injectable()
class GendersDao extends BaseDao<Genders> {
	constructor() {
		super(Genders, GENDERS_TABLE);
	}
}

export default GendersDao;

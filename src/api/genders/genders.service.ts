import { Injectable } from '@nestjs/common';
import GendersDao from 'src/dao/genders.dao';
import { PaginatedQuery } from 'src/validations/common.validation';
import { ILike } from 'typeorm';

@Injectable()
export class GendersService {
	constructor(private readonly dao: GendersDao) {}

	findAll(query: PaginatedQuery) {
		const where = query.search ? { name: ILike(`%${query.search}%`) } : {};
		return this.dao.findManyAndCount(where, { take: query.limit, skip: query.page });
	}
}

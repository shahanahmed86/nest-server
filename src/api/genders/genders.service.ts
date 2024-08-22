import { Injectable } from '@nestjs/common';
import { PaginatedDto } from 'src/app.dto';
import GendersDao from 'src/dao/genders.dao';
import { ILike } from 'typeorm';

@Injectable()
export class GendersService {
	constructor(private readonly dao: GendersDao) {}

	findAll(query: PaginatedDto) {
		const where = query.search ? { name: ILike(`%${query.search}%`) } : {};
		return this.dao.findManyAndCount(where, { take: query.limit, skip: query.page });
	}
}

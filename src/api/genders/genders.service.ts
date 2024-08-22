import { Injectable } from '@nestjs/common';
import { PaginatedDto } from 'src/app.dto';
import GendersDao from 'src/dao/genders.dao';
import { Genders } from 'src/typeorm/entities/genders.entity';
import { Paginated } from 'src/types/common.type';
import { ILike } from 'typeorm';

@Injectable()
export class GendersService {
	constructor(private readonly dao: GendersDao) {}

	findAll(query: PaginatedDto): Promise<Paginated<Genders>> {
		const where = query.search ? { name: ILike(`%${query.search}%`) } : {};
		return this.dao.findManyAndCount(where, { take: query.limit, skip: query.page });
	}

	findOne(id: string): Promise<Genders | null> {
		return this.dao.findOne({ id });
	}
}

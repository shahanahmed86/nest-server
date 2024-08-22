import { Injectable } from '@nestjs/common';
import { PaginatedDto } from 'src/app.dto';
import RolesDao from 'src/dao/roles.dao';
import { Roles } from 'src/typeorm/entities/roles.entity';
import { Paginated } from 'src/types/common.type';
import { ILike } from 'typeorm';

@Injectable()
export class RolesService {
	constructor(private readonly dao: RolesDao) {}

	findAll(query: PaginatedDto): Promise<Paginated<Roles>> {
		const where = query.search ? { name: ILike(`%${query.search}%`) } : {};
		return this.dao.findManyAndCount(where, { take: query.limit, skip: query.page });
	}

	findOne(id: string): Promise<Roles | null> {
		return this.dao.findOne({ id });
	}
}

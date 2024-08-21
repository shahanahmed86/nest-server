import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PaginatedDto } from 'src/app.dto';
import { ZodPipe } from 'src/library/zod.library';
import { Genders } from 'src/typeorm/entities/genders.entity';
import { Paginated } from 'src/types/common.type';
import { PaginatedQuery } from 'src/validations/common.validation';
import { GetAllGendersDto } from './genders.dto';
import { GendersService } from './genders.service';

@Controller('api/genders')
export class GendersController {
	constructor(private readonly gendersService: GendersService) {}

	@Get()
	@ApiQuery({ type: PaginatedDto })
	@ApiResponse({ status: 200, type: GetAllGendersDto })
	findAll(@Query(new ZodPipe(PaginatedQuery)) query: PaginatedQuery): Promise<Paginated<Genders>> {
		return this.gendersService.findAll(query);
	}
}

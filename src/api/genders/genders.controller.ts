import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PaginatedDto, ValidationError } from 'src/app.dto';
import { Genders } from 'src/typeorm/entities/genders.entity';
import { Paginated } from 'src/types/common.type';
import { GetAllGendersDto } from './genders.dto';
import { GendersService } from './genders.service';

@Controller('api/genders')
export class GendersController {
	constructor(private readonly gendersService: GendersService) {}

	@Get()
	@ApiResponse({ status: HttpStatus.OK, type: GetAllGendersDto })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationError })
	findAll(@Query() query: PaginatedDto): Promise<Paginated<Genders>> {
		return this.gendersService.findAll(query);
	}
}

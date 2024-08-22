import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Query,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';
import { ApiBaseResponse, PaginatedDto, ValidationErrors } from 'src/app.dto';
import { GetAllGendersResponse, GetGendersResponse } from './genders.dto';
import { GendersService } from './genders.service';

@ApiTags('genders')
@Controller()
export class GendersController {
	constructor(private readonly gendersService: GendersService) {}

	@Get()
	@ApiOkResponse({ type: GetAllGendersResponse, description: 'Get all genders' })
	@ApiBadRequestResponse({ type: ValidationErrors, description: 'Bad request' })
	async findAll(@Query() query: PaginatedDto): Promise<GetAllGendersResponse> {
		const data = await this.gendersService.findAll(query);
		return {
			statusCode: HttpStatus.OK,
			message: "You've successfully got all the genders",
			data,
		};
	}

	@Get(':id')
	@ApiOkResponse({ type: GetGendersResponse, description: 'Get gender' })
	@ApiNotFoundResponse({ type: ApiBaseResponse, description: 'Gender not found' })
	@ApiBadRequestResponse({ type: ValidationErrors, description: 'Bad request' })
	async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<GetGendersResponse> {
		const data = await this.gendersService.findOne(id);
		if (!data) {
			throw new HttpException('Gender not found!', HttpStatus.NOT_FOUND);
		}

		return {
			statusCode: HttpStatus.OK,
			message: "You've successfully got the gender",
			data,
		};
	}
}

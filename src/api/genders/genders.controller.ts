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
import { TransactionService } from 'src/typeorm/transaction/transaction';
import { GetAllGendersResponse, GetGendersResponse } from './genders.dto';
import { GendersService } from './genders.service';

@ApiTags('genders')
@Controller()
export class GendersController {
	constructor(
		private readonly genders: GendersService,
		private readonly transaction: TransactionService,
	) {}

	@Get()
	@ApiOkResponse({ type: GetAllGendersResponse, description: 'Get all genders' })
	@ApiBadRequestResponse({ type: ValidationErrors, description: 'Bad request' })
	async findAll(@Query() query: PaginatedDto) {
		return this.transaction.withTransaction<GetAllGendersResponse>(async () => {
			const data = await this.genders.findAll(query);
			return {
				statusCode: HttpStatus.OK,
				message: "You've successfully got all the genders",
				data,
			};
		});
	}

	@Get(':id')
	@ApiOkResponse({ type: GetGendersResponse, description: 'Get gender' })
	@ApiNotFoundResponse({ type: ApiBaseResponse, description: 'Gender not found' })
	@ApiBadRequestResponse({ type: ValidationErrors, description: 'Bad request' })
	async findOne(@Param('id', ParseUUIDPipe) id: string) {
		return this.transaction.withTransaction<GetGendersResponse>(async () => {
			const data = await this.genders.findOne(id);
			if (!data) {
				throw new HttpException('Gender not found!', HttpStatus.NOT_FOUND);
			}

			return {
				statusCode: HttpStatus.OK,
				message: "You've successfully got the gender",
				data,
			};
		});
	}
}

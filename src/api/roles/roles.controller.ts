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
import { GetAllRolesResponse, GetRolesResponse } from './roles.dto';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller()
export class RolesController {
	constructor(
		private readonly roles: RolesService,
		private readonly transaction: TransactionService,
	) {}

	@Get()
	@ApiOkResponse({ type: GetAllRolesResponse, description: 'Get all roles' })
	@ApiBadRequestResponse({ type: ValidationErrors, description: 'Bad request' })
	async findAll(@Query() query: PaginatedDto) {
		return this.transaction.withTransaction<GetAllRolesResponse>(async () => {
			const data = await this.roles.findAll(query);
			return {
				statusCode: HttpStatus.OK,
				message: "You've successfully got all the roles",
				data,
			};
		});
	}

	@Get(':id')
	@ApiOkResponse({ type: GetRolesResponse, description: 'Get Role' })
	@ApiNotFoundResponse({ type: ApiBaseResponse, description: 'Role not found' })
	@ApiBadRequestResponse({ type: ValidationErrors, description: 'Bad request' })
	async findOne(@Param('id', ParseUUIDPipe) id: string) {
		return this.transaction.withTransaction<GetRolesResponse>(async () => {
			const data = await this.roles.findOne(id);
			if (!data) {
				throw new HttpException('Role not found!', HttpStatus.NOT_FOUND);
			}

			return {
				statusCode: HttpStatus.OK,
				message: "You've successfully got the Role",
				data,
			};
		});
	}
}

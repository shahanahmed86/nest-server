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
import { GetAllRolesResponse, GetRolesResponse } from './roles.dto';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller()
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@Get()
	@ApiOkResponse({ type: GetAllRolesResponse, description: 'Get all roles' })
	@ApiBadRequestResponse({ type: ValidationErrors, description: 'Bad request' })
	async findAll(@Query() query: PaginatedDto): Promise<GetAllRolesResponse> {
		const data = await this.rolesService.findAll(query);
		return {
			statusCode: HttpStatus.OK,
			message: "You've successfully got all the roles",
			data,
		};
	}

	@Get(':id')
	@ApiOkResponse({ type: GetRolesResponse, description: 'Get Role' })
	@ApiNotFoundResponse({ type: ApiBaseResponse, description: 'Role not found' })
	@ApiBadRequestResponse({ type: ValidationErrors, description: 'Bad request' })
	async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<GetRolesResponse> {
		const data = await this.rolesService.findOne(id);
		if (!data) {
			throw new HttpException('Role not found!', HttpStatus.NOT_FOUND);
		}

		return {
			statusCode: HttpStatus.OK,
			message: "You've successfully got the Role",
			data,
		};
	}
}

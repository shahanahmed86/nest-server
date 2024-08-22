import { ApiProperty } from '@nestjs/swagger';
import { ApiBaseResponse } from 'src/app.dto';
import { Roles } from 'src/typeorm/entities/roles.entity';

export class GetAllRolesDto {
	@ApiProperty({ type: Number })
	count: number;

	@ApiProperty({ type: Number })
	pages: number;

	@ApiProperty({ type: Number })
	page: number;

	@ApiProperty({ isArray: true, type: Roles })
	rows: Roles[];
}

export class GetAllRolesResponse extends ApiBaseResponse {
	@ApiProperty({ type: GetAllRolesDto })
	data: GetAllRolesDto;
}

export class GetRolesResponse extends ApiBaseResponse {
	@ApiProperty({ type: Roles || null })
	data: Roles | null;
}

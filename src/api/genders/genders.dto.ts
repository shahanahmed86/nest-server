import { ApiProperty } from '@nestjs/swagger';
import { ApiBaseResponse } from 'src/app.dto';
import { Genders } from 'src/typeorm/entities/genders.entity';

export class GetAllGendersDto {
	@ApiProperty({ type: Number })
	count: number;

	@ApiProperty({ type: Number })
	pages: number;

	@ApiProperty({ type: Number })
	page: number;

	@ApiProperty({ isArray: true, type: Genders })
	rows: Genders[];
}

export class GetAllGendersResponse extends ApiBaseResponse {
	@ApiProperty({ type: GetAllGendersDto })
	data: GetAllGendersDto;
}

export class GetGendersResponse extends ApiBaseResponse {
	@ApiProperty({ type: Genders || null })
	data: Genders | null;
}

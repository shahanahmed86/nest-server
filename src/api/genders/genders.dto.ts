import { ApiProperty } from '@nestjs/swagger';
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

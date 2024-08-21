import { ApiProperty } from '@nestjs/swagger';
import { Genders } from 'src/typeorm/entities/genders.entity';

export class GetAllGendersDto {
	@ApiProperty()
	count: number;

	@ApiProperty()
	pages: number;

	@ApiProperty()
	page: number;

	@ApiProperty({ isArray: true, nullable: false, type: () => Genders })
	rows: Genders[];
}

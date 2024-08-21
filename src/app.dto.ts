import { ApiPropertyOptional } from '@nestjs/swagger';
import { LIMIT, PAGE } from 'src/utils/constant.util';

export class PaginatedDto {
	@ApiPropertyOptional({ description: 'Search term (optional)' })
	search?: string;

	@ApiPropertyOptional({ description: 'Number of items per page', default: LIMIT })
	limit?: number = LIMIT;

	@ApiPropertyOptional({ description: 'Page number, must be greater than 0', default: PAGE })
	page?: number = PAGE;
}

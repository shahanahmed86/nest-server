import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { LIMIT, PAGE } from 'src/utils/constant.util';

export class PaginatedDto {
	@ApiPropertyOptional({ type: String, description: 'Search term (optional)' })
	@IsString()
	@IsOptional()
	search?: string;

	@ApiPropertyOptional({ type: Number, description: 'Items per page', example: LIMIT })
	@IsNumber(undefined, { message: 'Limit must be a number' })
	@Max(100, { message: 'Max limit is 100' })
	@Transform(({ value }) => parseInt(value, 10))
	@IsOptional()
	limit?: number;

	@ApiPropertyOptional({ type: Number, description: 'Must be greater than 0', example: PAGE })
	@IsNumber(undefined, { message: 'Page must be a number' })
	@Min(1, { message: 'Page must be greater than 0' })
	@Transform(({ value }) => parseInt(value, 10))
	@IsOptional()
	page?: number;
}

abstract class BaseValidationError {
	@ApiProperty({ type: String })
	error: string;

	@ApiProperty({ type: Number })
	statusCode: number;
}

export class ValidationErrors extends BaseValidationError {
	@ApiProperty({ type: String, isArray: true })
	message: string[];
}

export class ValidationError extends BaseValidationError {
	@ApiProperty({ type: String })
	message: string;
}

export class ApiBaseResponse {
	@ApiProperty({ type: String })
	message: string;

	@ApiProperty({ type: Number })
	statusCode: number;
}

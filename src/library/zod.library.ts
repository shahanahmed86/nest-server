import {
	ArgumentMetadata,
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	Injectable,
	PipeTransform,
} from '@nestjs/common';
import { Schema, ZodError } from 'zod';

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
	catch(exception: T, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const status = 400;
		response.status(status).json({
			errors: exception.errors,
			message: exception.message,
			statusCode: status,
		});
	}
}

@Injectable()
export class ZodPipe<TSchema extends Schema> implements PipeTransform {
	constructor(private readonly schema: TSchema) {}

	transform(value: any, _metadata: ArgumentMetadata) {
		return this.schema.parse(value);
	}
}

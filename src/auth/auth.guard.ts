import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { configs } from 'src/config';
import { JwtTokenPayload } from 'src/types/common.type';

const { secret } = configs.jwt;

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwt: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();

		const token = this.extractTokenFromHeader(request);

		const error = new HttpException('Not Authenticated', HttpStatus.UNAUTHORIZED);
		if (!token) throw error;

		try {
			const payload = await this.jwt.verifyAsync<JwtTokenPayload>(token, { secret });
			const response = context.switchToHttp().getResponse<Response>();

			response.locals.user = payload;
		} catch {
			throw error;
		}

		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}

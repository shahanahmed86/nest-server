import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ApiBaseResponse, ValidationErrors } from 'src/app.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransactionService } from 'src/typeorm/transaction/transaction';
import { JwtTokenPayload } from 'src/types/common.type';
import { LoggedInAdminSuccessDto, LoginAdminDto, LoginAdminSuccessDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('admins/auth')
@Controller()
export class AuthController {
	constructor(
		private readonly auth: AuthService,
		private readonly transaction: TransactionService,
	) {}

	@Post()
	@ApiResponse({
		type: LoginAdminSuccessDto,
		status: HttpStatus.OK,
		description: 'Login successfully',
	})
	@ApiBadRequestResponse({ type: ValidationErrors, description: 'Bad request' })
	@ApiUnauthorizedResponse({ type: ApiBaseResponse, description: 'Unauthorized' })
	async login(@Body() body: LoginAdminDto) {
		return this.transaction.withTransaction<LoginAdminSuccessDto>(async () => {
			const user = await this.auth.checkUserExistence(body);

			const [accessToken, refreshToken] = await this.auth.generateJwtToken({
				userId: user.id,
				role: user.role.name,
			});
			return {
				statusCode: HttpStatus.OK,
				message: 'Login successfully',
				data: { accessToken, refreshToken, user },
			};
		});
	}

	@Get()
	@UseGuards(AuthGuard)
	@ApiBearerAuth('Authorization')
	@ApiResponse({ type: LoggedInAdminSuccessDto, status: HttpStatus.OK })
	@ApiUnauthorizedResponse({ type: ApiBaseResponse, status: HttpStatus.UNAUTHORIZED })
	async loggedIn(@Res({ passthrough: true }) res: Response<any, { user: JwtTokenPayload }>) {
		return this.transaction.withTransaction<LoggedInAdminSuccessDto>(async () => {
			const user = await this.auth.getUser(res.locals.user);

			return {
				statusCode: HttpStatus.OK,
				message: "You've a valid logged in session",
				user,
			};
		});
	}
}

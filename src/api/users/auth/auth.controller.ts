import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Put,
	Res,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiConflictResponse,
	ApiResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ApiBaseResponse, ValidationErrors } from 'src/app.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransactionService } from 'src/typeorm/transaction/transaction';
import { JwtTokenPayload } from 'src/types/common.type';
import {
	ChangePasswordDto,
	LoggedInUserSuccessDto,
	LoginUserDto,
	LoginUserSuccessDto,
	SignupUserDto,
	SignupUserSuccessDto,
} from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('users/auth')
@Controller()
export class AuthController {
	constructor(
		private readonly auth: AuthService,
		private readonly transaction: TransactionService,
	) {}

	@Post('signup')
	@ApiResponse({
		type: SignupUserSuccessDto,
		status: HttpStatus.OK,
		description: 'Signup successfully',
	})
	@ApiBadRequestResponse({ type: ValidationErrors, description: 'Bad request' })
	@ApiConflictResponse({ type: ApiBaseResponse, description: 'Conflict' })
	async signup(@Body() body: SignupUserDto) {
		return this.transaction.withTransaction<SignupUserSuccessDto>(async () => {
			await this.auth.checkUserDuplication(body.email);

			const user = await this.auth.createUser(body);

			const [accessToken, refreshToken] = await this.auth.generateJwtToken({
				userId: user.id,
				role: user.role.name,
			});
			return {
				statusCode: HttpStatus.OK,
				message: 'Signup successfully',
				data: { accessToken, refreshToken, user },
			};
		});
	}

	@Post()
	@ApiResponse({
		type: LoginUserSuccessDto,
		status: HttpStatus.OK,
		description: 'Login successfully',
	})
	@ApiBadRequestResponse({ type: ValidationErrors, description: 'Bad request' })
	@ApiUnauthorizedResponse({ type: ApiBaseResponse, description: 'Unauthorized' })
	async login(@Body() body: LoginUserDto) {
		return this.transaction.withTransaction<LoginUserSuccessDto>(async () => {
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
	@ApiResponse({ type: LoggedInUserSuccessDto, status: HttpStatus.OK })
	@ApiUnauthorizedResponse({ type: ApiBaseResponse, status: HttpStatus.UNAUTHORIZED })
	async loggedIn(@Res({ passthrough: true }) res: Response<any, { user: JwtTokenPayload }>) {
		return this.transaction.withTransaction<LoggedInUserSuccessDto>(async () => {
			const user = await this.auth.getUser(res.locals.user);

			return {
				statusCode: HttpStatus.OK,
				message: "You've a valid logged in session",
				user,
			};
		});
	}

	@Put('set-password')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('Authorization')
	@ApiResponse({ type: ApiBaseResponse, status: HttpStatus.OK })
	@ApiUnauthorizedResponse({ type: ApiBaseResponse, status: HttpStatus.UNAUTHORIZED })
	@ApiBadRequestResponse({ type: ValidationErrors, description: 'Bad request' })
	async setPassword(
		@Res({ passthrough: true }) res: Response<any, { user: JwtTokenPayload }>,
		@Body() data: ChangePasswordDto,
	) {
		return this.transaction.withTransaction<ApiBaseResponse>(async () => {
			const user = await this.auth.getUser(res.locals.user);

			const matched = this.auth.comparePassword(user.password, data.oldPassword);
			if (!matched) throw new HttpException('Old password mismatched', HttpStatus.CONFLICT);

			await this.auth.setPassword(user.id, data.password);

			return {
				statusCode: HttpStatus.OK,
				message: "You've a successfully changed your password",
			};
		});
	}
}

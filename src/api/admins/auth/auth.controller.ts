import { Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginAdminSuccessDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('admins/auth')
@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post()
	@ApiOkResponse({ type: LoginAdminSuccessDto, description: 'Login successfully' })
	async login(): Promise<LoginAdminSuccessDto> {
		const user = await this.authService.login();
		return {
			statusCode: HttpStatus.OK,
			message: 'Login successfully',
			user,
		};
	}
}

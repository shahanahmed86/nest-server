import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { ApiBaseResponse } from 'src/app.dto';
import { Admins } from 'src/typeorm/entities/admins.entity';

export class LoginAdminDto {
	@IsEmail()
	@ApiProperty({ type: String })
	email: string;

	@IsString()
	@ApiProperty({ type: String })
	password: string;
}

class AuthData {
	@ApiProperty({ type: String })
	accessToken: string;

	@ApiProperty({ type: String })
	refreshToken: string;

	@ApiProperty({ type: Admins })
	user: Admins;
}

export class LoggedInAdminSuccessDto extends ApiBaseResponse {
	@ApiProperty({ type: AuthData })
	user: Admins;
}

export class LoginAdminSuccessDto extends ApiBaseResponse {
	@ApiProperty({ type: AuthData })
	data: AuthData;
}

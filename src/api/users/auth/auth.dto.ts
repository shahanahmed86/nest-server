import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsOptional,
	IsPhoneNumber,
	IsString,
	IsStrongPassword,
	IsUUID,
} from 'class-validator';
import { ApiBaseResponse } from 'src/app.dto';
import { Users } from 'src/typeorm/entities/users.entity';

export class SignupUserDto {
	@IsString()
	@IsOptional()
	@ApiProperty({ type: String, nullable: true })
	firstName?: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ type: String, nullable: true })
	lastName?: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ type: String, nullable: true })
	avatar?: string;

	@IsEmail()
	@ApiProperty({ type: String })
	email: string;

	@IsString()
	@ApiProperty({ type: String })
	password: string;

	@IsPhoneNumber()
	@ApiProperty({ type: String })
	phone: string;

	@IsUUID()
	@ApiProperty({ type: String })
	genderId: string;
}

export class LoginUserDto {
	@IsEmail()
	@ApiProperty({ type: String })
	email: string;

	@IsString()
	@ApiProperty({ type: String })
	password: string;
}

export class ChangePasswordDto {
	@IsString()
	@ApiProperty({ type: String })
	oldPassword: string;

	@IsStrongPassword({
		minLength: 9,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 0,
	})
	@ApiProperty({ type: String })
	password: string;
}

class AuthData {
	@ApiProperty({ type: String })
	accessToken: string;

	@ApiProperty({ type: String })
	refreshToken: string;

	@ApiProperty({ type: Users })
	user: Users;
}

export class LoggedInUserSuccessDto extends ApiBaseResponse {
	@ApiProperty({ type: AuthData })
	user: Users;
}

export class SignupUserSuccessDto extends ApiBaseResponse {
	@ApiProperty({ type: AuthData })
	data: AuthData;
}

export class LoginUserSuccessDto extends ApiBaseResponse {
	@ApiProperty({ type: AuthData })
	data: AuthData;
}

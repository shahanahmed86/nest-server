import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { ApiBaseResponse } from 'src/app.dto';
import { Admins } from 'src/typeorm/entities/admins.entity';

export class LoginAdminDto {
	@IsEmail()
	@ApiProperty({ type: String })
	email: number;

	@IsString()
	@ApiProperty({ type: String })
	password: number;
}

export class LoginAdminSuccessDto extends ApiBaseResponse {
	@ApiProperty({ type: Admins })
	user: Admins;
}

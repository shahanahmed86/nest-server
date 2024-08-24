import { Module } from '@nestjs/common';
import RolesDao from 'src/dao/roles.dao';
import UsersDao from 'src/dao/users.dao';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService, UsersDao, RolesDao],
})
export class AuthModule {}

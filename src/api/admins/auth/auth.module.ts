import { Module } from '@nestjs/common';
import AdminsDao from 'src/dao/admins.dao';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService, AdminsDao],
})
export class AuthModule {}

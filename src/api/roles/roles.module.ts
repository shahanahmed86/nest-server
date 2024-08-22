import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import RolesDao from 'src/dao/roles.dao';

@Module({
	controllers: [RolesController],
	providers: [RolesService, RolesDao],
})
export class RolesModule {}

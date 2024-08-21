import { Module } from '@nestjs/common';
import GendersDao from 'src/dao/genders.dao';
import { GendersController } from './genders.controller';
import { GendersService } from './genders.service';

@Module({
	controllers: [GendersController],
	providers: [GendersService, GendersDao],
})
export class GendersModule {}

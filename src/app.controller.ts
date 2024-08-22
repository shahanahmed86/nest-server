import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('healthcheck')
	@ApiOkResponse({ type: String, description: 'check health' })
	healthcheck(): string {
		return this.appService.healthcheck();
	}
}

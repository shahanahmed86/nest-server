import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from './env.validation';

@Module({
	imports: [
		ConfigModule.forRoot({
			validate,
			isGlobal: true,
			cache: false,
			ignoreEnvFile: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { CompressionMiddleware } from './middleware/compression.middleware';
import { CookieParserMiddleware } from './middleware/cookie.middleware';
import { CorsMiddleware } from './middleware/cors.middleware';
import { FileUploadMiddleware } from './middleware/fileupload.middleware';
import { HelmetMiddleware } from './middleware/helmet.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RateLimiterMiddleware } from './middleware/rate.middleware';
import { TypeOrmConfigService } from './database/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [config] }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useClass: TypeOrmConfigService,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				CompressionMiddleware,
				CookieParserMiddleware,
				CorsMiddleware,
				LoggerMiddleware,
				HelmetMiddleware,
				RateLimiterMiddleware,
				FileUploadMiddleware,
			)
			.forRoutes('*');
	}
}

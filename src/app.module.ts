import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GendersModule } from './api/genders/genders.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import typeorm from './typeorm';
import redis from './library/redis.library';
import { CompressionMiddleware } from './middleware/compression.middleware';
import { CookieParserMiddleware } from './middleware/cookie.middleware';
import { CorsMiddleware } from './middleware/cors.middleware';
import { FileUploadMiddleware } from './middleware/fileupload.middleware';
import { HelmetMiddleware } from './middleware/helmet.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RateLimiterMiddleware } from './middleware/rate.middleware';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [config, typeorm, redis] }),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (svc: ConfigService) => svc.get('typeorm'),
		}),
		GendersModule,
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

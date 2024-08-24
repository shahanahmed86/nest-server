import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from './api/admins/admins.module';
import { GendersModule } from './api/genders/genders.module';
import { RolesModule } from './api/roles/roles.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import redis from './library/redis.library';
import { CompressionMiddleware } from './middleware/compression.middleware';
import { CookieParserMiddleware } from './middleware/cookie.middleware';
import { CorsMiddleware } from './middleware/cors.middleware';
import { FileUploadMiddleware } from './middleware/fileupload.middleware';
import { HelmetMiddleware } from './middleware/helmet.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RateLimiterMiddleware } from './middleware/rate.middleware';
import { GlobalModuleTsModule } from './modules/global.module';
import { UsersModule } from './api/users/users.module';
import typeorm from './typeorm';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config, typeorm, redis],
		}),
		JwtModule.register({ global: true }),
		RouterModule.register([
			{
				path: 'api',
				children: [
					{ path: 'v1/genders', module: GendersModule },
					{ path: 'v1/roles', module: RolesModule },
					{ path: 'admins', module: AdminsModule },
					{ path: 'users', module: UsersModule },
				],
			},
		]),
		GendersModule,
		RolesModule,
		AdminsModule,
		UsersModule,
		GlobalModuleTsModule,
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

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AllImports } from './app.imports';
import { AppService } from './app.service';
import { CompressionMiddleware } from './middleware/compression.middleware';
import { CookieParserMiddleware } from './middleware/cookie.middleware';
import { CorsMiddleware } from './middleware/cors.middleware';
import { FileUploadMiddleware } from './middleware/fileupload.middleware';
import { HelmetMiddleware } from './middleware/helmet.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RateLimiterMiddleware } from './middleware/rate.middleware';

@Module({
	imports: AllImports,
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

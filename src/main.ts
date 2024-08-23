import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name, version } from '../package.json';
import { AppModule } from './app.module';
import { configs } from './config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	const config = new DocumentBuilder()
		.setTitle(name)
		.setDescription(description)
		.setVersion(version)
		.addBearerAuth({ bearerFormat: 'JWT', type: 'http' }, 'Authorization')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-docs', app, document, {
		customCss: '.swagger-ui .topbar { display: none }',
		customSiteTitle: name,
		customfavIcon: `${configs.app.url}/favicon.ico`,
	});

	await app.listen(configs.app.port, () =>
		console.log(`Server running on port ${configs.app.port}`),
	);
}
bootstrap();

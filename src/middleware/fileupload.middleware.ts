import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as fileupload from 'express-fileupload';
import { EnvVars } from 'src/env.validation';

const LIMIT = 1024 * 1024 * 15; // 15 MB

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
	constructor(private env: ConfigService<EnvVars, true>) {}
	use(...args: [Request, Response, NextFunction]) {
		const inTest = this.env.get('NODE_ENV') === 'test';
		fileupload({
			limits: { fileSize: LIMIT },
			debug: inTest,
			abortOnLimit: true,
			responseOnLimit: 'Try uploading below 15 MB file',
			useTempFiles: true,
		})(...args);
	}
}

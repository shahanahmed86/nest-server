import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as fileupload from 'express-fileupload';
import { configs } from 'src/config';

const LIMIT = 1024 * 1024 * 15; // 15 MB

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
	use(...args: [Request, Response, NextFunction]) {
		const inTest = configs.app.env === 'test';
		fileupload({
			limits: { fileSize: LIMIT },
			debug: inTest,
			abortOnLimit: true,
			responseOnLimit: 'Try uploading below 15 MB file',
			useTempFiles: true,
		})(...args);
	}
}

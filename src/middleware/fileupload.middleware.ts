import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as fileupload from 'express-fileupload';
import { configs } from 'src/config';
import { SIZE_LIMIT } from 'src/utils/constant.util';

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
	use(...args: [Request, Response, NextFunction]) {
		const inTest = configs.app.env === 'test';
		fileupload({
			limits: { fileSize: SIZE_LIMIT },
			debug: inTest,
			abortOnLimit: true,
			responseOnLimit: 'Try uploading below 15 MB file',
			useTempFiles: true,
		})(...args);
	}
}

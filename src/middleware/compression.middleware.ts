import { Injectable, NestMiddleware } from '@nestjs/common';
import * as compression from 'compression';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
	use(...args: [Request, Response, NextFunction]) {
		compression({ level: -1 })(...args);
	}
}

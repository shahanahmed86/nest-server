import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
	use(...args: [Request, Response, NextFunction]) {
		helmet({ xPoweredBy: false })(...args);
	}
}

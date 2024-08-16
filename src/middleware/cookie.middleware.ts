import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cookie from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {
	use(...args: [Request, Response, NextFunction]) {
		cookie()(...args);
	}
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cors from 'cors';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
	use(...args: [Request, Response, NextFunction]) {
		cors()(...args);
	}
}

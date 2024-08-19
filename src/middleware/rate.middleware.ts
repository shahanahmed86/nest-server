import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { configs } from 'src/config';

const LIMIT_IN_MS = 1000 * 60 * 5;
const REQUESTS = 15;

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
	private readonly rateLimiter: RateLimitRequestHandler;

	constructor() {
		this.rateLimiter = rateLimit({
			windowMs: LIMIT_IN_MS,
			limit: REQUESTS,
			message: "You've hit too many requests. Please try again later.",
			standardHeaders: true,
			legacyHeaders: false,
			skipSuccessfulRequests: true,
			skip: () => configs.app.env === 'test',
		});
	}

	use(...args: [Request, Response, NextFunction]) {
		this.rateLimiter(...args);
	}
}

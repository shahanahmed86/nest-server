import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { EnvVars } from 'src/env.validation';

const LIMIT_IN_MS = 1000 * 60 * 5;
const REQUESTS = 15;

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
	private readonly rateLimiter: RateLimitRequestHandler;

	constructor(private env: ConfigService<EnvVars, true>) {
		this.rateLimiter = rateLimit({
			windowMs: LIMIT_IN_MS,
			limit: REQUESTS,
			message: "You've hit too many requests. Please try again later.",
			standardHeaders: true,
			legacyHeaders: false,
			skipSuccessfulRequests: true,
			skip: () => this.env.get('NODE_ENV') === 'test',
		});
	}

	use(...args: [Request, Response, NextFunction]) {
		this.rateLimiter(...args);
	}
}

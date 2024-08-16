import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as chalk from 'chalk';
import * as morgan from 'morgan';
import { EnvVars } from 'src/env.validation';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	constructor(private readonly env: ConfigService<EnvVars, true>) {}
	use(...args: [Request, Response, NextFunction]) {
		const protocol = this.env.get('APP_PROTOCOL');
		const host = this.env.get('APP_HOST');
		const baseUrl = `${protocol}://${host}`;
		morgan.token('host', () => baseUrl);

		morgan.token('error', (_, res: Response) => {
			if (!res.locals.error) return '';
			return res.locals.error.message;
		});

		morgan(function (tokens, req, res) {
			return [
				chalk.yellow(tokens['remote-addr'](req, res)),
				chalk.hex('#f78fb3').bold(tokens['date'](req, res)),
				chalk.blueBright(tokens.host(req, res) + (tokens.url(req, res) ?? '/')),
				chalk.hex('#34ace0').bold(tokens.method(req, res)),
				chalk.hex('#ffb142').bold(tokens.status(req, res)),
				chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
				chalk.whiteBright(tokens['error'](req, res)),
				chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
			].join(' ');
		})(...args);
	}
}

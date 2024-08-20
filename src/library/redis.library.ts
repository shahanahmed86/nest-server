import { registerAs } from '@nestjs/config';
import { createClient } from 'redis';
import { configs } from '../config';

const { url, pass: password } = configs.cache;

const ONE_SECOND = 1000;

export class CacheService {
	private client: ReturnType<typeof createClient>;

	constructor() {
		this.client = createClient({ password, url });

		this.getConnected();
	}

	async getConnected() {
		if (this.client.isReady) return;

		await this.client.connect();
	}

	async getDisconnected() {
		if (!this.client.isReady) return;

		await this.client.quit();
	}

	setEx<T extends string>(key: string, value: T, expiry = configs.jwt.expiry) {
		return this.client.setEx(key, expiry / ONE_SECOND, value);
	}

	set<T extends string>(key: string, value: T): ReturnType<typeof this.client.set> {
		return this.client.set(key, value);
	}

	get(key: string) {
		return this.client.get(key);
	}

	del(key: string) {
		return this.client.del(key);
	}
}

export const cacheService = new CacheService();

export default registerAs('redis', () => cacheService);

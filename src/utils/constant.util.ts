import { configs } from '../config';

const { expiry } = configs.jwt;

export const ONE_SECOND = 1000;

export const JWT_EXPIRY_IN_SEC = expiry / ONE_SECOND;

export const SIZE_LIMIT = 10 * 1024 * 1024; // 10 MB

export const LIMIT = 10;

export const PAGE = 1;

export const CHUNK_SIZE = 5000;

import { configs } from '../config';

const { expiry } = configs.jwt;

export const ONE_SECOND = 1000;

export const JWT_EXPIRY_IN_SEC = expiry / ONE_SECOND;

export const SIZE_LIMIT = 10 * 1024 * 1024; // 10 MB

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const PHONE_REGEX =
	/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

export const LIMIT = 10;

export const PAGE = 1;

export const CHUNK_SIZE = 5000;

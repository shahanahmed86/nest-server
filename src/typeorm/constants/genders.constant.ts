import { DeepPartial } from 'typeorm';
import { IndexColumnsOptions } from '../../types/common.type';
import { Genders } from '../entities/genders.entity';

export const GENDERS_TABLE = 'genders';

export const GENDERS_TABLE_INDEXED_COLUMNS: IndexColumnsOptions<Genders> = {
	name: `idx_${GENDERS_TABLE}_name`,
	columns: ['name'],
} as const;

export const GENDERS_DATA: DeepPartial<Genders[]> = [
	{ id: '04521c7b-a128-4f5f-bfb2-96053c0a31b0', name: 'Male' },
	{ id: '5f3e3914-03ab-49ba-a988-5d46112ac450', name: 'Female' },
	{ id: '740fe07d-1fbe-4bc9-be47-93f3b033288f', name: 'Prefer not to say' },
];

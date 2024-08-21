import { LIMIT, PAGE } from 'src/utils/constant.util';
import * as z from 'zod';

export const PaginatedQuery = z.object({
	limit: z
		.string()
		.pipe(z.coerce.number())
		.default(LIMIT.toString())
		.refine((arg) => arg <= 100, { message: 'Max limit is 50' }),
	page: z
		.string()
		.pipe(z.coerce.number())
		.default(PAGE.toString())
		.refine((arg) => arg !== 0, { message: 'Page must be greater than 0' }),
	search: z.string().optional(),
});
export type PaginatedQuery = z.infer<typeof PaginatedQuery>;

export type Paginated<T extends object> = {
	count: number;
	rows: T[];
	pages: number;
	page: number;
};

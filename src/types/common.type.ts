export type Paginated<T extends object> = {
	count: number;
	rows: T[];
	pages: number;
	page: number;
};

export type IndexColumnsOptions<T extends object> = {
	name: string;
	columns: (keyof T)[];
};

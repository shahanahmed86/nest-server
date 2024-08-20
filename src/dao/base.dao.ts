import { Paginated } from 'src/types/common.type';
import { CHUNK_SIZE, LIMIT, PAGE } from 'src/utils/constant.util';
import {
	EntityTarget,
	FindManyOptions,
	FindOneOptions,
	FindOptionsOrder,
	FindOptionsWhere,
	IsNull,
	Repository,
	SaveOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { connectionSource } from '../typeorm';
import { Base } from '../typeorm/entities/base.entity';

class BaseDao<BaseEntity extends Base> {
	model: Repository<BaseEntity>;
	modelName: string;

	constructor(target: EntityTarget<BaseEntity>, modelName: string) {
		this.model = connectionSource.getRepository(target);
		this.modelName = modelName;
	}

	async delete(where: FindOptionsWhere<BaseEntity>): Promise<boolean> {
		const result = await this.model.softDelete(where);
		return !!result.affected;
	}

	async hardDelete(where: FindOptionsWhere<BaseEntity>): Promise<boolean> {
		const result = await this.model.delete(where);
		return !!result.affected;
	}

	async update(
		where: FindOptionsWhere<BaseEntity>,
		data: QueryDeepPartialEntity<BaseEntity>,
	): Promise<boolean> {
		const result = await this.model.update(where, data);
		return !!result.affected;
	}

	create(data: BaseEntity, options: SaveOptions): Promise<BaseEntity> {
		return this.model.save(data, options);
	}

	bulkInsert(data: BaseEntity[], options: SaveOptions): Promise<BaseEntity[]> {
		options.chunk ??= CHUNK_SIZE;
		return this.model.save(data, options);
	}

	protected getDeleteParams(where: FindOptionsWhere<BaseEntity>) {
		return { ...where, deletedAt: IsNull() };
	}

	findOne(
		where: FindOptionsWhere<BaseEntity>,
		options: FindOneOptions<BaseEntity>,
	): Promise<BaseEntity | null> {
		options.where = this.getDeleteParams(where);
		return this.model.findOne(options);
	}

	findMany(
		where: FindOptionsWhere<BaseEntity>,
		options: FindManyOptions<BaseEntity>,
	): Promise<BaseEntity[]> {
		options.where = this.getDeleteParams(where);

		options.order ??= { createdAt: 'DESC' } as FindOptionsOrder<BaseEntity>;

		return this.model.find(options);
	}

	async findManyAndCount(
		where: FindOptionsWhere<BaseEntity>,
		options: FindManyOptions<BaseEntity>,
	): Promise<Paginated<BaseEntity>> {
		options.where = this.getDeleteParams(where);

		const page = options.skip ?? PAGE;
		const limit = options.take ?? LIMIT;

		options.take = limit;
		options.skip = (page - 1) * limit;

		options.order ??= { createdAt: 'DESC' } as FindOptionsOrder<BaseEntity>;

		const [rows, count] = await this.model.findAndCount(options);
		return { count, pages: Math.ceil(count / limit), page, rows };
	}
}

export default BaseDao;

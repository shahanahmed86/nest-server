import { Column, Entity, OneToMany } from 'typeorm';
import { GENDERS_TABLE } from '../constants/genders.constant';
import { Base } from './base.entity';
import { Users } from './users.entity';

@Entity(GENDERS_TABLE)
export class Genders extends Base {
	@Column()
	name: string;

	@OneToMany(() => Users, (entity) => entity.roleId)
	users?: Users[];
}

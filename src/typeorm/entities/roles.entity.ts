import { Column, Entity, OneToMany } from 'typeorm';
import { ROLES_TABLE } from '../constants/roles.constant';
import { Base } from './base.entity';
import { Users } from './users.entity';

@Entity(ROLES_TABLE)
export class Roles extends Base {
	@Column()
	name: string;

	@OneToMany(() => Users, (entity) => entity.roleId)
	users?: Users[];
}

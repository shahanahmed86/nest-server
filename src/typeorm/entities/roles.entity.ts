import { Column, Entity, OneToMany } from 'typeorm';
import { ROLE_TABLE } from '../constants/roles.constant';
import { Base } from './base.entity';
import { User } from './users.entity';

@Entity(ROLE_TABLE)
export class Role extends Base {
	@Column()
	name: string;

	@OneToMany(() => User, (entity) => entity.roleId)
	users?: User[];
}

import { Column, Entity, OneToMany } from 'typeorm';
import { GENDER_TABLE } from '../constants/genders.constant';
import { Base } from './base.entity';
import { User } from './users.entity';

@Entity(GENDER_TABLE)
export class Gender extends Base {
	@Column()
	name: string;

	@OneToMany(() => User, (entity) => entity.roleId)
	users?: User[];
}

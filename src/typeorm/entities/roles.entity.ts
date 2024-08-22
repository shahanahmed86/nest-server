import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { ROLES_TABLE } from '../constants/roles.constant';
import { Admins } from './admins.entity';
import { Base } from './base.entity';
import { Users } from './users.entity';

@Entity(ROLES_TABLE)
export class Roles extends Base {
	@Column()
	@ApiProperty({ type: String })
	name: string;

	@OneToMany(() => Users, (entity) => entity.roleId)
	users?: Users[];

	@OneToMany(() => Admins, (entity) => entity.roleId)
	admins?: Admins[];
}

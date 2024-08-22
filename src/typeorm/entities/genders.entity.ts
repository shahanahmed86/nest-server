import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { GENDERS_TABLE } from '../constants/genders.constant';
import { Admins } from './admins.entity';
import { Base } from './base.entity';
import { Users } from './users.entity';

@Entity(GENDERS_TABLE)
export class Genders extends Base {
	@Column()
	@ApiProperty({ type: String })
	name: string;

	@OneToMany(() => Users, (entity) => entity.roleId)
	users?: Users[];

	@OneToMany(() => Admins, (entity) => entity.roleId)
	admins?: Admins[];
}

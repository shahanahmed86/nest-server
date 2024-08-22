import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ADMINS_TABLE } from '../constants/admins.constant';
import { Base } from './base.entity';
import { Genders } from './genders.entity';
import { Roles } from './roles.entity';

@Entity(ADMINS_TABLE)
export class Admins extends Base {
	@Column()
	@ApiProperty({ type: String })
	email: string;

	@Column()
	@ApiProperty({ type: String })
	password: string;

	@Column({ type: 'boolean', default: false })
	@ApiProperty({ type: Boolean })
	super?: boolean;

	@Column({ type: 'varchar', generated: 'uuid' })
	@ApiProperty({ type: String })
	roleId: string;

	@ManyToOne(() => Roles, (entity) => entity.admins)
	@ApiProperty({ type: Roles })
	role?: Roles;

	@Column({ type: 'varchar', generated: 'uuid' })
	@ApiProperty({ type: String })
	genderId: string;

	@ManyToOne(() => Genders, (entity) => entity.admins)
	@ApiProperty({ type: Genders })
	gender?: Genders;
}

import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { USERS_TABLE } from '../constants/users.constant';
import { Base } from './base.entity';
import { Genders } from './genders.entity';
import { Roles } from './roles.entity';

@Entity(USERS_TABLE)
export class Users extends Base {
	@Column({ nullable: true })
	@ApiProperty({ type: String, nullable: true })
	firstName?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, nullable: true })
	lastName?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, nullable: true })
	avatar?: string;

	@Column()
	@ApiProperty({ type: String })
	email: string;

	@Column()
	@ApiProperty({ type: String })
	password: string;

	@Column({ type: 'boolean', default: false })
	@ApiProperty({ type: Boolean })
	emailVerified?: boolean;

	@Column()
	@ApiProperty({ type: String })
	phone: string;

	@Column({ type: 'boolean', default: false })
	@ApiProperty({ type: Boolean })
	phoneVerified?: boolean;

	@Column({ type: 'varchar', generated: 'uuid' })
	@ApiProperty({ type: String })
	roleId: string;

	@ManyToOne(() => Roles, (entity) => entity.users)
	@ApiProperty({ type: Roles })
	role?: Roles;

	@Column({ type: 'varchar', generated: 'uuid' })
	@ApiProperty({ type: String })
	genderId: string;

	@ManyToOne(() => Genders, (entity) => entity.users)
	@ApiProperty({ type: Genders })
	gender?: Genders;
}

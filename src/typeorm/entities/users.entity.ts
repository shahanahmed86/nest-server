import { Column, Entity, ManyToOne } from 'typeorm';
import { USERS_TABLE } from '../constants/users.constant';
import { Base } from './base.entity';
import { Genders } from './genders.entity';
import { Roles } from './roles.entity';

@Entity(USERS_TABLE)
export class Users extends Base {
	@Column({ nullable: true })
	firstName?: string;

	@Column({ nullable: true })
	lastName?: string;

	@Column({ nullable: true })
	avatar?: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({ type: 'boolean', default: false })
	emailVerified?: boolean;

	@Column()
	phone: string;

	@Column({ type: 'boolean', default: false })
	phoneVerified?: boolean;

	@Column({ type: 'varchar', generated: 'uuid' })
	roleId!: string;

	@ManyToOne(() => Roles, (entity) => entity.users)
	role?: Roles;

	@Column({ type: 'varchar', generated: 'uuid' })
	genderId!: string;

	@ManyToOne(() => Genders, (entity) => entity.users)
	gender?: Genders;
}

import { Column, Entity, ManyToOne } from 'typeorm';
import { USER_TABLE } from '../constants/users.constant';
import { Base } from './base.entity';
import { Gender } from './genders.entity';
import { Role } from './roles.entity';

@Entity(USER_TABLE)
export class User extends Base {
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

	@ManyToOne(() => Role, (entity) => entity.users)
	role?: Role;

	@Column({ type: 'varchar', generated: 'uuid' })
	genderId!: string;

	@ManyToOne(() => Gender, (entity) => entity.users)
	gender?: Gender;
}

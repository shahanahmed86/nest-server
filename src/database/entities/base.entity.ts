import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Base {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
	createdAt: string;

	@Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
	updatedAt: string;

	@Column({ type: 'timestamp', nullable: true })
	deletedAt?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Base {
	@PrimaryGeneratedColumn('uuid')
	@ApiProperty()
	id: string;

	@Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
	@ApiProperty()
	createdAt: string;

	@Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
	@ApiProperty()
	updatedAt: string;

	@Column({ type: 'timestamp', nullable: true })
	@DeleteDateColumn()
	@ApiProperty()
	deletedAt?: string;
}

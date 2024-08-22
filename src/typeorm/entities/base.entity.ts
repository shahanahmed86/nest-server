import { ApiProperty } from '@nestjs/swagger';
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Base {
	@PrimaryGeneratedColumn('uuid')
	@ApiProperty({ type: String })
	id: string;

	@Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
	@ApiProperty({ type: String })
	createdAt: string;

	@Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
	@ApiProperty({ type: String })
	updatedAt: string;

	@Column({ type: 'timestamp', nullable: true })
	@DeleteDateColumn()
	@ApiProperty({ type: String })
	deletedAt?: string;
}

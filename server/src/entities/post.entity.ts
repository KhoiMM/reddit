import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

// ----------------------------------------------------------------

@Entity({ name: 'posts' })
export class PostEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	postId!: number;

	@Column()
	title!: string;

	@Column()
	content!: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

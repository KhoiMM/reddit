import { Field, ID, ObjectType } from 'type-graphql';
import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

// ----------------------------------------------------------------

@ObjectType()
@Entity({ name: 'posts' })
export class PostEntity extends BaseEntity {
	@Field((_type) => ID)
	@PrimaryGeneratedColumn()
	postId!: number;

	@Field()
	@Column()
	title!: string;

	@Field()
	@Column()
	content!: string;

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;
}

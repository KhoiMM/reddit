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
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
	@Field((_type) => ID)
	@PrimaryGeneratedColumn()
	userId!: number;

	@Field()
	@Column({ unique: true })
	username!: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;
}

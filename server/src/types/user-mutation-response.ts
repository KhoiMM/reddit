import { UserEntity } from '../entities/user.entity';
import { Field, ObjectType } from 'type-graphql';
import { FieldError } from './error';
import { IMutationResponse } from './mutation-response';

// ------------------------------------------------------------------------

@ObjectType({ implements: IMutationResponse })
export class UserMuatationResponse implements IMutationResponse {
	code: number;
	success: boolean;
	message?: string | null;

	@Field((_type) => UserEntity, { nullable: true })
	user?: UserEntity | null;

	@Field((_type) => [FieldError], { nullable: true })
	errors?: FieldError[];
}

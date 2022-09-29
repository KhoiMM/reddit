import { UserEntity } from '../entities/user.entity';
import { Field, ObjectType } from 'type-graphql';
import { IResponse } from './response';
import { FieldError } from './error';

// ------------------------------------------------------------------------

@ObjectType({ implements: IResponse })
export class UserResponse implements IResponse {
	code: number;
	success: boolean;
	message?: string | null | undefined;
	errors?: FieldError[] | undefined;

	@Field((_type) => UserEntity, { nullable: true })
	user?: UserEntity | null;
}

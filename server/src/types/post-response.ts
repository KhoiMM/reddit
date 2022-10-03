import { Field, ObjectType } from 'type-graphql';

import { IResponse } from './response';
import { FieldError } from './error';
import { PostEntity } from '../entities/post.entity';

// ------------------------------------------------------------------------

@ObjectType({ implements: IResponse })
export class PostResponse implements IResponse {
	code: number;
	success: boolean;
	message?: string | null | undefined;
	errors?: FieldError[] | undefined;

	@Field((_type) => PostEntity, { nullable: true })
	post?: PostEntity | null;

	@Field((_type) => [PostEntity], { nullable: true })
	posts?: PostEntity[] | null;
}

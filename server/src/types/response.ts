import { Field, InterfaceType } from 'type-graphql';
import { FieldError } from './error';

// -----------------------------------------------------

@InterfaceType()
export abstract class IResponse {
	@Field()
	code: number;

	@Field()
	success: boolean;

	@Field((_type) => String, { nullable: true })
	message?: string | null;

	@Field((_type) => [FieldError], { nullable: true })
	errors?: FieldError[];
}

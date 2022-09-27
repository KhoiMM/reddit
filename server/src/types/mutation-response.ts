import { Field, InterfaceType } from 'type-graphql';

// -----------------------------------------------------

@InterfaceType()
export abstract class IMutationResponse {
	@Field()
	code: number;

	@Field()
	success: boolean;

	@Field((_type) => String, { nullable: true })
	message?: string | null;
}

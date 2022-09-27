import { Query, Resolver } from 'type-graphql';

// -------------------------------------------------

@Resolver()
export class HelloResolver {
	@Query((_type) => String)
	hello() {
		return 'Hello World!';
	}
}

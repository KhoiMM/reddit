import { HelloResolver } from './hello.resolver';
import { PostResolver } from './post.resolver';
import { UserResolver } from './user.resolver';

// ----------------------------------------------------------------

const resolvers: any = [HelloResolver, UserResolver, PostResolver];

// ----------------------------------------------------------------

export default resolvers;

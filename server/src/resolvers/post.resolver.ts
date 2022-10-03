import {
	Arg,
	Field,
	ID,
	InputType,
	Mutation,
	Query,
	Resolver,
} from 'type-graphql';

import { PostResponse } from '../types/post-response';
import { PostEntity } from '../entities/post.entity';

// -----------------------------------------------------------------------------------

@InputType()
class CreatePostInput {
	@Field()
	title: string;

	@Field()
	content: string;
}

// -----------------------------------------------------------------------------------

@Resolver()
export class PostResolver {
	@Mutation((_type) => PostResponse)
	async createPost(
		@Arg('createPostInput') createPostInput: CreatePostInput
	): Promise<PostResponse> {
		const { title, content } = createPostInput;
		try {
			const newPost = PostEntity.create({ title, content });
			await newPost.save();
			return {
				code: 201,
				success: true,
				post: newPost,
			} as PostResponse;
		} catch (error) {
			return {
				code: 500,
				success: false,
				message: `Internal server error: ${error.message}`,
			} as PostResponse;
		}
	}

	@Query((_type) => PostResponse)
	async getAllPosts(): Promise<PostResponse> {
		try {
			const allPostList = await PostEntity.find();
			return {
				code: 200,
				success: true,
				posts: allPostList,
			} as PostResponse;
		} catch (error) {
			return {
				code: 500,
				success: false,
				message: `Internal server error: ${error.message}`,
			} as PostResponse;
		}
	}

	@Query((_type) => PostResponse, { nullable: true })
	async getPostById(
		@Arg('postId', (_type) => ID) postId: number
	): Promise<PostResponse> {
		try {
			const post = await PostEntity.findOne({
				where: [{ postId }],
			});
			return {
				code: 200,
				success: true,
				post,
			} as PostResponse;
		} catch (error) {
			return {
				code: 500,
				success: false,
				message: `Internal server error: ${error.message}`,
			} as PostResponse;
		}
	}
}

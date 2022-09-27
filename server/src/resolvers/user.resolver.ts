import { UserEntity } from '../entities/user.entity';
import { Arg, Mutation, Resolver } from 'type-graphql';
import argon2 from 'argon2';

import { UserMuatationResponse } from '../types/user-mutation-response';
import { RegisterInput } from '../types/register-input';

// -------------------------------------------------

@Resolver()
export class UserResolver {
	@Mutation((_returns) => UserMuatationResponse, { nullable: true })
	async register(
		@Arg('registerInput') registerInput: RegisterInput
	): Promise<UserMuatationResponse> {
		try {
			const { username, email, password } = registerInput;

			const existedUser = await UserEntity.findOne({
				where: [{ username }, { email }],
			});

			if (existedUser) {
				return {
					code: 500,
					success: false,
					message: 'Duplicated Username or Email!',
					errors: [
						{
							field: existedUser.username === username ? 'username' : 'email',
							messsage: `${
								existedUser.username === username ? 'Username' : 'Email'
							} has been already taken!`,
						},
					],
				};
			}

			const hashedPassword = await argon2.hash(password);

			const newUser = UserEntity.create({
				username,
				password: hashedPassword,
				email,
			});

			return {
				code: 201,
				success: true,
				user: await UserEntity.save(newUser),
			} as UserMuatationResponse;
		} catch (error) {
			return {
				code: 500,
				success: false,
				message: `Internal server error: ${error.message}`,
			} as UserMuatationResponse;
		}
	}
}

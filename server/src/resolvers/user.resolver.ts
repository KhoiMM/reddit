import { UserEntity } from '../entities/user.entity';
import { Arg, Field, InputType, Mutation, Resolver } from 'type-graphql';

import { UserResponse } from '../types/user-response';
import { validateRegisterInput } from '../utils/validations/register.validation';

// -----------------------------------------------------------------------------------

@InputType()
class RegisterInput {
	@Field()
	username: string;

	@Field()
	email: string;

	@Field()
	password: string;
}

@InputType()
class LoginInput {
	@Field()
	username: string;

	@Field()
	password: string;
}

// -----------------------------------------------------------------------------------

@Resolver()
export class UserResolver {
	@Mutation((_type) => UserResponse)
	async register(
		@Arg('registerInput') registerInput: RegisterInput
	): Promise<UserResponse> {
		const validateRegisterInputErrors = validateRegisterInput(registerInput);

		if (validateRegisterInputErrors) {
			const { message, errors } = validateRegisterInputErrors;
			return {
				code: 400,
				success: false,
				message,
				errors: [
					{
						field: errors[0].field,
						messsage: errors[0].message,
					},
				],
			} as UserResponse;
		}

		try {
			const { username, email, password } = registerInput;

			const existedUser = await UserEntity.findOne({
				where: [{ username }],
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
				} as UserResponse;
			}

			const newUser = UserEntity.create({
				username,
				password,
				email,
			});

			return {
				code: 201,
				success: true,
				user: await UserEntity.save(newUser),
			} as UserResponse;
		} catch (error) {
			return {
				code: 500,
				success: false,
				message: `Internal server error: ${error.message}`,
			} as UserResponse;
		}
	}

	@Mutation((_type) => UserResponse)
	async login(
		@Arg('loginInput') loginInput: LoginInput
	): Promise<UserResponse> {
		try {
			const { username, password } = loginInput;

			const existedUser = await UserEntity.findOne({
				where: [{ username, password }],
			});

			if (existedUser) {
				return {
					code: 200,
					success: true,
					message: 'Logged in successfully!',
					user: existedUser,
				} as UserResponse;
			} else {
				return {
					code: 403,
					success: false,
					message: 'Invalid username or password',
					errors: [
						{
							field: 'username or password',
							messsage: 'Username or Password is invalid',
						},
					],
				} as UserResponse;
			}
		} catch (error) {
			return {
				code: 500,
				success: false,
				message: `Internal server error: ${error.message}`,
			} as UserResponse;
		}
	}
}

import { RegisterInput } from 'src/types/register-input';

// ------------------------------------------------------------------------

export function validateRegisterInput(registerInput: RegisterInput) {
	if (!registerInput.email.includes('@')) {
		return {
			message: 'Invalid email',
			errors: [
				{
					field: 'email',
					message: 'Email format is invalid!',
				},
			],
		};
	}

	if (registerInput.username.length <= 3) {
		return {
			message: 'Invalid username',
			errors: [
				{
					field: 'username',
					message: 'Username must have more than 3 characters!',
				},
			],
		};
	}

	if (registerInput.password.length <= 3) {
		return {
			message: 'Invalid password',
			errors: [
				{
					field: 'password',
					message: 'Password must have more than 3 characters!',
				},
			],
		};
	}

	return null;
}

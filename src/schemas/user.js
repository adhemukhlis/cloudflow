import valid from './_validator'

const userSchema = {
	type: 'object',
	properties: {
		fullname: { type: 'string', minLength: 4 },
		username: { type: 'string', minLength: 4 },
		email: { type: 'string' },
		password: { type: 'string', minLength: 8, maxLength: 32 },
		confirm_password: {
			const: {
				$data: '1/password'
			},
			type: 'string'
		}
	},
	required: ['fullname', 'username', 'email', 'password', 'confirm_password'],
	additionalProperties: false
}

const userValidator = (data) => valid(data, userSchema)
export default userValidator

import { withSessionRoute } from '@/utils/session-wrapper'
import userValidator from '@/schemas/user'
import apiService from '@/utils/apiService'

export default withSessionRoute(async (req, res) => {
	const { fullname, username, email, password, confirm_password, ...other } = req.body
	if (req.method === 'POST') {
		const [isUserValid, userInvalid] = userValidator({ fullname, username, email, password, confirm_password })
		if (isUserValid) {
			apiService
				.request({
					method: 'POST',
					url: '/auth/signup',
					data: { fullname, username, email, password, confirm_password }
				})
				.then((response) => {
					res.status(200).send({ message: `${email} registered successfully!` })
				})
				.catch((err) => {
					res.status(err?.status || 500).send({ message: err?.response?.data.message, errors: err?.response?.data.errors })
				})
		} else {
			res.status(400).send({
				message: 'Bad Request',
				errors: userInvalid.map((err) => `${err.message} : ${JSON.stringify(err.params)}`)
			})
		}
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
})

import { withSessionRoute } from '@/utils/session-wrapper'

import apiService from '@/utils/apiService'

export default withSessionRoute(async (req, res) => {
	const { username, password } = req.body
	if (req.method === 'POST') {
		apiService
			.request({
				method: 'POST',
				url: '/auth/signin',
				data: { username, password }
			})
			.then(async (response) => {
				req.session.auth = {
					access_token: response.data.result.accessToken
				}
				await req.session.save()
				res.status(200).send('')
			})
			.catch((err) => {
				res.status(err?.status ?? 500).send(err?.response || 'Unknown Error!!')
			})
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
})

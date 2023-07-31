import axios from 'axios'

const apiService = axios.create({
	baseURL: process.env.NEXT_BACKEND_API_HOST,
	timeout: 60000
})

export default apiService

import { Button, Card, Col, Form, Input, Row, Space, message, Typography } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import { withSession } from '@/utils/session-wrapper'
import routeGuard from '@/utils/route-guard'
import errorModal from '@/utils/error-modal'

const { Title } = Typography
const RegisterPage = () => {
	const [form] = Form.useForm()
	const [isLoading, setIsLoading] = useState(false)
	const handleSubmit = async (values) => {
		setIsLoading(true)
		const { fullname, username, email, password, confirm_password } = values
		return await axios
			.request({
				method: 'post',
				url: '/api/auth/register',
				data: { fullname, username, email, password, confirm_password }
			})
			.then((res) => {
				if (res.status === 200) {
					message.success(
						<Space>
							{res.data.message}
							<Link href="/login">
								<Button type="primary">Login Now!</Button>
							</Link>
						</Space>,
						5
					)
					form.resetFields()
				}
			})
			.catch((err) => {
				errorModal(err)
				form.setFieldValue('captcha', undefined)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<>
			<div
				style={{
					height: '100%',
					width: '40rem',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<Card
					bodyStyle={{ padding: 0, overflow: 'hidden' }}
					style={{
						padding: 0,
						width: '100%'
					}}>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Title level={2}>Register</Title>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							paddingLeft: '6rem',
							paddingRight: '6rem',
							paddingTop: '4rem'
						}}>
						<Form
							form={form}
							style={{
								width: '100%'
							}}
							initialValues={{ gender: 'male' }}
							onFinish={handleSubmit}
							autoComplete="off"
							layout="vertical"
							colon={false}>
							<Form.Item
								label="Full Name"
								name="fullname"
								rules={[
									{
										required: true,
										type: 'string'
									}
								]}>
								<Input />
							</Form.Item>
							<Form.Item
								label="Username"
								name="username"
								rules={[
									{
										required: true,
										type: 'string'
									}
								]}>
								<Input />
							</Form.Item>
							<Form.Item
								label="Email"
								name="email"
								rules={[
									{
										required: true,
										type: 'email',
										message: 'Please input your email!'
									}
								]}>
								<Input />
							</Form.Item>
							<Form.Item
								label="Password"
								name="password"
								rules={[
									{
										required: true,
										message: 'Please input your password!'
									}
								]}>
								<Input.Password />
							</Form.Item>
							<Form.Item
								name="confirm_password"
								label="Confirm Password"
								dependencies={['password']}
								hasFeedback
								rules={[
									{
										required: true,
										message: 'Please confirm your password!'
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue('password') === value) {
												return Promise.resolve()
											}
											return Promise.reject(new Error('The two passwords that you entered do not match!'))
										}
									})
								]}>
								<Input.Password />
							</Form.Item>
							<Form.Item>
								<Row justify="space-between">
									<Col>
										<Button type="primary" htmlType="submit" loading={isLoading}>
											Register Now!
										</Button>
									</Col>
									<Col>
										<Link href="/login">I already have an account</Link>
									</Col>
								</Row>
							</Form.Item>
						</Form>
					</div>
				</Card>
			</div>
		</>
	)
}

export default RegisterPage

export const getServerSideProps = withSession(async function ({ req }) {
	const access_token = req.session?.auth?.access_token
	const isLoggedOut = !access_token
	const validator = [isLoggedOut]
	return routeGuard(validator, '/', {
		props: {}
	})
})

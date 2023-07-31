import '@/styles/globals.css'
import React from 'react'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider, theme } from 'antd'
import { ReactFlowProvider } from 'reactflow'
if (!process.browser) React.useLayoutEffect = React.useEffect
const App = ({ Component, pageProps }) => {
	return (
		<StyleProvider hashPriority="high">
			<ConfigProvider
				theme={{
					algorithm: theme.lightAlgorithm,
					token: {
						fontFamily: 'verdana'
					}
				}}>
				<ReactFlowProvider>
					<div
						style={{
							minHeight: '100vh', // minHeight = heigh of screen - (margin top + margin bottom)
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<Component {...pageProps} />
					</div>
				</ReactFlowProvider>
			</ConfigProvider>
		</StyleProvider>
	)
}

export default App

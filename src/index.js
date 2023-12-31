import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from '@/src/App'
import reportWebVitals from './reportWebVitals'
import { ReactFlowProvider } from 'reactflow'
import { ConfigProvider, theme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<StyleProvider hashPriority="high">
		<ConfigProvider
			theme={{
				algorithm: theme.lightAlgorithm
			}}>
			<ReactFlowProvider>
				<App />
			</ReactFlowProvider>
		</ConfigProvider>
	</StyleProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

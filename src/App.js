import { shallow } from 'zustand/shallow'

import { ReactFlow, Panel, Background, MiniMap, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import './App.css'
import { useStore } from './store'
import ExampleData from './Custom Nodes/Input/ExampleDataNode'
import FilterNode from './Custom Nodes/Transform/FilterNode'
import SortNode from './Custom Nodes/Transform/SortNode'
import React from 'react'
import { Table } from 'antd'
import { ENUM_NODE } from './enums'
import ButtonAddBlock from './components/ButtonAddBlock'
const logoImage = require('./resources/images/logo.png')

const selector = (state) => ({
	nodes: state.nodes,
	edges: state.edges,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	addEdge: state.addEdge,
	outputData: state.outputData,
	addOutputData: state.addOutputData,
	removeOutputData: state.removeOutputData
})

const nodeTypes = {
	[ENUM_NODE.EXAMPLE_DATASET]: ExampleData,
	[ENUM_NODE.FILTER]: FilterNode,
	[ENUM_NODE.SORT]: SortNode
}
const nodeOrigin = [0.5, 0.5]
function App() {
	const { nodes, edges, onNodesChange, onEdgesChange, addEdge, outputData, addOutputData, removeOutputData } = useStore(
		selector,
		shallow
	)
	const onNodeClick = (e, node) => {
		console.log('node', node)
		addOutputData(node.data.dataNow)
	}

	const onPaneClick = () => {
		removeOutputData()
	}

	const columns = [
		{
			title: 'country',
			dataIndex: 'country',
			key: 'country'
		},
		{
			title: 'life_expectancy',
			dataIndex: 'life_expectancy',
			key: 'life_expectancy'
		},
		{
			title: 'population',
			dataIndex: 'population',
			key: 'population'
		},
		{
			title: 'income',
			dataIndex: 'income',
			key: 'income'
		}
	]
	return (
		<div className="app">
			<div className="header-app-cont">
				<div className="header-app-cont__left-menu">
					<a href="#" className="header-app-cont__left-menu__anchor">
						<img src={logoImage} alt="image-logo" className="header-app-cont__header-app-cont__img-logo" />
					</a>
				</div>
				<div className="header-app-cont__title-app">
					<h4 className="title__title-app">Cloud Flow</h4>
				</div>
			</div>
			<div className="reactflow-cont">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					nodeTypes={nodeTypes}
					nodeOrigin={nodeOrigin}
					onConnect={addEdge}
					onNodeClick={onNodeClick}
					onPaneClick={onPaneClick}
					fitView>
					<Panel position="top-left">
						<ButtonAddBlock />
					</Panel>
					<Background />
					<MiniMap className="" maskColor="#201f34" nodeColor="#333154" />
					<Controls style={{ backgroundColor: '#1a192b' }} />
				</ReactFlow>
			</div>
			<div className="output-logs-cont">
				<div className="output-logs-cont__output-cont">
					<h5 className="output-logs-cont__output-cont__title output-logs-title">OUTPUT</h5>
					<div className="output-logs-cont__output-cont__output">
						{outputData?.length !== 0 ? (
							<Table
								rowKey="country"
								dataSource={outputData}
								columns={columns}
								pagination={{ position: ['none'] }}
								scroll={{
									y: 240
								}}
							/>
						) : (
							<></>
						)}
					</div>
				</div>
				<div className="output-logs-cont__logs-cont">
					<h5 className="output-logs-cont__output-cont__title output-logs-title">LOGS</h5>
				</div>
			</div>
		</div>
	)
}

export default App

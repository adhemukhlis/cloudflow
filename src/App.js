import { shallow } from 'zustand/shallow'

import { ReactFlow, Panel, Background, MiniMap, useStoreApi, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import './App.css'
import { useStore } from './store'
import ExampleData from './Custom Nodes/Input/ExampleDataNode'
import FilterNode from './Custom Nodes/Transform/FilterNode'
import JsonTable from './components/JsonTable'

const logoImage = require('./resources/images/logo.png')

const selector = (state) => ({
	nodes: state.nodes,
	edges: state.edges,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	addEdge: state.addEdge
})

const nodeTypes = {
	example_node: ExampleData,
	filter_node: FilterNode
}
const nodeOrigin = [0.5, 0.5]
function App() {
	const { nodes, edges, onNodesChange, onEdgesChange, addEdge, outputData } = useStore(selector, shallow)

	function blockBtnClicked(e) {}
	return (
		<div className="app">
			<div className="overlay">
				<div className="sidebar__overlay">
					<h2>Block Library</h2>
					<ul className="children__sidebar__overlay">
						<li>Input </li>
						<li>Transform</li>
						<li>Output</li>
					</ul>
				</div>

				<div className="contents__overlay">
					<div className="block-cont-input__contents__overlay">
						<h3>Input</h3>
						<div className="blocks-cont__block-cont-input"></div>
					</div>
				</div>
			</div>
			<div className="header-app-cont">
				<div className="header-app-cont__left-menu">
					<a href="#" className="header-app-cont__left-menu__anchor">
						<img src={logoImage} alt="image-logo" className="header-app-cont__header-app-cont__img-logo" />
					</a>
					<div className="header-app-cont__left-menu__buttons-left-cont">
						<button className=" header-btn left-menu__buttons-left-cont__view-btn">VIEW</button>
						<button className="header-btn left-menu__buttons-left-cont__help-btn">HELP</button>
					</div>
				</div>
				<div className="header-app-cont__title-app">
					<h4 className="title__title-app">Cloud Flow</h4>
				</div>
				<div className="header-app-cont__right-menu">
					<div className="header-app-cont__right-menu__buttons-anchor-right-cont">
						<a className="header-btn right-menu__buttons-anchor-right-cont__login-btn">LOGIN</a>
						<a className="header-btn right-menu__buttons-anchor-right-cont__signup-btn">SIGN UP</a>
					</div>
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
					fitView>
					<Panel position="top-left">
						<div className="block-btn">+ block</div>
					</Panel>
					<Background></Background>
					<MiniMap
						className=""
						maskColor="
          #201f34"
						nodeColor="#333154"></MiniMap>
            <Controls style={{backgroundColor: "#1a192b",}} />
				</ReactFlow>
			</div>
			<div className="output-cont">
				<h2 className="title__output-cont">OUTPUT</h2>
				{/* {console.log(outputData)} */}
				{/* {outputData?.length !== 0  ? ( <JsonTable data={outputData} />) : ""} */}
			</div>
		</div>
	)
}

export default App

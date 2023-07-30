import { shallow } from 'zustand/shallow'

import { ReactFlow, Panel, Background, MiniMap, useStoreApi, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import './App.css'
import { useStore } from './store'
import ExampleData from './Custom Nodes/Input/ExampleDataNode'
import FilterNode from './Custom Nodes/Transform/FilterNode'
import SortNode from './Custom Nodes/Transform/SortNode'
import JsonTable from './components/JsonTable'
import { useEffect, useRef } from 'react'
import React from 'react';
import { Table } from 'antd';

const logoImage = require('./resources/images/logo.png')

const selector = (state) => ({
	nodes: state.nodes,
	edges: state.edges,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	addEdge: state.addEdge,
	addNode: state.addNode,
	outputData: state.outputData,
	
	addOutputData: state.addOutputData,
	removeOutputData: state.removeOutputData,
})

const nodeTypes = {
	input_example_node: ExampleData,
	transform_filter_node: FilterNode,
	transform_sort_node: SortNode
}
const nodeOrigin = [0.5, 0.5]
function App() {
	const { nodes, edges, onNodesChange, onEdgesChange, addEdge,addNode, outputData, addOutputData, removeOutputData } = useStore(selector, shallow);
	

	const onNodeClick = (e, node) => {
		addOutputData(node.data.dataNow);
		
	}

	const onPaneClick = () => {
		removeOutputData();
	}
	
	/**
	 * Function for clicked modal block
	 * @param e Event from dom
	 */
	const clickedModalBlock = (e) =>{
		//Input node
		const element = e.target.closest('.block-item');
		console.log(element.getAttribute('data-testid'))
		if(element.getAttribute('data-testid') === "block-item-exampledata"){
			addNode({type: 'input_example_node'});
		}

		//Transform Node
		if(element.getAttribute('data-testid') === "block-item-filter"){
			addNode({type: 'transform_filter_node'})
		}else if(element.getAttribute('data-testid') === "block-item-sort"){
			addNode({type: 'transform_sort_node'})
		}


		toggleOverlay(); //for turn off the overlay and modal
	}

	const overlayEl = useRef(null);
	const modalEl = useRef(null);
	const buttonCloseOverlay = useRef(null);
	const toggleOverlay = () => {
		const overlayDisplay = getComputedStyle(overlayEl.current).display
		const modalDisplay = getComputedStyle(modalEl.current).display
		overlayEl.current.style.display = overlayDisplay === 'none' ? 'flex' : 'none'
		modalEl.current.style.display = modalDisplay === 'none' ? 'flex' : 'none'
	}
	const toggleOverlayForBlockBtnOrOverlayEl = (e) => {
		toggleOverlay()
	}
	const toggleOverlayForCloseBtn = (e) => {
		toggleOverlay()
	}
	return (
		<div className="app">
			<div className="overlay" ref={overlayEl} onClick={toggleOverlayForBlockBtnOrOverlayEl}></div>
			<div className="modal" ref={modalEl}>
				<div className="modal__detail">
					<div className="modal__detail__sidebar">
						<h3 className="detail__sidebar__title">Block Library</h3>
						<input
							type="text"
							className="detail__sidebar__input"
							name="search-node"
							id="search-node"
							placeholder="Search..."
						/>
						<ul className="detail__sidebar__ul-node">
							<li>Input </li>
							<li>Transform</li>
							<li>Visualisation</li>
						</ul>
					</div>
					<div className="modal__detail__contents">
						<div className="detail__contents__block-cont-node">
							<h4 className="contents__block-cont-input-node__title block-cont-node__title">Input</h4>
							<div className="block-cont-input-node__blocks-cont blocks-cont">
								<div data-testid="block-item-file" className="block-item" >
									<div className="block-item__title">File</div>
									<div className="block-item__sub-title">Handles csv, json, geojson or topojson files.</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: -</div>
										<div className="block-item__input-output-cont__output-text">Output: Dataset, Geojson</div>
									</div>
								</div>
								<div data-testid="block-item-paste" className="block-item">
									<div className="block-item__title">Paste</div>
									<div className="block-item__sub-title">Paste input: string, number, csv, json, geojson or topojson.</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: -</div>
										<div className="block-item__input-output-cont__output-text">
											Output: Dataset, Object, String, Number, Geojson
										</div>
									</div>
								</div>
								<div data-testid="block-item-request" className="block-item css-u91er0">
									<div className="block-item__title"> HTTP Request</div>
									<div className="block-item__sub-title">Loads data via a http request.</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: -</div>
										<div className="block-item__input-output-cont__input-text">Output: Dataset, Object, Geojson</div>
									</div>
								</div>
								<div data-testid="block-item-spreadsheet" className="block-item css-u91er0">
									<div className="block-item__title"> Sheets</div>
									<div className="block-item__sub-title">Loads data from google sheets.</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: -</div>
										<div className="block-item__input-output-cont__input-text">Output: Dataset</div>
									</div>
								</div>
								<div data-testid="block-item-exampledata" className="block-item css-u91er0" onClick={clickedModalBlock}>
									<div className="block-item__title"> Example Data</div>
									<div className="block-item__sub-title">Some example data for playing around with data blocks.</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: -</div>
										<div className="block-item__input-output-cont__input-text">Output: Dataset, Geojson</div>
									</div>
								</div>
							</div>
							<h4 className="contents__block-cont-transform-node__title block-cont-node__title">Transform</h4>
							<div className="block-cont-transform-node__blocks-cont blocks-cont">
								<div data-testid="block-item-filter" className="block-item css-u91er0" onClick={clickedModalBlock}>
									<div className="block-item__title"> Filter</div>
									<div className="block-item__sub-title">Groups a data set based on a given column name.</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: Dataset</div>
										<div className="block-item__input-output-cont__output-text">Output: Dataset</div>
									</div>
								</div>
								<div data-testid="block-item-merge" className="block-item css-u91er0">
									<div className="block-item__title"> Merge</div>
									<div className="block-item__sub-title">Merges two data sets based on the given column names.</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: Dataset, Geojson</div>
										<div className="block-item__input-output-cont__output-text">Output: Dataset</div>
									</div>
								</div>
								<div data-testid="block-item-grouping" className="block-item css-u91er0">
									<div className="block-item__title"> Group</div>
									<div className="block-item__sub-title">Groups a data set based on a given column name.</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: Dataset, Geojson</div>
										<div className="block-item__input-output-cont__input-text">Output: Dataset</div>
									</div>
								</div>
								<div data-testid="block-item-slice" className="block-item css-u91er0">
									<div className="block-item__title"> Slice</div>
									<div className="block-item__sub-title">Slices a data set based on indices.</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: Dataset, Array</div>
										<div className="block-item__input-output-cont__input-text">Output: Dataset</div>
									</div>
								</div>
								<div data-testid="block-item-sort" className="block-item css-u91er0"  onClick={clickedModalBlock}>
									<div className="block-item__title"> Sort</div>
									<div className="block-item__sub-title">Sorts data based on a given column.</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: Dataset</div>
										<div className="block-item__input-output-cont__input-text">Output: Dataset</div>
									</div>
								</div>
								<div data-testid="block-item-rename-cols" className="block-item css-u91er0">
									<div className="block-item__title"> Rename Columns</div>
									<div className="block-item__sub-title">Renames multiple columns.</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: Dataset</div>
										<div className="block-item__input-output-cont__input-text">Output: Dataset</div>
									</div>
								</div>
								<div data-testid="block-item-js" className="block-item css-u91er0">
									<div className="block-item__title"> Javascript</div>
									<div className="block-item__sub-title">
										The most powerful node! Takes two inputs (can be everything) and lets you transform it with Javascript.
									</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: All types</div>
										<div className="block-item__input-output-cont__input-text">Output: All types</div>
									</div>
								</div>
								<div data-testid="block-item-geocode" className="block-item css-u91er0">
									<div className="block-item__title"> Geocode</div>
									<div className="block-item__sub-title">
										Adds latitude and longitude to each entry of a data set. Can be used with Here or Google Maps.
									</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: Dataset</div>
										<div className="block-item__input-output-cont__input-text">Output: Dataset</div>
									</div>
								</div>
								<div data-testid="block-item-colorize" className="block-item css-u91er0">
									<div className="block-item__title"> Colorize</div>
									<div className="block-item__sub-title">Adds color property to each entry of a data set or geojson.</div>
									<div className="block-item__input-output-cont">
										<div className="block-item__input-output-cont__input-text">Input: Dataset, Geojson</div>
										<div className="block-item__input-output-cont__input-text">Output: Dataset</div>
									</div>
								</div>
							</div>
							<div className="css-1a2win1"></div>
						</div>
						<div className="detail__contents__close-cont" ref={buttonCloseOverlay}>
							<button className="contents__close-cont__close-btn" onClick={toggleOverlayForCloseBtn}>
								X
							</button>
						</div>
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
					onNodeClick={onNodeClick}
					onPaneClick={onPaneClick}
					fitView>
					<Panel position="top-left">
						<div className="block-btn" onClick={toggleOverlay}>
							+ block
						</div>
					</Panel>
					<Background></Background>
					<MiniMap
						className=""
						maskColor="
          #201f34"
						nodeColor="#333154"></MiniMap>
					<Controls style={{ backgroundColor: '#1a192b' }} />
				</ReactFlow>
			</div>
			<div className="output-logs-cont">
				<div className="output-logs-cont__output-cont">
					<h5 className="output-logs-cont__output-cont__title output-logs-title">OUTPUT</h5>
					<div className="output-logs-cont__output-cont__output">
					{outputData?.length !== 0  ? ( <JsonTable data={outputData} />) : ""}
					</div>
				</div>

				<div className="output-logs-cont__logs-cont"> 
					<h5 className="output-logs-cont__output-cont__title output-logs-title">LOGS</h5>
				</div>

				{/* {console.log(outputData)} */}
				
			</div>
		</div>
	)
}

export default App

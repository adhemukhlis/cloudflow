import React, { useRef, useState } from 'react'
import { Handle, Position, useStoreApi } from 'reactflow'
import FilterListColumn from '../../components/Transform Nodes/FIlterListColumn'
import { shallow } from 'zustand/shallow'
import { useStore } from '../../store'
const selector = (state) => ({
	outputData: state.outputData,
	inputData: state.inputData,
	addOutputData: state.addOutputData,
	removeOutputData: state.removeOutputData,
	updateDataNode: state.updateDataNode
})

function FilterNode(node) {
	const { addOutputData, removeOutputData, inputData, updateDataNode } = useStore(selector, shallow)

	const [isShowInput, setIsShowInput] = useState(false)
	const inputSelectSort = useRef(null)
	const selectColumnName = useRef(null)
	const selectSort = useRef(null)
	console.log(node)
	// console.log(node.previousNodeData);

	function customSort(a, b, key, order) {
		if (typeof a[key] === 'string' && typeof b[key] === 'string') {
			return order === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])
		} else if (typeof a[key] === 'number' && typeof b[key] === 'number') {
			return order === 'asc' ? a[key] - b[key] : b[key] - a[key]
		} else if (typeof a[key] === 'string') {
			return -1 // Sort strings before numbers
		} else {
			return 1 // Sort numbers after strings
		}
	}
	const onChangeSelectOrder = (e) => {
		// console.log(e.target.value);
		if (selectSort.current.value === 'ascending') {
			console.log(selectColumnName.current.value)
			const sortedData = node.data.previousNodeData.sort((a, b) => customSort(a, b, selectColumnName.current.value, 'asc'))

			updateDataNode(node.id, sortedData)
		} else if (selectSort.current.value === 'descending') {
			console.log(selectColumnName.current.value)
			const sortedData = node.data.previousNodeData.sort((a, b) =>
				customSort(a, b, selectColumnName.current.value, 'desc')
			)
			console.log(sortedData)

			updateDataNode(node.id, sortedData)
		}
	}

	// if(inputSelectSort.current?.value)  inputSelectSort.current.value = '';

	return (
		<div className="filter-data-node  cont-custom-node">
			<Handle
				className="handle-left-custom-node handle-left__filter-data-node"
				type="target"
				position={Position.Left}></Handle>
			<div className="detail-node">
				<div className="heading-node heading__filter-data-node">
					<h5 className="title__heading-node">Sort</h5>
					<div className="close">X</div>
				</div>
				<div className="detail-indicators-cont__filter-data-node">
					<div className="input-cont__detail-indicators-cont">
						<label htmlFor="indicators" className="label-for-input">
							Column name :{' '}
						</label>
						<div className="cont-indicators__detail-indicators-cont">
							<select
								name="indicators"
								id="indicators"
								ref={selectColumnName}
								className="input-inside-node select-inside-node">
								{Object.entries(node.data.previousNodeData).length === 0 ? (
									<option value="empty">connect dataset...</option>
								) : (
									<FilterListColumn needFilterData={node.data.previousNodeData} />
								)}
							</select>
						</div>
						{Object.entries(node.data.previousNodeData).length > 0 ? (
							<>
								<label htmlFor="condition" className="label-for-input">
									Condition :{' '}
								</label>
								<select
									name="condition"
									id="condition"
									className="input-inside-node select-inside-node"
									ref={selectSort}
									onChange={onChangeSelectOrder}>
									<option value="ascending">Ascending</option>
									<option value="descending">Descending</option>
									{/* <option value="data-not-includes">text does not includes</option> */}
								</select>
								{isShowInput && <input type="text" className="input-inside-node" ref={inputSelectSort} />}
							</>
						) : (
							' '
						)}
					</div>
					{/* <button className="btn-node filter-data-node__run-btn" onClick={onClickedRun}>Run</button> */}
				</div>
			</div>
			<Handle
				className="handle-right-custom-node handle-right__filter-data-node"
				type="source"
				position={Position.Right}></Handle>
		</div>
	)
}

export default FilterNode

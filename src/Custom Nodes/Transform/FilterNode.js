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
	const inputSelectCondition = useRef(null)
	const selectColumnName = useRef(null)
	const selectCondition = useRef(null)
	const onClickedRun = (e) => {
		let filteredData = []
		if (selectCondition.current.value === 'data-not-null') {
			const filteredData = node.data.previousNodeData.filter((obj) => {
				return obj[selectColumnName.current.value] !== null
			})

			updateDataNode(node.id, filteredData)
		} else if (selectCondition.current.value === 'text-is-exactly') {
			const filteredData = node.data.previousNodeData.filter((obj) => {
				return obj[selectColumnName.current.value] === inputSelectCondition.current.value
			})

			updateDataNode(node.id, filteredData)
		} else if (selectCondition.current.value === 'text-is-includes') {
			const filteredData = node.data.previousNodeData.filter((obj) => {
				return String(obj[selectColumnName.current.value])?.includes(inputSelectCondition.current.value)
			})

			updateDataNode(node.id, filteredData)
		} else if (selectCondition.current.value === 'text-does-not-includes') {
			const filteredData = node.data.previousNodeData.filter((obj) => {
				return !String(obj[selectColumnName.current.value])?.includes(inputSelectCondition.current.value)
			})

			updateDataNode(node.id, filteredData)
		} else if (selectCondition.current.value === 'text-is-not-exactly') {
			const filteredData = node.data.previousNodeData.filter((obj) => {
				return String(obj[selectColumnName.current.value]) !== inputSelectCondition.current.value
			}) 

			updateDataNode(node.id, filteredData)
		} else if (selectCondition.current.value === 'number-equals') {
			const filteredData = node.data.previousNodeData.filter((obj) => {
				return obj[selectColumnName.current.value] === inputSelectCondition.current.value
			})

			updateDataNode(node.id, filteredData)
		} else if (selectCondition.current.value === 'number-is-greater-than') {
			const filteredData = node.data.previousNodeData.filter((obj) => {
				return obj[selectColumnName.current.value] > inputSelectCondition.current.value
			})

			updateDataNode(node.id, filteredData)
		} else if (selectCondition.current.value === 'number-is-greater-than-or-equals') {
			const filteredData = node.data.previousNodeData.filter((obj) => {
				return obj[selectColumnName.current.value] >= inputSelectCondition.current.value
			})

			updateDataNode(node.id, filteredData)
		} else if (selectCondition.current.value === 'number-is-less-than') {
			const filteredData = node.data.previousNodeData.filter((obj) => {
				return obj[selectColumnName.current.value] < inputSelectCondition.current.value

      }) 

			updateDataNode(node.id, filteredData)
		} else if (selectCondition.current.value === 'number-is-less-than-or-equals') {
			const filteredData = node.data.previousNodeData.filter((obj) => {
				return obj[selectColumnName.current.value] <= inputSelectCondition.current.value
      }) 

			updateDataNode(node.id, filteredData)
		} else {
			updateDataNode(node.id, node.data.previousNodeData)
		}
	}
	const onChangeSelectCondition = (e) => {
		if (e.target.value === 'select-condition' || e.target.value === 'data-not-null') {
			setIsShowInput(false)
		} else {
			setIsShowInput(true)
		}

		if (inputSelectCondition.current?.value) inputSelectCondition.current.value = ''
	}

	return (
		<div className="filter-data-node  cont-custom-node">
			<Handle
				className="handle-left-custom-node handle-left__filter-data-node"
				type="target"
				position={Position.Left}></Handle>
			<div className="detail-node">
				<div className="heading-node heading__filter-data-node">
					<h5 className="title__heading-node">Filter</h5>
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
									ref={selectCondition}
									onChange={onChangeSelectCondition}>
									<option value="select-condition">select condition</option>
									<option value="data-not-null">data is not empty or null</option>
									{typeof node.data.previousNodeData[1][selectColumnName.current.value] === 'number' ? (
										<>
											<option value="number-equals">number equals</option>
											<option value="number-is-greater-than-or-equals">number is greater than or equals</option>
											<option value="number-is-greater-than">number is greater than </option>
											<option value="number-is-less-than">number is less than </option>
											<option value="number-is-less-than-or-equals">number is less than or equals</option>
											<option value="text-does-not-includes">text does not includes</option>
										</>
									) : (
										<>
											<option value="text-is-exactly">text is exactly</option>
											<option value="text-is-not-exactly">text is not exactly</option>
											<option value="text-is-includes">text is includes</option>
											<option value="text-does-not-includes">text does not includes</option>
										</>
									)}

									{/* <option value="data-not-includes">text does not includes</option> */}
								</select>
								{isShowInput && <input type="text" className="input-inside-node" ref={inputSelectCondition} />}
							</>
						) : (
							' '
						)}
					</div>
					<button className="btn-node filter-data-node__run-btn" onClick={onClickedRun}>
						Run
					</button>
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

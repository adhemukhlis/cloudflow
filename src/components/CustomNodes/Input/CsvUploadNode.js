import React, { useRef, useState } from 'react'
import { Handle, Position } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { useStore } from "@store"

const selector = (state) => ({

	updateNodeByKey: state.updateNodeByKey
})

function CsvUploadNode({ id, data }) {
	const { updateNodeByKey } = useStore(
		selector,
		shallow
	)
	const inputEl = useRef(null)

	const [file, setFile] = useState(null)
	const [isDragging, setIsDragging] = useState(false)

	const handleDragEnter = (e) => {
		e.preventDefault()
		if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
			setIsDragging(true)
		}
	}
	const handleDragLeave = (e) => {
		e.preventDefault()
		if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
			setIsDragging(false)
		}
	}
	const handleDragOver = (e) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragDrop = async (e) => {
		e.preventDefault()
		setIsDragging(false)
		const file = e.dataTransfer.files[0]
		setFile(file)
	}

	const handleFileInputChange = (e) => {
		setFile(file)
		updateNodeByKey({id: id, key: 'fileName',data: file.name });
	}
	return (
		<div
			className={'input-file-node cont-custom-node'}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDragDrop}>
			<div className={`detail-node ${isDragging ? 'active' : ''}`}>
				<div className="heading-node input-file-node__heading">
					<h5 className="heading-node__title">File</h5>
					<div className="close">X</div>
				</div>
				<div className="input-file-node__input-file-cont">
				{!file ? (
					<>
					<div className="input-file-cont__drop-and-file-dialog-cont">
							<p className="drop-and-file-dialog-cont__drop-file-text">
								Drop the file here or
							</p>
							<button className="drop-and-file-dialog-cont__open-file-dialog-btn" onClick={() => inputEl.current.click()}>
								Open File Dialog
							</button>
						</div>
						<input
							name="file"
							type="file"
							accept=".csv"
							id="file"
							className="input-file-cont__input-el"
							ref={inputEl}
							onChange={handleFileInputChange}
						/>
						<span className="label-for-input">Allowed Types: csv</span>
					</>
						
				) : (
					<p>{file?.name || data?.fileName}</p>
				)}
					</div>
			</div>
			<Handle
				className="handle__input-file-node handle-right-custom-node"
				type="source"
				position={Position.Right}></Handle>
		</div>
	)
}

export default CsvUploadNode

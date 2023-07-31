import React, { useRef, useState } from 'react'
import { Handle, Position } from 'reactflow'
// import { parse } from 'csv-parse'

// import csvParse from 'csv-parse';
// import { parse } from 'csv-parse';

function CsvUploadNode({ id, data }) {
	const inputEl = useRef(null)

	useState
	const [isDragging, setIsDragging] = useState(false)

	const handleDragEnter = (e) => {
		e.preventDefault()
		if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
			setIsDragging(true);
		  }
	}
	const handleDragLeave = (e) => {
		e.preventDefault()
		if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
			setIsDragging(false);
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
		const csvData = await fetch(file).then((response) => response.text())

	}
	// Use the readable stream api to consume records

	const handleFileInputChange = (e) => {
		console.log(e.target.files)
	}
	return (
		<div
			className={'input-file-node cont-custom-node'}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDragDrop}
			>
			<div className={`detail-node ${isDragging ? 'active' : ''}`}>
				<div className="heading-node input-file-node__heading">
					<h5 className="heading-node__title">File</h5>
					<div className="close">X</div>
				</div>
				<div className="input-file-node__input-file-cont">
					<div className="input-file-cont__drop-and-file-dialog-cont">
						<p className="drop-and-file-dialog-cont__drop-file-text">
							{/* {isDragging ? 'Drop the file here or ' : 'Drag file here or'}{' '} */}
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

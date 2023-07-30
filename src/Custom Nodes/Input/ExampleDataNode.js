import React from 'react'
import { Handle, Position } from 'reactflow'

function ExampleDataNode({ id, data }) {
	return (
		<div className="example-data-node cont-custom-node">
			<div className="detail-node">
                <div className="heading-node heading__example-data-node">
                    <h5 className="title__heading-node">Example Data</h5>
                    <div className="close">X</div>
                </div>
                <div className="input-indicators-cont__example-data-node">
                    <select name="indicators" id="indicators" className="input-inside-node select-inside-node">
                        <option value="Countries Indicators">Countries Indicators</option>
                    </select>
                    {/* <div className="dropdown-icon">
                        <svg
                            viewBox="0 0 24 24"
                            role="presentation"
                            focusable="false"
                            aria-hidden="true"
                            style="width: 1em; height: 1em; color: currentcolor;">
                            <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                        </svg>
                    </div> */}
                </div>
            </div>
			<Handle className="handle__example-data-node handle-right-custom-node" type="source" position={Position.Right}></Handle>
		</div>
	)
}

export default ExampleDataNode

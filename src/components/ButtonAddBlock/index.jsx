import { Button, Modal, Row, Col, Input, Divider, Card, Typography, Badge, Alert } from 'antd'
import React, { useState } from 'react'
import { uniq } from 'lodash'
import { upper } from 'case'
import { shallow } from 'zustand/shallow'

import { IconGrid_2Plus, IconPlus } from '../icons'
import { useStore } from '@/store'
import { ENUM_NODE } from '@/enums'
const { Search } = Input
const { Text, Paragraph } = Typography
const BLOCK_LIST = [
	{
		id: 1,
		nodeEnum: ENUM_NODE.EXAMPLE_DATASET,
		label: 'Example Data',
		type: 'input',
		description: 'Some example data for playing around with data blocks.',
		inputTypes: ['-'],
		outputTypes: ['dataset']
	},
	{
		id: 2,
		nodeEnum: ENUM_NODE.FILTER,
		label: 'Filter',
		type: 'transform',
		description: 'Groups a data set based on a given column name.',
		inputTypes: ['dataset'],
		outputTypes: ['dataset']
	},
	{
		id: 3,
		nodeEnum: ENUM_NODE.SORT,
		label: 'Sort',
		type: 'transform',
		description: 'Sorts data based on a given column.',
		inputTypes: ['dataset'],
		outputTypes: ['dataset']
	},
	{
		id: 4,
		nodeEnum: ENUM_NODE.CSV_UPLOAD,
		label: 'File',
		type: 'input',
		description: 'Handle CSV files',
		inputTypes: ['-'],
		outputTypes: ['dataset']
	}
]
const BLOCK_CATEGORY = uniq(BLOCK_LIST.map((item) => item.type)).map((item) => ({ value: item, label: upper(item) }))
const selector = (state) => ({
	addNode: state.addNode
})
const ButtonAddBlock = () => {
	const { addNode } = useStore(selector, shallow)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState(undefined)
	const [blockList, setBlockList] = useState(BLOCK_LIST || [])
	const groupingBlocks = uniq(blockList.map((item) => item.type)).map((item) => ({
		category: upper(item),
		blocks: blockList.filter((filterItem) => filterItem.type === item)
	}))
	const handleClick = () => {
		setIsModalOpen(true)
	}
	const handleClose = () => {
		setIsModalOpen(false)
	}
	const handleCategoryClick = (value) => {
		setBlockList(BLOCK_LIST.filter((item) => item.type === value))
		setSelectedCategory(value)
	}
	const handleClearCategoryClick = () => {
		setSelectedCategory(undefined)
		setBlockList(BLOCK_LIST)
	}
	const handleAddNode = (nodeEnum) => {
		addNode({ type: nodeEnum })
		setIsModalOpen(false)
	}
	return (
		<>
			<Button shape="round" icon={<IconGrid_2Plus />} onClick={handleClick}>
				Blocks
			</Button>
			<Modal title="Block Library" width="80vw" open={isModalOpen} onCancel={handleClose} footer={null}>
				<Row gutter={24}>
					<Col span={6}>
						<Search placeholder="search..." onSearch={() => {}} style={{ width: '100%' }} />
						<Divider />
						{BLOCK_CATEGORY.map((itemMenu, index) => (
							<Button
								key={itemMenu.value + index}
								type="text"
								block
								style={{ marginBottom: '0.4rem', textAlign: 'left' }}
								onClick={() => handleCategoryClick(itemMenu.value)}>
								{itemMenu.label}
							</Button>
						))}
					</Col>
					<Col span={18}>
						{selectedCategory && (
							<Alert
								message={selectedCategory}
								style={{ width: 'fit-content' }}
								closable
								afterClose={handleClearCategoryClick}
							/>
						)}
						{groupingBlocks.map((item, index) => (
							<Row key={`block-group-${index}`} gutter={[24, 24]}>
								<Col span={24}>
									<Divider orientation="left">{item.category}</Divider>
								</Col>
								{item.blocks.map((filteredItem, filteredIdex) => (
									<Col key={`block-${filteredIdex}`} span={8}>
										<Card hoverable>
											<div style={{ display: 'flex', flexDirection: 'column' }}>
												<Text strong>{filteredItem.label}</Text>
												<Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>{filteredItem.description}</Paragraph>
												<Badge color="blue" text={'input : ' + filteredItem.inputTypes.join(',')} />
												<Badge color="green" text={'output : ' + filteredItem.outputTypes.join(',')} />
											</div>
											<Button
												block
												style={{ marginTop: '0.4rem' }}
												icon={<IconPlus />}
												onClick={() => handleAddNode(filteredItem.nodeEnum)}>
												Add
											</Button>
										</Card>
									</Col>
								))}
							</Row>
						))}
					</Col>
				</Row>
			</Modal>
		</>
	)
}
export default ButtonAddBlock

import { create } from 'zustand'
import { applyNodeChanges, applyEdgeChanges } from 'reactflow'
import { customAlphabet } from 'nanoid'

// use custom alphabet for reason avoiding identifier symbol like (_-;+,)
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 64)

import CountriesData from '@/sample-data/countries.json'
import { ENUM_NODE } from '@/enums'

const parsedJSON = JSON.parse(JSON.stringify(CountriesData))
export const useStore = create((set, get) => ({
	nodes: [],
	edges: [],
	inputData: [],
	outputData: [],
	updateDataNode: (id, data) => {
		const nodes = get().nodes.map((node) => {
			if (node.id === id) {
				node.data.dataNow = data
			}
			return node
		})
		set({ nodes: [...nodes], outputData: [...data] })
	},
	addOutputData: async (data) => {
		// await new Promise(resolve => setTimeout(resolve, 1000));
		set({ outputData: data })
	},
	removeOutputData: () => {
		set({ outputData: [] })
	},
	onNodesChange: (changes) => {
		set({
			nodes: applyNodeChanges(changes, get().nodes)
		})
	},
	onEdgesChange: (changes) => {
		set({
			edges: applyEdgeChanges(changes, get().edges)
		})
	},

	addNode: ({ type }) => {
		const id = `${type}-${nanoid()}`
		let data = []
		if (type === ENUM_NODE.EXAMPLE_DATASET) {
			data = parsedJSON
		}
		const newNode = {
			id: id,
			data: { dataNow: data, previousNodeData: [] },
			previousNode: '',
			tree: {
				id: id,
				children: []
			},
			type: type,
			position: { x: 0, y: 0 }
		}
		set({ nodes: [...get().nodes, newNode] })
	},

	addEdge: (data) => {
		const sourceNode = get().nodes.find((node) => node.id === data.source)

		if (sourceNode.type.split('_')[0] === 'input') {
			const inputData = {
				id: sourceNode.id,
				data: data
			}
			set({ inputData: [...get().inputData, inputData] })
		}
		const changedNodes = get().nodes.map((node) => {
			if (node.id === data.target) {
				node.data.dataNow = sourceNode.data.dataNow
				node.data.previousNodeData = sourceNode.data.dataNow
				node.previousNode = sourceNode.id
				return node
			} else {
				return node
			}
		})
		const newEdge = { id: nanoid(6), animated: true, ...data }
		set({ nodes: [...changedNodes] })
		set({ edges: [...get().edges, newEdge] })
	}
}))

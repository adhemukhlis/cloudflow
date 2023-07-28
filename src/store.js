import { create } from 'zustand'
import { applyNodeChanges, applyEdgeChanges } from 'reactflow'
import { nanoid } from 'nanoid/non-secure'

function calculateResult(type, data) {}

const jsonCountries = [
	{
		country: 'United States',
		life_expectancy: 78.93,
		population: 332915073,
		income: 65112
	},
	{
		country: 'China',
		life_expectancy: 76.91,
		population: 1444216107,
		income: 17696
	},
	{
		country: 'India',
		life_expectancy: 70.42,
		population: 1393409038,
		income: 6333
	},
	{
		country: 'Brazil',
		life_expectancy: 73.72,
		population: 213993437,
		income: 9922
	},
	{
		country: 'United Kingdom',
		life_expectancy: 81.32,
		population: 68207114,
		income: 45788
	},
	{
		country: 'Russia',
		life_expectancy: 72.89,
		population: 145912025,
		income: 10248
	},
	{
		country: 'Japan',
		life_expectancy: 84.63,
		population: 126050804,
		income: 43450
	},
	{
		country: 'Germany',
		life_expectancy: 81.33,
		population: 83900473,
		income: 52535
	},
	{
		country: 'France',
		life_expectancy: 82.49,
		population: 67390566,
		income: 44157
	},
	{
		country: 'South Korea',
		life_expectancy: 83.03,
		population: 51780579,
		income: 32607
	},
	{
		country: 'Italy',
		life_expectancy: 83.51,
		population: 60367488,
		income: 36932
	},
	{
		country: 'Canada',
		life_expectancy: 82.3,
		population: 38139987,
		income: 48041
	},
	{
		country: 'Australia',
		life_expectancy: 83.28,
		population: 25687041,
		income: 56332
	},
	{
		country: 'Spain',
		life_expectancy: 83.57,
		population: 46757980,
		income: 34272
	},
	{
		country: 'Mexico',
		life_expectancy: 75.32,
		population: 129206686,
		income: 9410
	},
	{
		country: 'Indonesia',
		life_expectancy: 72.67,
		population: 273523621,
		income: 4121
	},
	{
		country: 'Nigeria',
		life_expectancy: 54.69,
		population: 214028302,
		income: 2214
	},
	{
		country: 'Argentina',
		life_expectancy: 76.67,
		population: 45439684,
		income: 12037
	},
	{
		country: 'Saudi Arabia',
		life_expectancy: 74.8,
		population: 35340743,
		income: 22671
	},
	{
		country: 'Turkey',
		life_expectancy: 76.97,
		population: 85042751,
		income: 12704
	},
	{
		country: 'South Africa',
		life_expectancy: 64.13,
		population: 61088658,
		income: 6393
	},
	{
		country: 'Iran',
		life_expectancy: 76.68,
		population: 85442404,
		income: 5780
	},
	{
		country: 'Egypt',
		life_expectancy: 72.94,
		population: 105040083,
		income: 3624
	},
	{
		country: 'Pakistan',
		life_expectancy: 67.27,
		population: 235766062,
		income: 1391
	},
	{
		country: 'Bangladesh',
		life_expectancy: 73.27,
		population: 166303498,
		income: 1562
	},
	{
		country: 'Vietnam',
		life_expectancy: 75.74,
		population: 98160169,
		income: 2714
	},
	{
		country: 'Thailand',
		life_expectancy: 75.96,
		population: 69830779,
		income: 8707
	},
	{
		country: 'Myanmar',
		life_expectancy: 66.79,
		population: 54817919,
		income: 1611
	},
	{
		country: 'Philippines',
		life_expectancy: 71.23,
		population: 115903237,
		income: 3484
	},
	{
		country: 'Ethiopia',
		life_expectancy: 66.6,
		population: 124908925,
		income: 870
	}
]

const parsedJSON = JSON.parse(JSON.stringify(jsonCountries))

export const useStore = create((set, get) => ({
	nodes: [
		{
			id: nanoid(),
			data: parsedJSON,
			type: 'example_node',
			position: { x: 0, y: 0 }
		},
		{
			id: nanoid(),
			data: {},
			type: 'filter_node',
			position: { x: 200, y: 0 }
		},
	],
	edges: [],
	outputData: [],
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

	addEdge: (data) => {
		const sourceNode = get().nodes.find((node) => node.id === data.source)

		const changedNodes = get().nodes.map((node) => {
			if (node.id === data.target) {
				node.data = sourceNode.data
				if (node.type === 'output_node') {
					console.log(sourceNode.data)
					// set({outputData: [...sourceNode.data]});
				}
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

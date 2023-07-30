import { create } from 'zustand'
import { applyNodeChanges, applyEdgeChanges, getConnectedEdges } from 'reactflow'
import { nanoid } from 'nanoid/non-secure'


function calculateResult(type, data) {}

const jsonCountries = [
	{
		"country": "United States",
		"life_expectancy": null,
		"population": 332915073,
		"income": 65112
	},
	{
		"country": "China",
		"life_expectancy": 76.91,
		"population": 1444216107,
		"income": 17696
	},
	{
		"country": "India",
		"life_expectancy": null,
		"population": 1393409038,
		"income": 6333
	},
	{
		"country": "Brazil",
		"life_expectancy": 73.72,
		"population": 213993437,
		"income": 9922
	},
	{
		"country": "United Kingdom",
		"life_expectancy": null,
		"population": 68207114,
		"income": 45788
	},
	{
		"country": "Russia",
		"life_expectancy": 72.89,
		"population": 145912025,
		"income": 10248
	},
	{
		"country": "Japan",
		"life_expectancy": 84.63,
		"population": 126050804,
		"income": null
	},
	{
		"country": "Germany",
		"life_expectancy": 81.33,
		"population": 83900473,
		"income": 52535
	},
	{
		"country": "France",
		"life_expectancy": 82.49,
		"population": 67390566,
		"income": 44157
	},
	{
		"country": "South Korea",
		"life_expectancy": null,
		"population": 51780579,
		"income": 32607
	},
	{
		"country": "Italy",
		"life_expectancy": 83.51,
		"population": 60367488,
		"income": null
	},
	{
		"country": "Canada",
		"life_expectancy": 82.3,
		"population": 38139987,
		"income": 48041
	},
	{
		"country": "Australia",
		"life_expectancy": 83.28,
		"population": 25687041,
		"income": 56332
	},
	{
		"country": "Spain",
		"life_expectancy": 83.57,
		"population": 46757980,
		"income": 34272
	},
	{
		"country": "Mexico",
		"life_expectancy": 75.32,
		"population": null,
		"income": 9410
	},
	{
		"country": "Indonesia",
		"life_expectancy": 72.67,
		"population": 273523621,
		"income": null
	},
	{
		"country": "Nigeria",
		"life_expectancy": 54.69,
		"population": 214028302,
		"income": 2214
	},
	{
		"country": "Argentina",
		"life_expectancy": 76.67,
		"population": null,
		"income": 12037
	},
	{
		"country": "Saudi Arabia",
		"life_expectancy": 74.8,
		"population": 35340743,
		"income": 22671
	},
	{
		"country": "Turkey",
		"life_expectancy": 76.97,
		"population": 85042751,
		"income": null
	},
	{
		"country": "South Africa",
		"life_expectancy": 64.13,
		"population": 61088658,
		"income": 6393
	},
	{
		"country": "Iran",
		"life_expectancy": 76.68,
		"population": 85442404,
		"income": 5780
	},
	{
		"country": "Egypt",
		"life_expectancy": 72.94,
		"population": 105040083,
		"income": null
	},
	{
		"country": "Pakistan",
		"life_expectancy": 67.27,
		"population": 235766062,
		"income": 1391
	},
	{
		"country": "Bangladesh",
		"life_expectancy": null,
		"population": 166303498,
		"income": 1562
	},
	{
		"country": "Vietnam",
		"life_expectancy": 75.74,
		"population": 98160169,
		"income": 2714
	},
	{
		"country": "Thailand",
		"life_expectancy": 75.96,
		"population": 69830779,
		"income": 8707
	},
	{
		"country": "Myanmar",
		"life_expectancy": 66.79,
		"population": null,
		"income": 1611
	},
	{
		"country": "Philippines",
		"life_expectancy": 71.23,
		"population": 115903237,
		"income": 3484
	},
	{
		"country": "Ethiopia",
		"life_expectancy": 66.6,
		"population": 124908925,
		"income": null
	}
]


const parsedJSON = JSON.parse(JSON.stringify(jsonCountries))
const inputExampleId = `input_example_${nanoid()}`;
export const useStore = create((set, get) => ({

	nodes: [
		{
			id: inputExampleId,
			data: {dataNow: parsedJSON},
			type: 'input_example_node',
			position: { x: 0, y: 0 }
		},
		{
			id: nanoid(),
			data: {dataNow: [], previousNodeData: [],},
			previousNode: inputExampleId,

			type: 'transform_filter_node',
			position: { x: 500, y: 0 }
		}
	],
	edges: [],
	inputData: [
	],
	outputData: [],
	updateDataNode: (id, data) =>{
		const nodes = get().nodes.map(node =>{
			if(node.id === id){
				node.data.dataNow = data;
			} 
			return node;
		})
		// set({out})
		set({nodes: [...nodes], outputData: [...data]});
	},
	addOutputData: data =>{
		
		set({outputData: data});
		// console.log(get().outputData);
	},
	removeOutputData: () =>{
		set({outputData: []});
	},
	onNodesChange: (changes) => {
		// if(changes[0].type === "position"){
		// 	const node = get().nodes.find(node => node.id === changes[0].id);
		// 	// console.log(node);
		// 	set({outputData: node?.data});
		// 	console.log(node);
		// }
		// // console.log(changes.id);
		// // console.log(changes);

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
		const id = `data${type}-${nanoid()}`
		let data = [];
		if(type === "input_example_node"){
			data = parsedJSON
		}
		const newNode = {
			id: id,
			data:{dataNow: data, 			previousNodeData: [],} ,
			previousNode: '',
			tree: {
				id: id,
				children: []
			},
			type: type,
			position: { x: 0, y: 0 }
		}
		set({ nodes: [...get().nodes, newNode] })
		console.log(get().nodes);
	},

	addEdge: (data) => {
		
		const sourceNode = get().nodes.find((node) => node.id === data.source)

		if(sourceNode.type.split('_')[0] === 'input'){
			const inputData = {
				id: sourceNode.id,
				data: data,
			}
			set({inputData: [...get().inputData, inputData]});
		}
		const changedNodes = get().nodes.map((node) => {
			if (node.id === data.target) {
				node.data.dataNow = sourceNode.data.dataNow;
				node.data.previousNodeData = sourceNode.data.dataNow;
				node.previousNode = sourceNode.id
				console.log('node');
				console.log(node);
				return node
			} else {
				return node
			}
		})
		console.log(get().nodes);
		const newEdge = { id: nanoid(6), animated: true, ...data }
		set({ nodes: [...changedNodes] })
		set({ edges: [...get().edges, newEdge] })
		console.log(getConnectedEdges(get().nodes, get().edges))
	}
}))

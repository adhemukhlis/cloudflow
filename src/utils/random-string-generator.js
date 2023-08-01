// actually this is not random, it's just that each call will produce a different / unique value
// result value contains timestamp, tick performance and base36
// you can parse it to [timestamp, perfTick, base36] = randomStringGenerator().split("_")

const randomStringGenerator = () => {
	const base36 = Math.random().toString(36)
	const slicedBase36 = base36.slice(2, base36.length)
	const timestamp = Date.now()
	const perfTick = performance.now()
	const result = `${timestamp}_${perfTick}_${slicedBase36}`
	return result
}
export default randomStringGenerator

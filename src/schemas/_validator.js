import Ajv from 'ajv'
const ajv = new Ajv({
	allErrors: true,
	$data: true
})

const valid = (data, schema) => {
	const validate = ajv.compile(schema)
	const _valid = validate(data)
	return [_valid, !_valid ? validate.errors : null]
}
export default valid
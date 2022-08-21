export const removeEmptyValue = (obj: any) => {
	if (!(obj instanceof Object)) return {}
	Object.keys(obj).forEach(key => isEmptyValue(obj[key]) && delete obj[key])
	return obj
}

const isEmptyValue = (input: any) => {
	return (!input && input !== false && input !== 0) ||
		((typeof input === 'string') && /^\s+$/.test(input)) ||
		(input instanceof Object && !Object.keys(input).length) ||
		(Array.isArray(input) && !input.length)
}
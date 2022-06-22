export const validateISRC = (isrcStr: string): boolean => {
	const reg = /^[A-Z]{2}-?\w{3}-?\d{2}-?\d{5}$/
	return !!isrcStr.match(reg)
}

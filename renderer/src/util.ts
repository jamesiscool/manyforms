export const createKey = () => (Math.random() + 1).toString(36).substring(2)

export const ordinal = (n: number): string => {
	const s = ['th', 'st', 'nd', 'rd'],
		v = n % 100
	return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export const createPath = (parentPath: string, fieldId?: string): string => {
	if (!fieldId) {
		return parentPath
	}
	if (parentPath !== '') {
		return parentPath + '.' + fieldId
	}
	return fieldId

}
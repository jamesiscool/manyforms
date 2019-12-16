export const createKey = () => (Math.random() + 1).toString(36).substring(2)

export const createPath = (parentPath: string, fieldId?: string): string => {
	if (!fieldId) {
		return parentPath
	}
	if (parentPath !== '') {
		return parentPath + '.' + fieldId
	}
	return fieldId

}
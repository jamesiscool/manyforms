import {ElementDef} from '@manyforms/common'
import {useExpression} from './useExpression'

export const useShowIf = () => {
	const {evaluate} = useExpression()
	return {
		shouldShow: (path: string, def: ElementDef): boolean => {
			if (!def.showIf) {
				return true
			}
			return def.showIf.some(expression => evaluate(expression, path, def))
		}
	}
}
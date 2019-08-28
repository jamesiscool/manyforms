import {ElementDef} from '../FormDef'
import {useExpression} from './useExpression'

export const useShowIf = () => {
	const {evaluate} = useExpression()
	return {
		shouldShow: (path: string, fieldDef: ElementDef): boolean => {
			if (!fieldDef.showIf) {
				return true
			}
			return fieldDef.showIf.some(expression => evaluate(path, fieldDef, expression))
		}
	}
}
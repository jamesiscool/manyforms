import {FormElementDef} from '../FormDef'
import {useExpression} from './useExpression'

export const useShowIf = () => {
	const {evaluate} = useExpression()
	return {
		shouldShow: (path: string, fieldDef: FormElementDef): boolean => {
			if (!fieldDef.showIf) {
				return true
			}
			return fieldDef.showIf.some(expression => evaluate(path, fieldDef, expression))
		}
	}
}
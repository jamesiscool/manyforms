import {FormElementDef} from '../FormDef'
import {useExpression} from '../hooks/useExpression'
import {useValues} from '../hooks/useValues'
import {validationRules} from './ValidationRules'

export const useValidationExpressions = () => {
	const {evaluate} = useExpression()
	const {getValue} = useValues()

	interface ValidationExpression {
		validate: (path: string, fieldDef: FormElementDef, expression: string) => boolean,
		defaultMessage: string
	}

	const validationsExpressions: { [name: string]: ValidationExpression } = {
		validIf: {
			validate: (path: string, fieldDef: FormElementDef, expression: string) => evaluate(path, fieldDef, expression),
			defaultMessage: 'This field is invalid' // The form editor should make the user enter message as this does not give the user any information about why the field is invalid
		},
		invalidIf: {
			validate: (path: string, fieldDef: FormElementDef, expression: string) => !evaluate(path, fieldDef, expression),
			defaultMessage: 'This field is invalid' // As with validIf form editor should make the user enter message as this does not give the user any information about why the field is invalid
		},
		requiredIf: {
			validate: (path: string, fieldDef: FormElementDef, expression: string) => {
				if (evaluate(path, fieldDef, expression)) {
					return validationRules.required.validate(getValue(path))
				}
				return true
			},
			defaultMessage: validationRules.required.defaultMessage
		}
	}

	return validationsExpressions
}
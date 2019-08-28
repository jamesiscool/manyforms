import {ElementDef, FieldDef, isValidationExpresionDef, ValidationConstraintDef} from '../FormDef'
import {isTypeACollection} from '../formElements/formElementTypes'
import {createPath} from '../util'
import {useValidationExpressions} from '../validation/ValidationExpressions'
import {validationRules} from '../validation/ValidationRules'
import {useConfig} from './useConfig'
import {useFieldState} from './useFieldState'
import {useFormState} from './useFormState'
import {useShowIf} from './useShowIf'
import {useUpdate} from './useUpdate'
import {useValues} from './useValues'

export const useValidation = () => {
	const config = useConfig().config
	const {getValue, getCollectionSize} = useValues()
	const {getFieldState} = useFieldState()
	const {nextOrSubmit} = useFormState()
	const {shouldShow} = useShowIf()
	const {updateAt} = useUpdate()
	const validationExpressions = useValidationExpressions()

	const validate = (path: string, def: FieldDef): string | null => {
		if (!def.validation || def.validation.length <= 0) {
			return null
		}
		return def.validation.reduce<string | null>((message, constraint): string | null => {
			if (message != null) {
				return message
			}
			return validateConstraint(constraint, path, def)
		}, null)
	}

	function validateConstraint(constraint: ValidationConstraintDef | string, path: string, def: ElementDef): string | null {
		if (typeof constraint === 'string') {
			const fieldValue = getValue(path) || ''
			const validationRule = validationRules[constraint]
			if (!validationRule.validate(fieldValue)) {
				return validationRule.defaultMessage
			}
			return null
		} else if (!isValidationExpresionDef(constraint)) {
			const fieldValue = getValue(path) || ''
			const validationRule = validationRules[constraint.name]
			if (!validationRule.validate(fieldValue)) {
				return constraint.message || validationRule.defaultMessage
			}
			return null
		} else {
			const validationExpression = validationExpressions[constraint.name]
			if (!validationExpression.validate(path, def, constraint.expression)) {
				return constraint.message || validationExpression.defaultMessage
			}
			return null
		}
	}

	const validateAndShouldShow = (path: string, def: ElementDef): string | null => {
		return shouldShowErrors(path, def) ? validate(path, def) : null
	}

	const shouldShowErrors = (path: string, def: ElementDef): boolean => {
		if (nextOrSubmit() || config.showErrors === 'immediately') {
			return true
		}
		const fieldState = getFieldState(path) || {}
		if (config.showErrors === 'onFocus' && fieldState.focus) {
			return timePlusDelayHasPassed(fieldState.focus)
		}
		if (config.showErrors === 'onValueChanged' && fieldState.valueChanged) {
			return timePlusDelayHasPassed(fieldState.valueChanged)
		}
		if (config.showErrors === 'onBlur' && fieldState.blur) {
			return timePlusDelayHasPassed(fieldState.blur)
		}
		return false
	}

	const timePlusDelayHasPassed = (time: number) => {
		if (!config.showErrorsDelay || config.showErrorsDelay === 0) {
			return true
		} else if ((time + config.showErrorsDelay) < Date.now()) {
			return true
		} else {
			updateAt(time + config.showErrorsDelay)
			return false
		}
	}

	const hasErrorsRecursively = (path: string, def?: ElementDef): boolean => {
		if (!def || !shouldShow(path, def)) {
			return false
		}
		if (validate(path, def) != null) {
			return true
		}
		if (def.children) {
			return def.children.some((childFieldDef) => {
				const childPath = createPath(path, childFieldDef.fieldId)
				if (!shouldShow(childPath, childFieldDef)) {
					return false
				}
				if (isTypeACollection(childFieldDef.type)) {
					const size = getCollectionSize(childPath)
					for (let index = 0; index < size; index++) {
						if (hasErrorsRecursively(childPath + '[' + index + ']', childFieldDef)) {
							return true
						}
					}
					return false
				} else {
					return hasErrorsRecursively(childPath, childFieldDef)
				}
			})
		}
		return false
	}


	return {validate, shouldShowErrors, validateAndShouldShow, hasErrorsRecursively}
}
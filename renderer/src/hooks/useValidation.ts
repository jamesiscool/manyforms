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

	const validate = (path: string, fieldDef: FieldDef): string | null => {
		if (!fieldDef.validation || fieldDef.validation.length <= 0) {
			return null
		}
		return fieldDef.validation.reduce<string | null>((message, constraint): string | null => {
			if (message != null) {
				return message
			}
			return validateConstraint(constraint, path, fieldDef)
		}, null)
	}

	function validateConstraint(constraint: ValidationConstraintDef | string, path: string, fieldDef: ElementDef): string | null {
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
			if (!validationExpression.validate(path, fieldDef, constraint.expression)) {
				return constraint.message || validationExpression.defaultMessage
			}
			return null
		}
	}

	const validateAndShouldShow = (path: string, fieldDef: ElementDef): string | null => {
		return shouldShowErrors(path, fieldDef) ? validate(path, fieldDef) : null
	}

	const shouldShowErrors = (path: string, fieldDef: ElementDef): boolean => {
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

	const hasErrorsRecursively = (path: string, fieldDef?: ElementDef): boolean => {
		if (!fieldDef || !shouldShow(path, fieldDef)) {
			return false
		}
		if (validate(path, fieldDef) != null) {
			return true
		}
		if (fieldDef.children) {
			return fieldDef.children.some((childFieldDef) => {
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
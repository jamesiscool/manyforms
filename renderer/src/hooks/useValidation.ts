import {useEffect, useState} from 'react'
import {FormElementDef, isValidationExpresionDef, ValidationConstraintDef} from '../FormDef'
import {isTypeACollection} from '../formElements/formElementTypes'
import {createPath} from '../util'
import {useValidationExpressions} from '../validation/ValidationExpressions'
import {validationRules} from '../validation/ValidationRules'
import {useConfig} from './useConfig'
import {useFieldState} from './useFieldState'
import {useFormState} from './useFormState'
import {useShowIf} from './useShowIf'
import {useValues} from './useValues'

export const useValidation = () => {
	const config = useConfig().config
	const {getValue, getCollectionSize} = useValues()
	const {getFieldState} = useFieldState()
	const {nextOrSubmit} = useFormState()
	const {shouldShow} = useShowIf()
	const validationExpressions = useValidationExpressions()

	const [nextTick, setNextTick] = useState<number>(0)
	useEffect(() => {
		if (nextTick > Date.now()) {
			setTimeout(() => setNextTick(0), nextTick - Date.now())
		}
	}, [nextTick])

	const validate = (path: string, fieldDef: FormElementDef<{}>): string | null => {
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

	function validateConstraint(constraint: ValidationConstraintDef | string, path: string, fieldDef: FormElementDef<{}>): string | null {
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

	const validateAndShouldShow = (path: string, fieldDef: FormElementDef<{}>): string | null => {
		return shouldShowErrors(path, fieldDef) ? validate(path, fieldDef) : null
	}

	const shouldShowErrors = (path: string, fieldDef: FormElementDef<{}>): boolean => {
		if (nextOrSubmit() || config.showErrors === 'immediately') {
			return true
		}
		const eventTimes = getFieldState(path).eventTimes || {}
		if (config.showErrors === 'onFocus' && eventTimes.focus) {
			return timeHasPassedAndShouldShowError(eventTimes.focus)
		}
		if (config.showErrors === 'onValueChanged' && eventTimes.valueChanged) {
			return timeHasPassedAndShouldShowError(eventTimes.valueChanged)
		}
		if (config.showErrors === 'onBlur' && eventTimes.blur) {
			return timeHasPassedAndShouldShowError(eventTimes.blur)
		}
		return false
	}

	const timeHasPassedAndShouldShowError = (time: number) => {
		if (!config.showErrorsDelay || config.showErrorsDelay === 0) {
			return true
		} else if ((time + config.showErrorsDelay) < Date.now()) {
			return true
		} else {
			setNextTick(time + config.showErrorsDelay)
			return false
		}
	}

	const hasErrorsRecursively = (path: string, fieldDef?: FormElementDef<{}>): boolean => {
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
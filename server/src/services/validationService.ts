import {Data, ElementDef, FieldDef, FormDef, ValidationConstraintDef, ValidationExpresionDef} from '@manyforms/common'
import {isTypeACollection} from '@manyforms/render/src/formElements/formElementTypes'
import {VALUES_STORE_KEY} from '@manyforms/render/src/hooks/useValues'
import {createPath} from '@manyforms/render/src/util'
import {validationRules} from '@manyforms/render/src/validation/ValidationRules'
import jexl from 'jexl'


export const rerunClientSideValidationOnServer = (formDef: FormDef, data: Data): boolean => {
	if (formDef == null || data == null) {
		return false
	}

	return true
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
	} else if (!isValidationExpresion(constraint)) {
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

function isValidationExpresion(constraint: ValidationConstraintDef): constraint is ValidationExpresionDef {
	return (constraint as ValidationExpresionDef).expression !== undefined
}

const shouldShow = (path: string, def: ElementDef): boolean => {
	if (!def.showIf) {
		return true
	}
	return def.showIf.some(expression => evaluate(expression, path, def))
}

const evaluate = <T>(expression: string, path?: string, def?: ElementDef, extraContex?: any, includeFieldValue = true): T => {
	const context = {
		//...store,
		def,
		path,
		...extraContex
	}
	if (includeFieldValue) {
		const fieldValue = get(`${VALUES_STORE_KEY}.${path}`)
		context.fieldValue = fieldValue
		context.value = fieldValue
	}
	return jexl.evalSync(expression, context)
}
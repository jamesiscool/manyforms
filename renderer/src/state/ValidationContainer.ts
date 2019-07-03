import {useEffect, useState} from 'react'
import {createContainer, useContainer} from 'unstated-next'
import {FormElementDef, isValidationRuleDef, ValidationConstraintDef} from '../FormDef'
import {isTypeACollection} from '../formElements/formElementTypes'
import {createFiledPath} from '../util'
import {validationRuleMap} from '../validation/ValidationRule'
import {ConfigContainer} from './ConfigContainer'
import {ExpressionContainer} from './ExpressionContainer'
import {FieldStateContainer} from './FieldStateContainer'
import {FormStateContainer} from './FormStateContainer'
import {ValuesContainer} from './ValuesContainer'

function useValidation() {
    const config = useContainer(ConfigContainer).config
    const valuesContainer = useContainer(ValuesContainer)
    const fieldStateContainer = useContainer(FieldStateContainer)
    const formStateContainer = useContainer(FormStateContainer)
    const expressionContainer = useContainer(ExpressionContainer)

    const [nextTick, setNextTick] = useState<number>(0)
    useEffect(() => {
        if (nextTick > Date.now()) {
            setTimeout(() => setNextTick(0), nextTick - Date.now())
        }
    }, [nextTick])

    const validate = (path: string, fieldDef: FormElementDef<{}>): string | null => {
        if (!fieldDef.validation) {
            return null
        }
        const fieldValue = valuesContainer.getValue(path)
        if (fieldDef.validation.required && (fieldValue == null || fieldValue.length <= 0 || fieldValue === '')) {
            return 'This field is required'
        }
        if (fieldDef.validation.constraints) {
            return fieldDef.validation.constraints.reduce<string | null>((firstErrorMessage, constraint): string | null => {
                if (firstErrorMessage) {
                    return firstErrorMessage
                }
                return validateConstraint(constraint, path, fieldDef, fieldValue)
            }, null)
        }
        return null
    }

    function validateConstraint(constraint: ValidationConstraintDef, path: string, fieldDef: FormElementDef<{}>, fieldValue: string) {
        if (isValidationRuleDef(constraint)) {
            const validationRule = validationRuleMap[constraint.name]
            if (!validationRule.validate(fieldValue)) {
                return constraint.message || validationRule.defaultMessage
            }
            return null
        } else {
            if (!expressionContainer.evaluate(path, fieldDef, constraint.expression)) {
                return constraint.message
            }
            return null
        }
    }

    const validateAndShouldShow = (path: string, fieldDef: FormElementDef<{}>): string | null => {
        return shouldShowErrors(path, fieldDef) ? validate(path, fieldDef) : null
    }

    const shouldShowErrors = (path: string, fieldDef: FormElementDef<{}>): boolean => {
        if (formStateContainer.nextOrSubmit() || config.showErrors === 'immediately') {
            return true
        }
        const fieldState = fieldStateContainer.get(path)
        if (config.showErrors === 'afterFocus' && fieldState.focus) {
            return timeHasPassedAndShouldShowError(fieldState.focus)
        }
        if (config.showErrors === 'afterValueChanged' && fieldState.valueChanged) {
            return timeHasPassedAndShouldShowError(fieldState.valueChanged)
        }
        if (config.showErrors === 'afterBlur' && fieldState.blur) {
            return timeHasPassedAndShouldShowError(fieldState.valueChanged)
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

    const validateRecursively = (path: string, fieldDef?: FormElementDef<{}>): boolean => {
        if (!fieldDef) {
            return false
        }
        if (validate(path, fieldDef) != null) {
            return true
        }
        if (fieldDef.children) {
            return fieldDef.children.some((childFieldDef) => {
                const childPath = createFiledPath(path, childFieldDef.fieldId)
                if (isTypeACollection(childFieldDef.type)) {
                    const size = valuesContainer.getCollectionSize(childPath)
                    for (let index = 0; index < size; index++) {
                        if (validateRecursively(childPath + '[' + index + ']', childFieldDef)) {
                            return true
                        }
                    }
                    return false
                } else {
                    return validateRecursively(childPath, childFieldDef)
                }
            })
        }
        return false
    }

    return {validate, shouldShowErrors, validateAndShouldShow, validateRecursively}
}

export const ValidationContainer = createContainer(useValidation)
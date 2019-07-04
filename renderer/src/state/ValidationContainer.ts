import {useEffect, useState} from 'react'
import {FormElementDef, isValidationExpresionDef, ValidationConstraintDef} from '../FormDef'
import {isTypeACollection} from '../formElements/formElementTypes'
import {createPath} from '../util'
import {validationRuleMap} from '../validation/ValidationRule'
import {ConfigContainer} from './ConfigContainer'
import {ExpressionContainer} from './ExpressionContainer'
import {FieldStateContainer} from './FieldStateContainer'
import {FormStateContainer} from './FormStateContainer'
import {ShowIfContainer} from './ShowIfContainer'
import {createContainer, useContainer} from './useContainer'
import {ValuesContainer} from './ValuesContainer'

export const ValidationContainer = createContainer(() => {
    const configContainer = useContainer(ConfigContainer)
    const valuesContainer = useContainer(ValuesContainer)
    const fieldStateContainer = useContainer(FieldStateContainer)
    const formStateContainer = useContainer(FormStateContainer)
    const expressionContainer = useContainer(ExpressionContainer)
    const showIfContainer = useContainer(ShowIfContainer)

    const [nextTick, setNextTick] = useState<number>(0)
    useEffect(() => {
        if (nextTick > Date.now()) {
            setTimeout(() => setNextTick(0), nextTick - Date.now())
        }
    }, [nextTick])

    const config = configContainer.config

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
            const fieldValue = valuesContainer.getValue(path) || ''
            const validationRule = validationRuleMap[constraint]
            if (!validationRule.validate(fieldValue)) {
                return validationRule.defaultMessage
            }
            return null
        } else if (!isValidationExpresionDef(constraint)) {
            const fieldValue = valuesContainer.getValue(path) || ''
            const validationRule = validationRuleMap[constraint.name]
            if (!validationRule.validate(fieldValue)) {
                return constraint.message || validationRule.defaultMessage
            }
            return null
        } else {
            const expressionValidation = expressionContainer.expressionValidations[constraint.name]
            if (!expressionValidation.validate(path, fieldDef, constraint.expression)) {
                return constraint.message || expressionValidation.defaultMessage
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
        if (config.showErrors === 'onFocus' && fieldState.focus) {
            return timeHasPassedAndShouldShowError(fieldState.focus)
        }
        if (config.showErrors === 'onValueChanged' && fieldState.valueChanged) {
            return timeHasPassedAndShouldShowError(fieldState.valueChanged)
        }
        if (config.showErrors === 'onBlur' && fieldState.blur) {
            return timeHasPassedAndShouldShowError(fieldState.blur)
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
        if (!fieldDef || !showIfContainer.shouldShow(path, fieldDef)) {
            return false
        }
        if (validate(path, fieldDef) != null) {
            return true
        }
        if (fieldDef.children) {
            return fieldDef.children.some((childFieldDef) => {
                const childPath = createPath(path, childFieldDef.fieldId)
                if (!showIfContainer.shouldShow(childPath, childFieldDef)) {
                    return false
                }
                if (isTypeACollection(childFieldDef.type)) {
                    const size = valuesContainer.getCollectionSize(childPath)
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
})
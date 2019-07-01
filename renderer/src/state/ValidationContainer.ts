import {useEffect, useState} from 'react'
import {createContainer, useContainer} from 'unstated-next'
import {FormElementDef} from '../formElements/FormElementDef'
import {isTypeACollection} from '../formElements/formElementTypes'
import {createFiledPath} from '../util'
import {ruleValidatorMap, ValidationRuleDef} from '../validation/ValidationRules'
import {ConfigContainer} from './ConfigContainer'
import {FieldStateContainer} from './FieldStateContainer'
import {ValuesContainer} from './ValuesContainer'

function useValidation() {
    const config = useContainer(ConfigContainer).config
    const valuesContainer = useContainer(ValuesContainer)
    const fieldStateContainer = useContainer(FieldStateContainer)

    const [nextTick, setNextTick] = useState<number>(0)
    useEffect(() => {
        if (nextTick > Date.now()) {
            setTimeout(() => setNextTick(0), nextTick - Date.now())
        }
    }, [nextTick])

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

    const shouldShowErrors = (path: string, fieldDef: FormElementDef<{}>): boolean => {
        if (config.showErrors === 'immediately') {
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

    const validate = (path: string, fieldDef: FormElementDef<{}>): string | undefined => {
        if (!fieldDef.validation || !shouldShowErrors(path, fieldDef)) {
            return undefined
        }
        const foundValue = valuesContainer.getValue(path)
        if (fieldDef.validation.required && (!foundValue || foundValue.length <= 0)) {
            return 'This field is required'
        }
        if (fieldDef.validation.rules) {
            const firstRuleThatFails = fieldDef.validation.rules.find((validationRuleDef: ValidationRuleDef) => {
                return !ruleValidatorMap[validationRuleDef.name].validate(foundValue)
            })
            if (firstRuleThatFails) {
                return firstRuleThatFails.message || ruleValidatorMap[firstRuleThatFails.name].defaultMessage
            }
        }
        return undefined
    }

    const hasErrorsRecursively = (path: string, fieldDef?: FormElementDef<{}>): boolean => {
        if (!fieldDef) {
            return false
        }
        if (validate(path, fieldDef)) {
            return true
        }
        if (fieldDef.children) {
            return fieldDef.children.some((childFieldDef) => {
                const childPath = createFiledPath(path, childFieldDef.fieldId)
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

    return {shouldShowErrors, validate, hasErrorsRecursively}
}

export const ValidationContainer = createContainer(useValidation)
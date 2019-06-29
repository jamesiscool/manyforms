import {createContainer, useContainer} from 'unstated-next'
import {FormElementDef} from '../formElements/FormElementDef'
import {isTypeACollection} from '../formElements/formElementTypes'
import {createFiledPath} from '../util'
import {ruleValidatorMap, ValidationRuleDef} from '../validation/ValidationRules'
import {ValuesContainer} from './ValuesContainer'

function useValidation() {
    const valuesContainer = useContainer(ValuesContainer)

    function validate(path: string, fieldDef: FormElementDef<{}>): string | undefined {
        if (!fieldDef.validation) {
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

    function hasErrorsRecursively(path: string, fieldDef?: FormElementDef<{}>): boolean {
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

    return {validate, hasErrorsRecursively}
}

export const ValidationContainer = createContainer(useValidation)
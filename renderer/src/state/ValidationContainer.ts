import {createContainer, useContainer} from "unstated-next"
import {FormElementDef} from "../formElements/FormElementDef"
import {createFiledPath} from "../util"
import {ruleValidatorMap} from "../validation/ruleValidatorMap"
import ValidationRuleDef from "../validation/ValidationRuleDef"
import {ValuesContainer} from "./ValuesContainer"

interface Error {
    path: string,
    error: string
}

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

    function hasErrors(path: string, fieldDef?: FormElementDef<{}>): boolean {
        if (!fieldDef) return false
        const localError = validate(path, fieldDef)
        if (localError) {
            return true
        }
        if (fieldDef.children) {
            return fieldDef.children.some((childFieldDef) => {
                return hasErrors(createFiledPath(path, childFieldDef.fieldId), childFieldDef)
            })
        }
        return false
    }

    return {validate, hasErrors}
}

export const ValidationContainer = createContainer(useValidation)
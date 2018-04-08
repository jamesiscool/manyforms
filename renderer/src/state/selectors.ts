import { FormElementDef, ValidationRuleDef } from '../components/FormElement'
import { State } from './reducer'
import ruleValidators from './validation/ruleValidators'

const get = require('lodash/get')

export function getData(state: State, path: string): string | void {
    const found = get(state.formData, path)
    if (typeof found === 'string') {
        return found
    }
    return
}

export function getCollectionSize(state: State, path: string): number | void {
    const found = get(state.formData, path)
    if (found instanceof Array) {
        return found.length
    }
    return
}

export function validate(state: State, path: string, fieldDef: FormElementDef<{}>): string | undefined {
    if (!fieldDef.validation) {
        return undefined
    }
    const found = get(state.formData, path)
    if (fieldDef.validation.required && (!found || found.length < 1)) {
        return 'This field is required'
    }
    if (fieldDef.validation.rules) {
        const firstRuleThatFails = fieldDef.validation.rules.find((validationRuleDef: ValidationRuleDef) => {
            return !ruleValidators[validationRuleDef.name].validate(found)
        })
        if (firstRuleThatFails) {
            return firstRuleThatFails.message || ruleValidators[firstRuleThatFails.name].defaultMessage
        }
    }
    return undefined
}
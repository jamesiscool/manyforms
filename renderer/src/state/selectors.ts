import { FormElementDef, ValidationRuleDef } from '../components/FormElement'
import { FieldState, store } from './store'
import ruleValidators from './validation/ruleValidators'

const get = require('lodash/get')

export function getData(path: string): string {
    return get(store.state.formData, path)
}

export function getState(path: string): FieldState {
    const found = get(store.state.formState, path)
    return found ? found : {}
}

export function getCollectionSize(path: string): number | void {
    const found = get(store.state.formData, path)
    if (found instanceof Array) {
        return found.length
    }
    return
}

export function validate(path: string, fieldDef: FormElementDef<{}>): string | undefined {
    if (!fieldDef.validation) {
        return undefined
    }
    const found = get(store.state.formData, path)
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
import {Config} from './state/ConfigContainer'

export default interface FormDef {
    elements: FormElementDef<{}>[]
    config?: Config
}

export interface FormElementDef<Attributes> {
    type: string,
    attributes: Attributes,
    fieldId?: string,
    children?: Array<FormElementDef<any>>
    validation?: {
        required?: boolean
        constraints?: ValidationConstraintDef[]
    }
}

export type ValidationConstraintDef = ValidationRuleDef | ValidationExpresionDef

export function isValidationRuleDef(constraint: ValidationConstraintDef): constraint is ValidationRuleDef {
    return (constraint as ValidationRuleDef).name !== undefined
}

export interface ValidationRuleDef {
    name: string,
    arguments?: string[],
    message?: string
}

export interface ValidationExpresionDef {
    expression: string,
    message: string
}


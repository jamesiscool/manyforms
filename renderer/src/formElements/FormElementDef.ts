import {ValidationRuleDef} from '../validation/ValidationRules'

export interface FormElementDef<Attributes> {
    type: string,
    attributes: Attributes,
    fieldId?: string,
    children?: Array<FormElementDef<any>>
    validation?: {
        required?: boolean
        rules?: ValidationRuleDef[]
        expression?: {
            expression: string,
            message: string
        }[]
    }
}
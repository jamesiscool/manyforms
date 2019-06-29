import {FormElementDef} from './FormElementDef'


export interface FormElementProps<Attributes> {
    definition: FormElementDef<Attributes>
    parentFieldPath: string
    fieldPath: string
}
import {FormElementDef} from './FormElementDef'


export interface FormElementProps<Attributes> {
    definition: FormElementDef<Attributes>
    parentPath: string
    path: string
}
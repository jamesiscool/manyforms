import {FormElementDef} from '../FormDef'


export interface FormElementProps<Attributes> {
    definition: FormElementDef<Attributes>
    parentPath: string
    path: string
}
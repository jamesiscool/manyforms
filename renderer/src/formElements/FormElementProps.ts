import {FieldAttributes, FormElementDef} from '../FormDef'


export interface FormElementProps<Attributes = FieldAttributes> {
	definition: FormElementDef<Attributes>
	parentPath: string
	path: string
}
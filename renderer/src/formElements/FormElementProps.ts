import {ElementDef} from '../FormDef'


export interface FormElementProps<Def = ElementDef> {
	def: Def
	parentPath: string
	path: string
}
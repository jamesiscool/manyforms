import {ElementDef} from '@manyforms/common'

export interface FormElementProps<Def = ElementDef> {
	def: Def
	parentPath: string
	path: string
}
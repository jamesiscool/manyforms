//import {Component} from 'react'
import {TextInput} from './TextInput'
import {Paragraph} from './Paragraph'
import {Heading} from './Heading'

export interface FormElementDef<Attributes> {
	type: string,
	attributes?: Attributes
	/*{
	 [propName: string]: (string | number)
	 }*/
	fieldId?: string,
	children?: Array<FormElementDef<any>>
}

export class FormElementProps<Attributes> {
	definition: FormElementDef<Attributes>
}

export const FormElements: { [name: string]: any } = {
	'TextInput': TextInput,
	'Paragraph': Paragraph,
	'Heading': Heading
}

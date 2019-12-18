import {Config} from './configDef'
import {EventDef} from './eventDef'
import {ReferenceDataDef} from './referenceDataDef'
import {ValidationConstraintDef} from './validationDef'

export interface FormDef {
	elements: ElementDef[]
	config?: Config
	referenceData?: ReferenceDataDef
	submit: {
		url: string,
		outcomes: {
			statusCodes: number[]
			elements: ElementDef[]
		}[]
	}
	events: EventDef[]
}

export interface ElementDef {
	fieldId?: string,
	type: string,
	children?: Array<ElementDef>
	showIf?: string[]
	hidden: boolean
	label?: string
}

export interface FieldDef extends ElementDef {
	validation?: Array<string | ValidationConstraintDef>
	showIf?: string[]
	hidden: boolean
	description?: string
	info?: string
}
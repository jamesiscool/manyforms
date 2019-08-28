import {Config} from './hooks/useConfig'

export default interface FormDef {
	elements: ElementDef[]
	config?: Config
	referenceData?: ReferenceDataDef
	submit: { url: string }
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

export type ValidationConstraintDef = ValidationRuleDef | ValidationExpresionDef

export function isValidationExpresionDef(constraint: ValidationConstraintDef): constraint is ValidationExpresionDef {
	return (constraint as ValidationExpresionDef).expression !== undefined
}

export interface ValidationRuleDef {
	name: string,
	arguments?: string[],
	message?: string
}

export interface ValidationExpresionDef {
	name: string,
	expression: string,
	message?: string
}

export interface ReferenceDataDef {
	inline?: {
		[name: string]: any
	}
	http?: {
		name: string,
		url: string,
		method?: 'get' | 'GET' | 'post' | 'POST',
		baseURL?: string
	}[]
}


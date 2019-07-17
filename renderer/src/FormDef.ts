import {Config} from './state/ConfigContainer'

export default interface FormDef {
	elements: FormElementDef<{}>[]
	config?: Config
	referenceData?: ReferenceDataDef
}

export interface FormElementDef<Attributes> {
	type: string,
	attributes: Attributes,
	fieldId?: string,
	children?: Array<FormElementDef<any>>
	validation?: Array<string | ValidationConstraintDef>
	showIf?: string[]
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


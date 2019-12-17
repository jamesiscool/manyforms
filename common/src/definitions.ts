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

export interface EventDef {
	triggers: Trigger[]
	actions: ActionDef[]
}

export type EventType = 'formLoaded' | 'beforePageNext' | 'showManualEntryForSuggestion' | FieldEvents

export type FieldEvents = 'focus' | 'valueChanged' | 'blur'

interface Trigger {
	eventType: EventType[]
	path?: string
	pathExpression?: string
}

type ActionType = 'setFieldValue' | 'setStoreValue'

interface ActionDef {
	action: ActionType,
	path?: string
	data?: any
	expression?: string
}

type showErrors = 'immediately' | 'onFocus' | 'onValueChanged' | 'onBlur' | 'nextOrSummit'

export interface Config {
	showErrors: showErrors
	showErrorsDelay: number //milliseconds
	disableNextWhenErrors: boolean
}


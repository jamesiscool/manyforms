export type ValidationConstraintDef = ValidationRuleDef | ValidationExpresionDef

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

export interface ServerSideErrors {
	path?:string,
	message: string
}
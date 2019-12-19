import {FormDef} from './formDef'

export interface GetFormDefResponse {
	formDef: FormDef
}


export interface SubmitRequest {
	formId: string
	formVersion: number
	data: any
}

export interface SubmitResponse {
	outcomeId?: string
}
import {FormDef} from './formDef'
import {ServerSideErrors} from './validationDef'

export interface GetFormDefResponse {
	formDef: FormDef
}

export type Data = any

export interface SubmitRequest {
	formId: string
	formVersion: number
	data: Data
}

export interface SubmitResponse {
	outcomeId?: string
	validationErrors?: ServerSideErrors[]
}